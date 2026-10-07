import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { scopeFromAuth, resolveBranchFilter, canActOn, forbidBranch } from "@/lib/branch-scope";
import { supabaseAdmin } from "@/lib/supabase";
import { sendEmail, tplStaffCreated } from "@/lib/email";
import { newStudentId } from "@/lib/identifiers";

function stripSensitive(user: any) {
  const { passwordHash, supabaseId, ...safe } = user;
  return safe;
}

// Best-effort credential email. Never let a mail failure undo a created account.
async function emailCredentials(opts: { to: string; name: string; password: string; course?: string; branch?: string; studentId?: string; createdBy?: string }) {
  try {
    const tpl = tplStaffCreated({
      name: opts.name,
      email: opts.to,
      tempPassword: opts.password,
      course: opts.course,
      branch: opts.branch,
      studentId: opts.studentId,
      createdBy: opts.createdBy,
    });
    const res = await sendEmail({ to: opts.to, subject: tpl.subject, html: tpl.html });
    return { emailSent: res.ok, emailError: res.ok ? null : res.error || "Email not sent" };
  } catch (e: any) {
    return { emailSent: false, emailError: e?.message || "Email failed" };
  }
}

export async function GET(req: NextRequest) {
  const auth = await requireAdminSession(req, ["super_admin", "admissions", "finance"]);
  if (auth.error) return auth.error;
  const scope = scopeFromAuth(auth);
  const { searchParams } = new URL(req.url);
  const requested = resolveBranchFilter(scope, searchParams.get("branch"));
  if (requested.error) return NextResponse.json({ error: requested.error }, { status: 403 });
  const where: any = {};
  if (scope.branches !== null) where.branch = { in: scope.branches };
  else if (requested.branch) where.branch = requested.branch;
  const users = await prisma.user.findMany({ where, orderBy: { createdAt: "desc" }, take: 2000 });
  return NextResponse.json(users.map(stripSensitive), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminSession(req, ["super_admin", "admissions"]);
  if (auth.error) return auth.error;
  const body = await req.json();
  const { id, action, password, name, fatherName, email, phone, address, reference, branch, course, courseType, mode, active } = body;

if (action === "create") {
    if (!name || !email || !phone || !password) return NextResponse.json({ error: "name, email, phone, password required" }, { status: 400 });
    if (!/^[0-9]{10}$/.test(String(phone))) return NextResponse.json({ error: "phone must be 10 digits" }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: "password min 6 chars" }, { status: 400 });
    const exists = await prisma.user.findUnique({ where: { email: String(email).toLowerCase() } });
    if (exists) return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    // Campus guard: a campus admin may only create students at their own campuses
    if (!canActOn(scopeFromAuth(auth), branch)) return forbidBranch(branch);
    // Students get a real student ID so the login email can show it
    let assignedStudentId: string | null = null;
    try {
      assignedStudentId = await newStudentId();
    } catch {}

    // Create Supabase Auth user first
    const { data: supaData, error: supaError } = await supabaseAdmin.auth.admin.createUser({
      email: String(email).trim().toLowerCase(),
      password: String(password),
      email_confirm: true,
      user_metadata: { name: String(name).trim(), phone: String(phone).trim(), course: String(course || "SI PC") },
    });
    if (supaError) return NextResponse.json({ error: `Supabase error: ${supaError.message}` }, { status: 400 });

    const user = await prisma.user.create({
      data: {
        name: String(name).trim(),
        fatherName: String(fatherName || "").trim(),
        email: String(email).trim().toLowerCase(),
        phone: String(phone).trim(),
        address: String(address || "").trim(),
        reference: String(reference || "").trim(),
        branch: String(branch || ""),
        course: String(course || "SI PC"),
        courseType: String(courseType || "Regular"),
        mode: String(mode || "Residential"),
        supabaseId: supaData.user.id,
        studentId: assignedStudentId,
        isActive: true,
      },
    });
    const mail = await emailCredentials({
      to: user.email,
      name: user.name,
      password: String(password),
      course: user.course,
      branch: user.branch || undefined,
      studentId: user.studentId || undefined,
      createdBy: auth.session.username || auth.session.userId,
    });
    return NextResponse.json({ ok: true, ...mail, user: stripSensitive(user) });
  }

if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  // Campus guard: block toggle/reset/update/delete on another campus's student
  if (!canActOn(scopeFromAuth(auth), user.branch)) return forbidBranch(user.branch);
  // Only a super_admin may move a student between campuses
  if (branch !== undefined && String(branch) !== String(user.branch || "") && auth.session.role !== "super_admin") {
    return NextResponse.json({ error: "Only super_admin can move a student to another campus" }, { status: 403 });
  }

  let updated: any;
  let mail: { emailSent: boolean; emailError: string | null } | null = null;
  if (action === "toggleActive") {
    updated = await prisma.user.update({ where: { id }, data: { isActive: active !== undefined ? !!active : !user.isActive } });
    // Optionally also ban/unban in Supabase
    if (user.supabaseId) {
      await supabaseAdmin.auth.admin.updateUserById(user.supabaseId, { ban_duration: updated.isActive ? "none" : "876000h" } as any);
    }
  } else if (action === "resetPassword") {
    if (!password || password.length < 8) return NextResponse.json({ error: "Password min 6 chars" }, { status: 400 });
    if (user.supabaseId) {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(user.supabaseId, { password: String(password) });
      if (error) return NextResponse.json({ error: `Supabase error: ${error.message}` }, { status: 400 });
    } else {
      // Create Supabase user if not exists (migration case)
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: String(password),
        email_confirm: true,
      });
      if (error) return NextResponse.json({ error: `Supabase error: ${error.message}` }, { status: 400 });
      await prisma.user.update({ where: { id }, data: { supabaseId: data.user.id } });
    }
    updated = await prisma.user.findUnique({ where: { id } });
    // The new password only exists in this request — mail it so the student is not locked out.
    mail = await emailCredentials({
      to: user.email,
      name: user.name,
      password: String(password),
      course: user.course,
      branch: user.branch || undefined,
      studentId: user.studentId || undefined,
      createdBy: auth.session.username || auth.session.userId,
    });
  } else if (action === "update") {
    const newEmail = email ? String(email).toLowerCase() : undefined;
    // If email changing, update Supabase as well
    if (newEmail && newEmail !== user.email && user.supabaseId) {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(user.supabaseId, { email: newEmail });
      if (error) return NextResponse.json({ error: `Supabase error: ${error.message}` }, { status: 400 });
    }
    updated = await prisma.user.update({
      where: { id },
      data: {
        name: name ? String(name) : undefined,
        fatherName: fatherName !== undefined ? String(fatherName) : undefined,
        email: newEmail,
        phone: phone ? String(phone) : undefined,
        address: address !== undefined ? String(address) : undefined,
        reference: reference !== undefined ? String(reference) : undefined,
        branch: branch !== undefined ? String(branch) : undefined,
        course: course ? String(course) : undefined,
        courseType: courseType !== undefined ? String(courseType) : undefined,
        mode: mode ? String(mode) : undefined,
      },
    });
  } else if (action === "delete") {
    if (user.supabaseId) {
      await supabaseAdmin.auth.admin.deleteUser(user.supabaseId);
    }
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } else {
    return NextResponse.json({ error: "unknown action" }, { status: 400 });
  }
  return NextResponse.json({ ok: true, ...(mail || {}), user: stripSensitive(updated) });
}
