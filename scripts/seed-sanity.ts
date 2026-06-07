/**
 * Seed Sanity with migrated editorial content.
 * Usage: SANITY_API_WRITE_TOKEN=... NEXT_PUBLIC_SANITY_PROJECT_ID=... pnpm seed:sanity
 */

import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";
import migratedPostBody from "../data/migrated-post-body.json";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-12-01",
  useCdn: false,
});

const authors = [
  {
    _id: "author.sarah-chen",
    _type: "author" as const,
    name: "Sarah Chen",
    slug: { _type: "slug" as const, current: "sarah-chen" },
    role: "Lead Writer",
    jobTitle: "Personal Finance Editor",
    bio: [
      {
        _type: "block",
        _key: "bio0",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s0",
            text: "Sarah Chen has spent over a decade writing about personal finance, home buying, and budgeting for US households. She holds a degree in economics and specializes in making complex financial concepts accessible to everyday readers.",
            marks: [],
          },
        ],
      },
    ],
    credentials: ["B.A. Economics", "Certified Financial Education Instructor"],
    email: "sarah@calculatories.com",
    sameAs: [
      "https://www.linkedin.com/in/sarahchen",
      "https://twitter.com/sarahchen",
    ],
    knowsAbout: ["Personal finance", "Mortgages", "Home buying", "Budgeting"],
  },
  {
    _id: "author.michael-torres",
    _type: "author" as const,
    name: "Michael Torres, CPA",
    slug: { _type: "slug" as const, current: "michael-torres" },
    role: "Finance Reviewer",
    jobTitle: "Certified Public Accountant",
    bio: [
      {
        _type: "block",
        _key: "bio0",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s0",
            text: "Michael Torres is a licensed CPA with 15 years of experience in tax planning and real estate finance. He reviews all finance and legal calculators on Calculatories to ensure formulas, rates, and guidance meet professional standards.",
            marks: [],
          },
        ],
      },
    ],
    credentials: ["CPA", "M.S. Taxation"],
    email: "michael@calculatories.com",
    sameAs: ["https://www.linkedin.com/in/michaeltorrescpa"],
    knowsAbout: [
      "Tax planning",
      "Mortgage finance",
      "Real estate",
      "Financial auditing",
    ],
  },
  {
    _id: "author.emily-walsh",
    _type: "author" as const,
    name: "Dr. Emily Walsh",
    slug: { _type: "slug" as const, current: "emily-walsh" },
    legacyId: "dr-emily-walsh",
    role: "Health Reviewer",
    jobTitle: "Registered Dietitian",
    bio: [
      {
        _type: "block",
        _key: "bio0",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s0",
            text: "Dr. Emily Walsh is a registered dietitian and health educator who reviews health-related content and calculators. She ensures our health tools align with current clinical guidelines from the CDC, NIH, and WHO.",
            marks: [],
          },
        ],
      },
    ],
    credentials: ["Ph.D. Nutrition Science", "Registered Dietitian (RD)"],
    email: "emily@calculatories.com",
    sameAs: ["https://www.linkedin.com/in/emilywalshrd"],
    knowsAbout: [
      "Nutrition",
      "Body composition",
      "Public health",
      "Clinical guidelines",
    ],
  },
];

async function uploadAvatar(filename: string) {
  const filePath = path.join(process.cwd(), "public/authors", filename);
  if (!fs.existsSync(filePath)) return undefined;
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename,
  });
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
  };
}

async function seed() {
  console.log("Seeding authors...");
  for (const author of authors) {
    const avatar = await uploadAvatar(`${author.slug.current}.svg`);
    await client.createOrReplace({
      ...author,
      ...(avatar ? { avatar } : {}),
    } as Parameters<typeof client.createOrReplace>[0]);
    console.log(`  ✓ ${author.name}`);
  }

  console.log("Seeding blog category...");
  await client.createOrReplace({
    _id: "blogCategory.finance",
    _type: "blogCategory",
    title: "Finance",
    slug: { _type: "slug", current: "finance" },
    description:
      "Personal finance guides, mortgage tips, and money management articles.",
  });

  console.log("Seeding tags...");
  const tags = [
    { _id: "tag.mortgage", title: "mortgage", slug: "mortgage" },
    { _id: "tag.home-buying", title: "home buying", slug: "home buying" },
    {
      _id: "tag.personal-finance",
      title: "personal finance",
      slug: "personal finance",
    },
  ];
  for (const tag of tags) {
    await client.createOrReplace({ _type: "tag", ...tag });
    console.log(`  ✓ ${tag.title}`);
  }

  console.log("Seeding blog post...");
  const postMeta = {
    title: "How to Calculate Mortgage Payments: A Complete Guide",
    slug: "how-to-calculate-mortgage-payments",
    description:
      "Learn the mortgage payment formula and understand all the factors that affect your monthly payment. A comprehensive guide for first-time home buyers.",
    publishedAt: "2024-01-15",
    updatedAt: "2025-06-01",
  };

  await client.createOrReplace({
    _id: "post.how-to-calculate-mortgage-payments",
    _type: "post",
    title: postMeta.title,
    slug: { _type: "slug", current: postMeta.slug },
    excerpt: postMeta.description,
    body: migratedPostBody,
    author: { _type: "reference", _ref: "author.sarah-chen" },
    reviewer: { _type: "reference", _ref: "author.michael-torres" },
    blogCategory: { _type: "reference", _ref: "blogCategory.finance" },
    tags: [
      { _type: "reference", _ref: "tag.mortgage", _key: "t0" },
      { _type: "reference", _ref: "tag.home-buying", _key: "t1" },
      { _type: "reference", _ref: "tag.personal-finance", _key: "t2" },
    ],
    publishedAt: `${postMeta.publishedAt}T12:00:00.000Z`,
    updatedAt: `${postMeta.updatedAt}T12:00:00.000Z`,
    faq: [],
    seo: {
      metaDescription: postMeta.description,
    },
  });
  console.log(`  ✓ ${postMeta.slug}`);

  console.log("Seeding site settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    organizationName: "Calculatories",
    legalName: "Calculatories",
    email: "hello@calculatories.com",
    foundingDate: "2024",
    sameAs: [
      "https://twitter.com/calculatories",
      "https://www.linkedin.com/company/calculatories",
    ],
    nav: [
      { _key: "n0", label: "Blog", href: "/blog", external: false },
      { _key: "n1", label: "About", href: "/about", external: false },
      {
        _key: "n2",
        label: "Editorial Policy",
        href: "/editorial-policy",
        external: false,
      },
    ],
  });

  console.log("\nSeed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
