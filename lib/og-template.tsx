import { SITE_NAME } from "@/lib/site-config";

export const OG_SIZE = { width: 1200, height: 630 } as const;

const GRADIENT_BG = "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)";

interface OgLayoutProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function OgLayout({ eyebrow, title, subtitle }: OgLayoutProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 60,
        background: GRADIENT_BG,
        color: "white",
      }}
    >
      {eyebrow ? (
        <div
          style={{
            fontSize: 28,
            opacity: 0.8,
            marginBottom: 16,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
      {subtitle ? (
        <div style={{ fontSize: 28, opacity: 0.7, marginTop: 32 }}>{subtitle}</div>
      ) : (
        <div style={{ fontSize: 28, opacity: 0.7, marginTop: 32 }}>{SITE_NAME}</div>
      )}
    </div>
  );
}

interface OgHomeProps {
  siteName: string;
  tagline: string;
}

export function OgHome({ siteName, tagline }: OgHomeProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: GRADIENT_BG,
        color: "white",
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 700 }}>{siteName}</div>
      <div style={{ fontSize: 32, opacity: 0.8, marginTop: 16 }}>{tagline}</div>
    </div>
  );
}
