import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

interface WebhookPayload {
  _type: string;
  slug?: { current?: string };
  slugString?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const slug =
      body.slug?.current ?? body.slugString ?? undefined;

    switch (body._type) {
      case "post":
        revalidateTag("post", "max");
        if (slug) revalidateTag(`post:${slug}`, "max");
        revalidateTag("blog:index", "max");
        break;
      case "author":
        revalidateTag("author", "max");
        if (slug) revalidateTag(`author:${slug}`, "max");
        break;
      case "blogCategory":
        revalidateTag("blogCategory", "max");
        revalidateTag("blog:index", "max");
        break;
      case "tag":
        revalidateTag("tag", "max");
        revalidateTag("blog:index", "max");
        break;
      case "siteSettings":
        revalidateTag("siteSettings", "max");
        break;
      default:
        break;
    }

    return NextResponse.json({ revalidated: true, type: body._type, slug });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
