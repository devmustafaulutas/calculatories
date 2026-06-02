interface HeaderAdProps {
  adSlot: string;
  adClient: string;
}

export function HeaderAd({ adSlot, adClient }: HeaderAdProps) {
  return (
    <div className="w-full bg-muted/50 border-b">
      <div className="container mx-auto py-2">
        <div
          className="min-h-[90px] flex items-center justify-center text-muted-foreground text-sm"
          data-ad-slot={adSlot}
          data-ad-client={adClient}
        >
          {/* AdSense Script would initialize here */}
          <span className="sr-only">Advertisement</span>
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "90px" }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}

interface InContentAdProps {
  adSlot: string;
  adClient: string;
  className?: string;
}

export function InContentAd({ adSlot, adClient, className = "" }: InContentAdProps) {
  return (
    <div className={`my-8 ${className}`}>
      <div
        className="min-h-[250px] bg-muted/30 rounded-lg flex items-center justify-center text-muted-foreground text-sm border border-dashed border-border"
        data-ad-slot={adSlot}
        data-ad-client={adClient}
      >
        <span className="sr-only">Advertisement</span>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: "250px" }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

interface SidebarAdProps {
  adSlot: string;
  adClient: string;
}

export function SidebarAd({ adSlot, adClient }: SidebarAdProps) {
  return (
    <div className="sticky top-24">
      <div
        className="min-h-[600px] bg-muted/30 rounded-lg flex items-center justify-center text-muted-foreground text-sm border border-dashed border-border"
        data-ad-slot={adSlot}
        data-ad-client={adClient}
      >
        <span className="sr-only">Advertisement</span>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "300px", minHeight: "600px" }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="vertical"
        />
      </div>
    </div>
  );
}
