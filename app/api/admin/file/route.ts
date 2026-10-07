// Admin-only, short-lived signed URL for a private storage object (Aadhaar cards).
// The stored value is "<bucket>/<path>"; the object stays private and is never exposed publicly.
import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth-helpers";
import { supabaseAdmin } from "@/lib/supabase";

const PRIVATE_BUCKETS = ["aadhaar-cards"];
const SIGNED_TTL_SECONDS = 600;

export async function GET(req: NextRequest) {
  const auth = await requireAdminSession(req, ["super_admin", "admissions", "finance"]);
  if (auth.error) return auth.error;

  const ref = String(new URL(req.url).searchParams.get("ref") || "").trim();
  if (!ref) return NextResponse.json({ error: "ref required" }, { status: 400 });

  const slash = ref.indexOf("/");
  if (slash <= 0) return NextResponse.json({ error: "invalid ref" }, { status: 400 });
  const bucket = ref.slice(0, slash);
  const path = ref.slice(slash + 1);
  if (!PRIVATE_BUCKETS.includes(bucket)) return NextResponse.json({ error: "not a private object" }, { status: 400 });
  // Defend against traversal attempts in the object key
  if (path.includes("..")) return NextResponse.json({ error: "invalid path" }, { status: 400 });

  const { data, error } = await supabaseAdmin.storage.from(bucket).createSignedUrl(path, SIGNED_TTL_SECONDS);
  if (error || !data?.signedUrl) return NextResponse.json({ error: error?.message || "Could not sign URL" }, { status: 404 });

  return NextResponse.json(
    { url: data.signedUrl, expiresIn: SIGNED_TTL_SECONDS },
    { headers: { "Cache-Control": "no-store, private" } },
  );
}