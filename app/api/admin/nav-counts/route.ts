import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { scopeFromAuth, resolveBranchFilter } from "@/lib/branch-scope";

// Small, single request that powers the badge counts in the admin navigation.
// Kept separate from the heavy per-tab endpoints so the shell can poll cheaply.
export async function GET(req: NextRequest) {
  const auth = await requireAdminSession(req);
  if (auth.error) return auth.error;

  const scope = scopeFromAuth(auth);
  const { searchParams } = new URL(req.url);
  const requested = resolveBranchFilter(scope, searchParams.get("branch"));
  if (requested.error) return NextResponse.json({ error: requested.error }, { status: 403 });

  // A campus admin is limited to their campuses; a drill-down narrows further.
  const branches = requested.branch ? [requested.branch] : scope.branches;
  const branchWhere = branches === null ? {} : { branch: { in: branches } };

  const now = new Date();

  // Installments have no branch column, so scope them via their admissions.
  let dueAdmissionIds: string[] | null = null;
  if (branches !== null) {
    const adms = await prisma.admission.findMany({
      where: { branch: { in: branches } },
      select: { id: true },
      take: 20000,
    });
    dueAdmissionIds = adms.map((a) => a.id);
  }

  const [admissions, complaints, orders, dues] = await Promise.all([
    prisma.admission.count({
      where: { status: { in: ["pending", "clarification_required", "discount_pending"] }, ...branchWhere },
    }),
    prisma.complaint.count({
      where: { status: { in: ["open", "in_progress"] }, ...branchWhere },
    }),
    prisma.storeOrder.count({
      where: {
        status: { in: ["placed", "payment_confirmed"] },
        ...(branches === null ? {} : { branch: { in: [...branches, ""] } }),
      },
    }),
    prisma.installment.count({
      where: {
        dueDate: { lt: now },
        status: { not: "paid" },
        ...(dueAdmissionIds === null ? {} : { admissionId: { in: dueAdmissionIds } }),
      },
    }),
  ]);

  return NextResponse.json(
    { admissions, complaints, orders, dues },
    { headers: { "Cache-Control": "no-store" } },
  );
}