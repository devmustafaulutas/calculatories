import type { Author } from "@/data/schemas/author";
import { urlFor } from "./client";
import { portableTextToPlainText } from "./plain-text";

interface SanityAuthorRecord {
  _id: string;
  name: string;
  slug: string;
  legacyId?: string | null;
  role: string;
  jobTitle: string;
  bio?: unknown;
  credentials?: string[] | null;
  email: string;
  avatar?: {
    asset?: { _ref: string };
  } | null;
  sameAs?: string[] | null;
  knowsAbout?: string[] | null;
}

export function mapSanityAuthor(record: SanityAuthorRecord): Author {
  const avatar = record.avatar?.asset
    ? urlFor(record.avatar).width(200).height(200).url()
    : `/authors/${record.slug}.svg`;

  return {
    id: record.legacyId ?? record.slug,
    name: record.name,
    slug: record.slug,
    role: record.role,
    jobTitle: record.jobTitle,
    bio: portableTextToPlainText(record.bio),
    credentials: record.credentials ?? [],
    avatar,
    sameAs: record.sameAs ?? [],
    knowsAbout: record.knowsAbout ?? [],
    email: record.email,
  };
}
