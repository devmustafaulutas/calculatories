import { ORGANIZATION } from "@/lib/site-config";
import { fetchSanity } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { getCmsFallbackSiteSettings } from "@/lib/cms-fallback";

export interface SiteSettings {
  organizationName: string;
  legalName: string;
  email: string;
  foundingDate: string;
  sameAs: string[];
  nav: { label: string; href: string; external?: boolean }[];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return getCmsFallbackSiteSettings();
  }

  const settings = await fetchSanity<SiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  });

  if (!settings) {
    return getCmsFallbackSiteSettings();
  }

  return {
    organizationName: settings.organizationName ?? ORGANIZATION.name,
    legalName: settings.legalName ?? ORGANIZATION.legalName,
    email: settings.email ?? ORGANIZATION.email,
    foundingDate: settings.foundingDate ?? ORGANIZATION.foundingDate,
    sameAs: settings.sameAs ?? [...ORGANIZATION.sameAs],
    nav: settings.nav ?? [],
  };
}
