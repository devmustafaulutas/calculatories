import { ImageResponse } from "next/og";
import { OG_SIZE, OgHome } from "@/lib/og-template";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";

export const alt = "Calculatories";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OgImage() {
  return new ImageResponse(
    <OgHome siteName={SITE_NAME} tagline={SITE_TAGLINE} />,
    { ...size },
  );
}
