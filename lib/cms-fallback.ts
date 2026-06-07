import type { Author } from "@/data/schemas/author";
import migratedPostBody from "@/data/migrated-post-body.json";
import { ORGANIZATION } from "@/lib/site-config";
import type { BlogFaqItem, BlogPostFull, BlogPostMeta } from "@/lib/blog/sanity";
import type { SiteSettings } from "@/lib/site-settings";

const AUTHORS: Author[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    slug: "sarah-chen",
    role: "Lead Writer",
    jobTitle: "Personal Finance Editor",
    bio: "Sarah Chen has spent over a decade writing about personal finance, home buying, and budgeting for US households. She holds a degree in economics and specializes in making complex financial concepts accessible to everyday readers.",
    credentials: ["B.A. Economics", "Certified Financial Education Instructor"],
    avatar: "/authors/sarah-chen.svg",
    sameAs: [
      "https://www.linkedin.com/in/sarahchen",
      "https://twitter.com/sarahchen",
    ],
    knowsAbout: ["Personal finance", "Mortgages", "Home buying", "Budgeting"],
    email: "sarah@calculatories.com",
  },
  {
    id: "michael-torres",
    name: "Michael Torres, CPA",
    slug: "michael-torres",
    role: "Finance Reviewer",
    jobTitle: "Certified Public Accountant",
    bio: "Michael Torres is a licensed CPA with 15 years of experience in tax planning and real estate finance. He reviews all finance and legal calculators on Calculatories to ensure formulas, rates, and guidance meet professional standards.",
    credentials: ["CPA", "M.S. Taxation"],
    avatar: "/authors/michael-torres.svg",
    sameAs: ["https://www.linkedin.com/in/michaeltorrescpa"],
    knowsAbout: [
      "Tax planning",
      "Mortgage finance",
      "Real estate",
      "Financial auditing",
    ],
    email: "michael@calculatories.com",
  },
  {
    id: "dr-emily-walsh",
    name: "Dr. Emily Walsh",
    slug: "emily-walsh",
    role: "Health Reviewer",
    jobTitle: "Registered Dietitian",
    bio: "Dr. Emily Walsh is a registered dietitian and health educator who reviews health-related content and calculators. She ensures our health tools align with current clinical guidelines from the CDC, NIH, and WHO.",
    credentials: ["Ph.D. Nutrition Science", "Registered Dietitian (RD)"],
    avatar: "/authors/emily-walsh.svg",
    sameAs: ["https://www.linkedin.com/in/emilywalshrd"],
    knowsAbout: ["Nutrition", "Body composition", "Public health", "Clinical guidelines"],
    email: "emily@calculatories.com",
  },
];

const MIGRATED_POST_META = {
  slug: "how-to-calculate-mortgage-payments",
  title: "How to Calculate Mortgage Payments: A Complete Guide",
  description:
    "Learn the mortgage payment formula and understand all the factors that affect your monthly payment. A comprehensive guide for first-time home buyers.",
  category: "Finance",
  categorySlug: "finance",
  tags: ["mortgage", "home buying", "personal finance"],
  tagTitles: ["mortgage", "home buying", "personal finance"],
  authorId: "sarah-chen",
  authorSlug: "sarah-chen",
  reviewerId: "michael-torres",
  publishedAt: "2024-01-15",
  updatedAt: "2025-06-01",
};

function estimateReadTime(body: unknown): string {
  if (!Array.isArray(body)) return "5 min read";
  const words = body
    .filter((b: { _type?: string }) => b._type === "block")
    .flatMap((b: { children?: { text?: string }[] }) =>
      (b.children ?? []).map((c) => c.text ?? ""),
    )
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

let cachedPost: BlogPostFull | null = null;

export function getCmsFallbackAuthors(): Author[] {
  return AUTHORS;
}

export function getCmsFallbackAuthor(idOrSlug: string): Author | undefined {
  return AUTHORS.find(
    (a) => a.id === idOrSlug || a.slug === idOrSlug,
  );
}

export function getCmsFallbackSiteSettings(): SiteSettings {
  return {
    organizationName: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    email: ORGANIZATION.email,
    foundingDate: ORGANIZATION.foundingDate,
    sameAs: [...ORGANIZATION.sameAs],
    nav: [
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Editorial Policy", href: "/editorial-policy" },
    ],
  };
}

export function getCmsFallbackPosts(): BlogPostMeta[] {
  const post = getCmsFallbackPost();
  if (!post) return [];
  return [
    {
      slug: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
      categorySlug: post.categorySlug,
      tags: post.tags,
      tagTitles: post.tagTitles,
      authorId: post.authorId,
      authorSlug: post.authorSlug,
      reviewerId: post.reviewerId,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      readTime: post.readTime,
      noindex: false,
    },
  ];
}

export function getCmsFallbackPost(): BlogPostFull | null {
  if (cachedPost) return cachedPost;

  const author = getCmsFallbackAuthor(MIGRATED_POST_META.authorId);
  const reviewer = MIGRATED_POST_META.reviewerId
    ? (getCmsFallbackAuthor(MIGRATED_POST_META.reviewerId) ?? null)
    : null;

  if (!author) return null;

  const body = migratedPostBody;

  cachedPost = {
    ...MIGRATED_POST_META,
    readTime: estimateReadTime(body),
    noindex: false,
    body,
    faq: [],
    seo: { metaDescription: MIGRATED_POST_META.description },
    author,
    reviewer,
  };

  return cachedPost;
}

export function isCmsFallbackEnabled(): boolean {
  return !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
}
