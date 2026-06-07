import { ORGANIZATION, PUBLISHER, SITE_NAME, SITE_URL } from "@/lib/site-config";
import { canonicalUrl } from "@/lib/urls";
import type { Author } from "@/data/schemas/author";
import type { FAQItem } from "@/lib/types";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SoftwareApplicationInput {
  name: string;
  description: string;
  url: string;
  schemaType: "WebApplication" | "SoftwareApplication";
  applicationCategory: string;
}

export interface ArticleInput {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: Author;
  reviewer?: Author;
}

export interface OrganizationInput {
  name?: string;
  legalName?: string;
  email?: string;
  foundingDate?: string;
  sameAs?: string[];
}

export function organization(overrides?: OrganizationInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: overrides?.name ?? ORGANIZATION.name,
    legalName: overrides?.legalName ?? ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    email: overrides?.email ?? ORGANIZATION.email,
    foundingDate: overrides?.foundingDate ?? ORGANIZATION.foundingDate,
    sameAs: overrides?.sameAs ?? ORGANIZATION.sameAs,
  };
}

export function website() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumb(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: canonicalUrl(item.href) } : {}),
    })),
  };
}

export function softwareApplication(input: SoftwareApplicationInput) {
  return {
    "@context": "https://schema.org",
    "@type": input.schemaType,
    name: input.name,
    description: input.description,
    url: input.url,
    applicationCategory: input.applicationCategory,
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function faqPage(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function person(author: Author) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": canonicalUrl(`/authors/${author.slug}`),
    name: author.name,
    jobTitle: author.jobTitle,
    description: author.bio,
    image: author.avatar.startsWith("http")
      ? author.avatar
      : canonicalUrl(author.avatar),
    email: author.email,
    sameAs: author.sameAs,
    knowsAbout: author.knowsAbout,
  };
}

export function article(input: ArticleInput) {
  const authorSchema = person(input.author);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    image: input.image,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: { "@id": authorSchema["@id"] },
    publisher: {
      "@type": "Organization",
      name: PUBLISHER.name,
      logo: {
        "@type": "ImageObject",
        url: PUBLISHER.logo.url,
        width: PUBLISHER.logo.width,
        height: PUBLISHER.logo.height,
      },
    },
    ...(input.reviewer
      ? {
          reviewedBy: {
            "@type": "Person",
            name: input.reviewer.name,
            jobTitle: input.reviewer.jobTitle,
          },
        }
      : {}),
  };
}

export function collectionPage(input: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: input.url,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export const APPLICATION_CATEGORIES: Record<string, string> = {
  finance: "FinanceApplication",
  health: "HealthApplication",
  salary: "BusinessApplication",
  tools: "UtilitiesApplication",
  legal: "BusinessApplication",
  productivity: "UtilitiesApplication",
};
