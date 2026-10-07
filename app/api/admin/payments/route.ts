import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { scopeFromAuth, resolveBranchFilter, keepBranch, canActOn, forbidBranch } from "@/lib/branch-scope";
import { audit } from "@/lib/identifiers";

// A manual fee entry must belong to an existing student AND one of their admissions.
// Students are never created here and admission numbers are never invented — the money
// has to land on a real application so dues, receipts and campus AR/AP all agree.
export async function POST(req: NextRequest) {
  const auth = await requireAdminSession(req, ["super_admin", "finance"]);
  if (auth.error) return auth.error;
  const body = await req.json();
  const { amount, paidAmount, dueDate, paymentMethod, transactionId, studentId, admissionId, note } = body;

  if (!studentId) return NextResponse.json({ error: "Select an existing student" }, { status: 400 });
  if (!admissionId) return NextResponse.json({ error: "Select the admission this payment belongs to" }, { status: 400 });

  const fee = Math.round(Number(amount));
  if (!fee || fee <= 0) return NextResponse.json({ error: "Amount must be greater than zero" }, { status: 400 });
  const paid = paidAmount !== undefined && paidAmount !== "" && Number(paidAmount) > 0 ? Math.min(fee, Math.round(Number(paidAmount))) : fee;

  const student = await prisma.user.findUnique({ where: { id: String(studentId) } });
  if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });

  const admission = await prisma.admission.findUnique({ where: { id: String(admissionId) } });
  if (!admission) return NextResponse.json({ error: "Admission not found" }, { status: 404 });
  // The admission must actually belong to this student.
  const admStudentId = (admission as any).applicantStudentId || (admission as any).studentId;
  if (admStudentId && String(admStudentId) !== String(studentId)) {
    return NextResponse.json({ error: "That admission does not belong to the selected student" }, { status: 400 });
  }

  // Campus scoping: a campus admin may only record fees for their own campuses
  const scope = scopeFromAuth(auth);
  const targetBranch = String(admission.branch || student.branch || "").trim();
  if (!canActOn(scope, targetBranch)) return forbidBranch(targetBranch);

  // Do not let a manual entry overpay the locked fee.
  const lockedFee = Number((admission as any).finalFee ?? admission.totalFee ?? admission.amount ?? 0);
  const already = Number((admission as any).payingNow || 0) + Number(
    (
      await prisma.feePayment.aggregate({
        where: { admissionId: admission.id, status: { notIn: ["rejected", "failed"] } },
        _sum: { amount: true },
      })
    )._sum.amount || 0,
  );
  if (lockedFee > 0 && already + fee > lockedFee) {
    return NextResponse.json(
      { error: `Only ₹${Math.max(0, lockedFee - already).toLocaleString("en-IN")} is outstanding on this admission` },
      { status: 400 },
    );
  }

  const id = `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 4).toUpperCase()}`;

  if (paid > 0) {
    // Post as a FeePayment so the admission, dues and receipt all pick it up.
    await prisma.feePayment.create({
      data: {
        admissionId: admission.id,
        studentId: student.id,
        amount: paid,
        method: String(paymentMethod || "cash").toLowerCase(),
        transactionId: transactionId ? String(transactionId).trim() : null,
        note: note ? String(note).slice(0, 500) : `Manual entry by ${String(auth.session.username || "admin")}`,
        status: "acknowledged",
        recordedBy: String(auth.session.username || "admin"),
      },
    });
  }

  // The unpaid balance is kept as a synthetic Payment row purely as a due marker.
  const balance = fee - paid;
  let dueEntryId: string | null = null;
  if (balance > 0) {
    dueEntryId = id;
    await prisma.payment.create({
      data: {
        id,
        admissionId: id,
        studentId: student.id,
        name: student.name,
        phone: student.phone,
        email: student.email,
        course: admission.course,
        mode: admission.mode,
        branch: targetBranch,
        amount: balance,
        paidAmount: 0,
        dueDate: dueDate ? new Date(dueDate) : null,
        paymentMethod: String(paymentMethod || "cash").toLowerCase(),
        transactionId: transactionId ? String(transactionId).trim() : null,
        screenshot: null,
        status: "pending",
        approvedAt: null,
      },
    });
  }

  await audit("payment", dueEntryId || admission.id, String(auth.session.username || "admin"), "manual_fee", `₹${fee} for ${admission.applicationId || admission.id}`);
  return NextResponse.json({ ok: true, id: dueEntryId, admissionId: admission.id, studentId: student.id, paid, balance });
}

