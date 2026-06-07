export const SITE_URL = "https://calculatories.com" as const;

export const SITE_NAME = "Calculatories";

export const SITE_TAGLINE = "Free Online Calculators";

export const SUPPORTED_LOCALES = [
  "en-US",
  "en-GB",
  "en-CA",
  "en-AU",
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en-US";

export const SOCIAL_HANDLES = {
  twitter: "@calculatories",
  facebook: "calculatories",
} as const;

export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Calculatories - Free Online Calculators",
} as const;

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "Calculatories",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  email: "hello@calculatories.com",
  foundingDate: "2024",
  sameAs: [
    "https://twitter.com/calculatories",
    "https://www.linkedin.com/company/calculatories",
  ],
} as const;

export const PUBLISHER = {
  name: SITE_NAME,
  logo: {
    url: `${SITE_URL}/icon.svg`,
    width: 512,
    height: 512,
  },
} as const;
