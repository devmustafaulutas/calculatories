import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://calculatories.com"),
  title: {
    default: "Calculatories - Free Online Calculators",
    template: "%s | Calculatories",
  },
  description:
    "Free online calculators for finance, health, salary, and productivity. Accurate, fast, and easy to use tools for mortgage, BMI, compound interest, and more.",
  keywords: [
    "calculator",
    "online calculator",
    "mortgage calculator",
    "BMI calculator",
    "compound interest calculator",
    "finance calculator",
    "health calculator",
  ],
  authors: [{ name: "Calculatories" }],
  creator: "Calculatories",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://calculatories.com",
    siteName: "Calculatories",
    title: "Calculatories - Free Online Calculators",
    description:
      "Free online calculators for finance, health, salary, and productivity.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Calculatories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculatories - Free Online Calculators",
    description:
      "Free online calculators for finance, health, salary, and productivity.",
    images: ["/og-image.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
