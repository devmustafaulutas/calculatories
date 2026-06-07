/** Returns the AdSense publisher client ID when configured, otherwise null. */
export function getAdSenseClient(): string | null {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client || client === "ca-pub-XXXXXXXX") return null;
  return client;
}

export const AD_SLOTS = {
  header: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER ?? "0000000000",
  inContent: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT ?? "0000000001",
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? "0000000002",
} as const;
