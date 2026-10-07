import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { scopeFromAuth, resolveBranchFilter, canActOn, forbidBranch } from "@/lib/branch-scope";
import { audit } from "@/lib/identifiers";

export async function GET(req: NextRequest) {
  const auth = await requireAdminSession(req, ["super_admin", "finance"]);
  if (auth.error) return auth.error;
const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  // Campus scoping via the customer's registered campus
  const scope = scopeFromAuth(auth);
  const requested = resolveBranchFilter(scope, searchParams.get("branch"));
  if (requested.error) return NextResponse.json({ error: requested.error }, { status: 403 });
  let userWhere: any = {};
  if (scope.branches !== null) userWhere = { branch: { in: scope.branches } };
  else if (requested.branch) userWhere = { branch: requested.branch };
  const scoped = Object.keys(userWhere).length > 0 ? { user: userWhere } : {};
  const [orders, newCount] = await Promise.all([
    prisma.storeOrder.findMany({
      where: { ...(status && status !== "all" ? { status } : {}), ...scoped },
      include: { items: true, events: { orderBy: { createdAt: "asc" } } },
      orderBy: { createdAt: "desc" },
      take: 500,
    }),
    prisma.storeOrder.count({ where: { status: { in: ["placed", "payment_confirmed"] }, ...scoped } }),
  ]);
  return NextResponse.json({ orders, newCount }, { headers: { "Cache-Control": "no-store" } });
}

