"use client";

import { useEffect, useState } from "react";
import { useConsent } from "@/components/consent/ConsentProvider";
import { Button } from "@/components/ui/button";

export function ConsentBanner() {
  const { showBanner, acceptAll, rejectAll } = useConsent();
  const [deferred, setDeferred] = useState(false);

  useEffect(() => {
    // Defer until after main content paints (improves LCP; banner still shows promptly)
    const id = window.setTimeout(() => setDeferred(true), 1500);
    return () => window.clearTimeout(id);
  }, []);

  if (!showBanner || !deferred) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-50 p-4 bg-background border-t shadow-lg"
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground max-w-xl">
          {/* TODO: Integrate real CMP (OneTrust, Cookiebot, or iubenda) for GDPR/UK/CA/AU compliance */}
          We use cookies for ads and analytics.
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={rejectAll}>
            Reject non-essential
          </Button>
          <Button
            size="sm"
            onClick={acceptAll}
            className="bg-blue-800 text-white hover:bg-blue-900"
          >
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
