"use client";

import Script from "next/script";
import { useConsent } from "@/components/consent/ConsentProvider";
import { getAdSenseClient } from "@/lib/ads-config";

export function AdSenseScript() {
  const { hasConsent } = useConsent();
  const client = getAdSenseClient();

  if (!client || !hasConsent("marketing")) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
