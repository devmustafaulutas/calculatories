import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteSettings } from "@/lib/site-settings";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site-config";
import { organization, website } from "@/lib/schema";
import { projectId } from "@/sanity/lib/client";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free online calculators for finance, health, salary, and productivity. Accurate, fast, and easy to use tools for mortgage, BMI, compound interest, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description:
      "Free online calculators for finance, health, salary, and productivity.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description:
      "Free online calculators for finance, health, salary, and productivity.",
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <JsonLd
          data={[
            organization({
              name: settings.organizationName,
              legalName: settings.legalName,
              email: settings.email,
              foundingDate: settings.foundingDate,
              sameAs: settings.sameAs,
            }),
            website(),
          ]}
        />
        <ConsentProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
          >
            Skip to main content
          </a>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Header />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
          <ConsentBanner />
          <AdSenseScript />
        </ConsentProvider>
        {projectId ? <SanityLive /> : null}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
