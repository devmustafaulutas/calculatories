import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new NextResponse("Invalid secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const redirectPath = slug ?? "/";
  return NextResponse.redirect(new URL(redirectPath, request.url));
}