function manualOrderNo() {
  return `AYN-M-${Date.now().toString().slice(-6)}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
}

// POST — counter sale against an existing registered student.
// Student self-checkout also posts here (action=create), so the two paths share
// one status/AR/AP model: manual orders are just orders with source="manual".
export async function POST(req: NextRequest) {
  const auth = await requireAdminSession(req, ["super_admin"]);
  if (auth.error) return auth.error;
  const body = await req.json();
  const { id, action, note } = body;
  if (!id || !action) return NextResponse.json({ error: "id and action required" }, { status: 400 });

  const order = await prisma.storeOrder.findUnique({ where: { id } });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const actor = String(auth.session.username || auth.session.name || "admin");

const setStatus = async (status: string, extra: any = {}, eventAction: string, eventNote?: string) => {
    const updated = await prisma.storeOrder.update({ where: { id }, data: { status, ...extra } });
    await prisma.orderEvent.create({ data: { orderId: id, actor, action: eventAction, note: eventNote || note || null } });
    await audit("order", id, actor, eventAction, `${order.orderNo} ${order.status} -> ${status} (${order.name})`);
    return NextResponse.json(updated);
  };

  switch (action) {
    case "start_processing":
      if (!["placed", "payment_confirmed"].includes(order.status)) {
        return NextResponse.json({ error: `Cannot process from ${order.status}` }, { status: 400 });
      }
      return setStatus("processing", {}, "order_processed", "Moved to processing");
    case "mark_ready":
      if (!["processing", "payment_confirmed", "placed"].includes(order.status)) {
        return NextResponse.json({ error: `Cannot mark ready from ${order.status}` }, { status: 400 });
      }
      return setStatus("ready_for_handover", {}, "order_ready", "Ready for handover");
    case "handover":
      if (!["ready_for_handover", "processing", "payment_confirmed"].includes(order.status)) {
        return NextResponse.json({ error: `Cannot hand over from ${order.status}` }, { status: 400 });
      }
      return setStatus(
        "handed_over",
        { handedOverAt: new Date(), handedOverBy: actor },
        "order_handed_over",
        `Handed over by ${actor}${note ? ` — ${note}` : ""}`
      );
    case "complete":
      if (order.status !== "handed_over") {
        return NextResponse.json({ error: "Only handed-over orders can be completed" }, { status: 400 });
      }
      return setStatus("completed", {}, "order_completed", "Order completed");
case "cancel":
      if (["handed_over", "completed"].includes(order.status)) {
        return NextResponse.json({ error: "Cannot cancel after handover" }, { status: 400 });
      }
      return setStatus("cancelled", {}, "order_cancelled", note || "Cancelled by admin");
    case "mark_paid":
      // Counter sale settled in cash/UPI at the desk — flips the AR to collected
      if (order.paymentStatus === "success") {
        return NextResponse.json({ error: "Order is already marked paid" }, { status: 400 });
      }
      return setStatus(
        order.status,
        { paymentStatus: "success", paymentMethod: String(body.paymentMethod || "cash"), receiptNo: order.receiptNo || `RCP-${Date.now().toString().slice(-8)}` },
        "order_payment_confirmed",
        `Payment received (${String(body.paymentMethod || "cash")})${note ? ` — ${note}` : ""}`,
      );
    default:
      return NextResponse.json({ error: "unknown action" }, { status: 400 });
  }
}

// PUT — create a manual (counter) order for an existing student.
// Manual orders always link to a real student so the order shows on their account
// and rolls into campus AR/AP with the student's campus.
export async function PUT(req: NextRequest) {
  const auth = await requireAdminSession(req, ["super_admin", "finance"]);
  if (auth.error) return auth.error;
  const body = await req.json();
  const { studentId, items, paymentMethod, paid, note } = body;

  if (!studentId) return NextResponse.json({ error: "An existing student is required for a manual order" }, { status: 400 });
  if (!Array.isArray(items) || items.length === 0) return NextResponse.json({ error: "Add at least one item" }, { status: 400 });

  const student = await prisma.user.findUnique({ where: { id: String(studentId) } });
  if (!student) return NextResponse.json({ error: "Student not found — pick an existing registered student" }, { status: 404 });
  if (student.isActive === false) return NextResponse.json({ error: "That student account is inactive" }, { status: 400 });

  const scope = scopeFromAuth(auth);
  if (!canActOn(scope, student.branch)) return forbidBranch(student.branch);

  // Validate items and price server-side — never trust prices from the client.
  const wanted = items
    .map((i: any) => ({ storeItemId: String(i.storeItemId || ""), qty: Math.max(1, Math.floor(Number(i.qty) || 1)), size: i.size ? String(i.size).slice(0, 40) : null }))
    .filter((i: any) => i.storeItemId);
  if (wanted.length === 0) return NextResponse.json({ error: "No valid items" }, { status: 400 });

  const products = await prisma.storeItem.findMany({ where: { id: { in: Array.from(new Set(wanted.map((i: any) => i.storeItemId))) } } });
  const byId = new Map(products.map((p: any) => [p.id, p]));
  const lines: { storeItemId: string; name: string; price: number; qty: number; size: string | null }[] = [];
  for (const w of wanted) {
    const p: any = byId.get(w.storeItemId);
    if (!p) return NextResponse.json({ error: "One or more items no longer exist" }, { status: 400 });
    if (Array.isArray(p.sizes) && p.sizes.length > 0 && w.size && !p.sizes.includes(w.size)) {
      return NextResponse.json({ error: `Invalid size for ${p.name}` }, { status: 400 });
    }
    lines.push({ storeItemId: p.id, name: p.name, price: Number(p.price || 0), qty: w.qty, size: w.size });
  }
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  if (subtotal <= 0) return NextResponse.json({ error: "Order total must be greater than zero" }, { status: 400 });

  const isPaid = paid === true || paid === "true";
  const actor = String(auth.session.username || auth.session.name || "admin");
  const order = await prisma.$transaction(async (tx: any) => {
    const created = await tx.storeOrder.create({
      data: {
        orderNo: manualOrderNo(),
        userId: student.id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        subtotal,
        status: "placed",
        paymentStatus: isPaid ? "success" : "pending",
        paymentMethod: String(paymentMethod || "cash"),
        source: "manual",
        studentId: student.id,
        studentCode: student.studentId || null,
        course: student.course || null,
        branch: student.branch || null,
        manualNote: note ? String(note).slice(0, 500) : null,
        placedByAdmin: actor,
        receiptNo: isPaid ? `RCP-${Date.now().toString().slice(-8)}` : null,
        items: { create: lines },
        events: { create: { actor, action: "order_created_manual", note: `Counter sale by ${actor}${note ? ` — ${note}` : ""}` } },
      },
    });
    // Counter sales decrement stock immediately, like a paid online order.
    if (isPaid) {
      for (const l of lines) {
        await tx.storeItem.update({ where: { id: l.storeItemId }, data: { stock: { decrement: l.qty } } });
      }
    }
    return created;
  });

  await audit("order", order.id, actor, "order_created_manual", `${order.orderNo} manual ${order.subtotal} for ${student.name} (${student.studentId || student.id})`);
  return NextResponse.json({ ok: true, order });
}
