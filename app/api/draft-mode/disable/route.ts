import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site-config";

export async function GET() {
  const draft = await draftMode();
  draft.disable();
  return NextResponse.redirect(new URL("/", SITE_URL));
}