export async function GET(req: NextRequest) {
  const auth = await requireAdminSession(req, ["super_admin", "finance"]);
  if (auth.error) return auth.error;

  // Campus scoping: restrict to the admin's assigned campuses, then apply the ?branch= filter
  const scope = scopeFromAuth(auth);
  const { searchParams } = new URL(req.url);
  const branchFilter = resolveBranchFilter(scope, searchParams.get("branch"));
  if (branchFilter.error) return NextResponse.json({ error: branchFilter.error }, { status: 403 });
  const only = branchFilter.branch ? [branchFilter.branch] : null;

  // ---- Money totals are computed with SQL aggregates, never from the loaded page ----
  // Previously both sources were capped at 2,000 rows and the totals were summed in
  // JS, so AR/AP silently under-reported once a campus passed that volume.
  const legacyWhere: any = only ? { branch: { in: only } } : scope.branches === null ? {} : { branch: { in: [...scope.branches, ""] } };
  // Fee payments inherit their campus from the admission
  const feeWhere: any = {};
  if (scope.branches !== null) feeWhere.admission = { branch: { in: [...scope.branches, ""] } };
  else if (only) feeWhere.admission = { branch: { in: only } };

  // Store orders are receivables too: an order that is not paid yet is money owed,
  // a paid order is money collected. Orders snapshot their campus; older student
  // orders rely on the buyer's campus, so resolve those student ids explicitly.
  const storeBranchFilter = scope.branches !== null ? [...scope.branches, ""] : only ? only : [];
  const storeScopeIds =
    storeBranchFilter.length > 0
      ? (await prisma.user.findMany({ where: { branch: { in: storeBranchFilter } }, select: { id: true }, take: 20000 })).map((u: any) => u.id)
      : [];
  const storeOrStudentBranch =
    storeBranchFilter.length > 0
      ? { OR: [{ branch: { in: storeBranchFilter } }, { userId: { in: storeScopeIds } }] }
      : {};
  const storeWhere: any = { status: { not: "cancelled" }, ...storeOrStudentBranch };

  const [legacyAgg, feeRecvAgg, feeCollAgg, storeAgg, legacyCount, feeCount, storeCount, usersCount] = await Promise.all([
    prisma.payment.aggregate({ where: legacyWhere, _sum: { amount: true, paidAmount: true }, _count: { _all: true } }),
    prisma.feePayment.aggregate({ where: { ...feeWhere, status: { notIn: ["rejected", "failed"] } }, _sum: { amount: true } }),
    prisma.feePayment.aggregate({ where: { ...feeWhere, status: "acknowledged" }, _sum: { amount: true } }),
    prisma.storeOrder.aggregate({ where: storeWhere, _sum: { subtotal: true } }),
    prisma.payment.count({ where: legacyWhere }),
    prisma.feePayment.count({ where: feeWhere }),
    prisma.storeOrder.count({ where: storeWhere }),
    prisma.user.count(),
  ]);

  // Paid store revenue
  const storePaidAgg = await prisma.storeOrder.aggregate({
    where: { ...storeWhere, paymentStatus: "success" },
    _sum: { subtotal: true },
  });

  const totalReceivable = Number(legacyAgg._sum.amount || 0) + Number(feeRecvAgg._sum.amount || 0) + Number(storeAgg._sum.subtotal || 0);
  const totalCollected = Number(legacyAgg._sum.paidAmount || 0) + Number(feeCollAgg._sum.amount || 0) + Number(storePaidAgg._sum.subtotal || 0);
  const grandTotal = legacyCount + feeCount + storeCount;

  // ---- Rows: real pagination over the unified, date-ordered feed ----
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
  const pageSize = Math.min(200, Math.max(10, parseInt(searchParams.get("size") || "50", 10) || 50));
  const perSource = page * pageSize;

  const [payments, feePayments, storeOrders] = await Promise.all([
    prisma.payment.findMany({ where: legacyWhere, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    prisma.feePayment.findMany({
      where: feeWhere,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { receipt: true },
    }),
    prisma.storeOrder.findMany({
      where: storeWhere,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true, orderNo: true, name: true, email: true, phone: true, subtotal: true,
        status: true, paymentStatus: true, paymentMethod: true, source: true, studentCode: true,
        course: true, branch: true, receiptNo: true, manualNote: true, createdAt: true, userId: true,
      },
    }),
  ]);

  // Buyer details for the orders on this page (no N+1, skipped when empty)
  const orderUsers =
    storeOrders.length === 0
      ? []
      : await prisma.user.findMany({
          where: { id: { in: Array.from(new Set(storeOrders.map((o: any) => o.userId).filter(Boolean))) } },
          select: { id: true, name: true, email: true, phone: true, course: true, branch: true, studentId: true },
        });
  const orderUserById = new Map(orderUsers.map((u: any) => [u.id, u]));
  void perSource;

  // Batch-load related admissions + users for fee payment mapping (no N+1, skipped when empty)
  const admIds = Array.from(new Set(feePayments.map((p) => p.admissionId).filter(Boolean)));
  const stuIds = Array.from(new Set(feePayments.map((p) => String(p.studentId || "")).filter(Boolean)));
  const [adms, users] = feePayments.length === 0 ? [[], []] : await Promise.all([
    admIds.length > 0 ? prisma.admission.findMany({ where: { id: { in: admIds } }, select: { id: true, name: true, email: true, phone: true, course: true,  mode: true, branch: true } }) : Promise.resolve([]),
    stuIds.length > 0 ? prisma.user.findMany({ where: { id: { in: stuIds } }, select: { id: true, name: true, email: true, phone: true, course: true,  mode: true, branch: true } }) : Promise.resolve([]),
  ]);
  const admById = new Map(adms.map((a: any) => [a.id, a]));
  const userById = new Map(users.map((u: any) => [u.id, u]));

  const feeMapped = feePayments.map((p: any) => {
    const a = admById.get(p.admissionId);
    const u = userById.get(String(p.studentId || ""));
    const acked = p.status === "acknowledged";
    const dead = p.status === "rejected" || p.status === "failed";
    const amount = Number(p.amount || 0);
    return {
      id: p.id,
      admissionId: p.admissionId,
      student: u?.name || a?.name || "—",
      email: u?.email || a?.email || "",
      phone: u?.phone || a?.phone || "",
      course: a?.course || u?.course || "",
      branch: a?.branch || u?.branch || "",
      mode: a?.mode || u?.mode || "",
      amount,
      paidAmount: acked ? amount : 0,
      balance: acked ? 0 : amount,
      paymentMethod: p.method,
      transactionId: p.transactionId,
      status: acked ? "collected" : p.status,
      collected: acked ? amount : 0,
      receivable: dead ? 0 : amount,
      createdAt: p.createdAt.toISOString(),
      dueDate: null,
      screenshot: !!p.screenshot,
      approved: acked,
      src: "fee",
      receiptNo: p.receiptNo || p.receipt?.receiptNo || null,
      note: p.note || null,
    };
  });

  // Campus scope: fee payments carry the admission's campus, so filter after mapping.
  // A requested ?branch= must narrow these too — otherwise a drill-down still shows every campus.
  const scopedFee = keepBranch(
    feeMapped,
    only ? { branches: only } : scope.branches === null ? { branches: null } : { branches: [...scope.branches, ""] },
    (p: any) => p.branch,
  );

  // Store orders: unpaid = receivable, paid = collected. Counter sales are AR/AP too.
  const storeMapped = storeOrders.map((o: any) => {
    const amount = Number(o.subtotal || 0);
    const paid = o.paymentStatus === "success";
    const u = orderUserById.get(o.userId);
    return {
      id: o.id,
      admissionId: null,
      student: u?.name || o.name || "—",
      email: u?.email || o.email || "",
      phone: u?.phone || o.phone || "",
      course: o.course || u?.course || "Store",
      branch: o.branch || u?.branch || "",
      mode: "",
      amount,
      paidAmount: paid ? amount : 0,
      balance: paid ? 0 : amount,
      paymentMethod: o.paymentMethod || "",
      transactionId: null,
      status: paid ? "collected" : o.paymentStatus === "failed" ? "payment_failed" : "pending",
      collected: paid ? amount : 0,
      receivable: amount,
      createdAt: o.createdAt.toISOString(),
      dueDate: null,
      screenshot: false,
      approved: paid,
      src: "store",
      orderNo: o.orderNo,
      orderStatus: o.status,
      studentCode: o.studentCode || u?.studentId || null,
      receiptNo: o.receiptNo || null,
      note: o.manualNote || null,
    };
  });

  const formatted = [...payments.map((p: any) => {
    const fee = p.amount;
    const paidAmount = p.paidAmount;
    const isPaid = paidAmount >= fee;
    const balance = Math.max(0, fee - paidAmount);
    return {
      id: p.id,
      admissionId: p.admissionId,
      student: p.name,
      email: p.email,
      phone: p.phone,
      course: p.course,
      branch: p.branch || "",
      mode: p.mode,
      amount: fee,
      paidAmount,
      balance,
      paymentMethod: p.paymentMethod,
      transactionId: p.transactionId,
      status: isPaid ? "collected" : balance > 0 && balance < fee ? "partial" : p.status === "pending" && p.paymentMethod === "cash" ? "pending_cash" : p.paymentMethod !== "cash" && p.transactionId ? "pending_verification" : "pending",
      collected: paidAmount,
      receivable: fee,
      createdAt: p.createdAt.toISOString(),
      dueDate: p.dueDate?.toISOString() || null,
      screenshot: !!p.screenshot,
      approved: p.status === "approved",
      src: "legacy",
    };
  }), ...scopedFee, ...storeMapped].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Totals come from the aggregates above, NOT from this page of rows
  const totalPending = totalReceivable - totalCollected;
  const pages = Math.max(1, Math.ceil(grandTotal / pageSize));

  return NextResponse.json(
    {
      payments: formatted,
      totals: { totalReceivable, totalCollected, totalPending, count: grandTotal },
      page,
      size: pageSize,
      pages,
      usersCount,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
