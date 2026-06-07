"use client";

import { useEffect, useRef, useState } from "react";
import { useConsent } from "@/components/consent/ConsentProvider";
import { AD_SLOTS, getAdSenseClient } from "@/lib/ads-config";

export function HeaderAd() {
  const { hasConsent } = useConsent();
  const client = getAdSenseClient();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showAd = visible && client && hasConsent("marketing");

  return (
    <div ref={ref} className="w-full mb-6" style={{ minHeight: 90 }}>
      {showAd ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: 90 }}
          data-ad-client={client}
          data-ad-slot={AD_SLOTS.header}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      ) : (
        <div
          className="h-[90px] bg-muted/30 rounded-lg border border-dashed border-border flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="sr-only">Advertisement</span>
        </div>
      )}
    </div>
  );
}
