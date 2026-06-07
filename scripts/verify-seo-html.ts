/**
 * Post-build SEO HTML verification.
 * Usage: pnpm build && pnpm start (in another terminal) && pnpm verify:seo
 * Optional: BASE_URL=http://localhost:3000 pnpm verify:seo
 */

import { bmiFaqs } from "../content/tools/bmi-calculator";
import { bmrFaqs } from "../content/tools/bmr-calculator";
import { bodyFatFaqs } from "../content/tools/body-fat-calculator";
import { calorieFaqs } from "../content/tools/calorie-calculator";
import { compoundInterestFaqs } from "../content/tools/compound-interest-calculator";
import { idealWeightFaqs } from "../content/tools/ideal-weight-calculator";
import { loanRepaymentFaqs } from "../content/tools/loan-repayment-calculator";
import { macroFaqs } from "../content/tools/macro-calculator";
import { mortgageFaqs } from "../content/tools/mortgage-calculator";
import type { FAQItem } from "../lib/types";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const BLOG_PATH = "/blog/how-to-calculate-mortgage-payments";

interface CheckResult {
  name: string;
  pass: boolean;
  detail?: string;
}

interface ToolPageConfig {
  label: string;
  path: string;
  canonical: string;
  faqs: FAQItem[];
  toolName: string;
  keyword: string;
  categoryName: string;
  internalPaths: string[];
}

const results: CheckResult[] = [];

function check(name: string, pass: boolean, detail?: string) {
  results.push({ name, pass, detail });
  const icon = pass ? "PASS" : "FAIL";
  console.log(`[${icon}] ${name}${detail ? ` — ${detail}` : ""}`);
}

function prefixCheck(label: string, name: string, pass: boolean, detail?: string) {
  check(`[${label}] ${name}`, pass, detail);
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function extractJsonLd(html: string): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [];
  const regex =
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch {
      // skip malformed
    }
  }
  return schemas;
}

async function fetchHtml(path: string): Promise<string> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
  return res.text();
}

async function headOk(path: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

async function verifyToolPage(config: ToolPageConfig) {
  const {
    label,
    path,
    canonical,
    faqs,
    toolName,
    keyword,
    categoryName,
    internalPaths,
  } = config;
  console.log(`\n--- ${label} ---\n`);
  const html = await fetchHtml(path);

  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  prefixCheck(label, "Exactly one H1", h1Count === 1, `found ${h1Count}`);

  for (const faq of faqs) {
    prefixCheck(
      label,
      `FAQ answer in HTML: "${faq.question.slice(0, 40)}…"`,
      html.includes(faq.answer),
    );
  }

  const schemas = extractJsonLd(html);
  const faqSchema = schemas.find((s) => s["@type"] === "FAQPage") as
    | { mainEntity?: { acceptedAnswer?: { text?: string } }[] }
    | undefined;

  if (faqSchema?.mainEntity) {
    for (let i = 0; i < faqs.length; i++) {
      const schemaAnswer = faqSchema.mainEntity[i]?.acceptedAnswer?.text;
      prefixCheck(
        label,
        `FAQ JSON-LD matches DOM (Q${i + 1})`,
        schemaAnswer === faqs[i].answer,
      );
    }
  } else {
    prefixCheck(label, "FAQPage JSON-LD present", false, "not found");
  }

  prefixCheck(
    label,
    "WebApplication JSON-LD",
    schemas.some(
      (s) => s["@type"] === "WebApplication" || s["@type"] === "SoftwareApplication",
    ),
  );

  const breadcrumb = schemas.find((s) => s["@type"] === "BreadcrumbList") as
    | { itemListElement?: { name?: string }[] }
    | undefined;
  if (breadcrumb?.itemListElement) {
    const names = breadcrumb.itemListElement.map((i) => i.name);
    prefixCheck(
      label,
      `BreadcrumbList: Home > ${categoryName} > Tool`,
      names[0] === "Home" &&
        names.includes(categoryName) &&
        names.includes(toolName),
      names.join(" > "),
    );
  } else {
    prefixCheck(label, "BreadcrumbList JSON-LD present", false);
  }

  prefixCheck(
    label,
    "Canonical self-referencing, non-www, no trailing slash",
    html.includes(`rel="canonical" href="${canonical}"`) ||
      html.includes(`href="${canonical}" rel="canonical"`),
  );

  prefixCheck(
    label,
    "og:url matches canonical",
    html.includes(`content="${canonical}"`) ||
      html.includes(`property="og:url" content="${canonical}"`),
  );

  prefixCheck(
    label,
    `Twitter title includes keyword`,
    html.includes(keyword) &&
      (html.includes('name="twitter:title"') ||
        html.includes('property="twitter:title"')),
  );

  for (const locale of ["en-US", "en-GB", "en-CA", "en-AU", "x-default"]) {
    prefixCheck(
      label,
      `hreflang ${locale}`,
      html.includes(`hreflang="${locale}"`) ||
        html.includes(`hrefLang="${locale}"`),
    );
  }

  prefixCheck(label, "YMYL byline (Written by)", html.includes("Written by"));
  prefixCheck(label, "YMYL reviewer (Reviewed by)", html.includes("Reviewed by"));
  prefixCheck(label, "Last updated visible", html.includes("Last updated:"));
  prefixCheck(
    label,
    "Link to editorial-policy",
    html.includes('href="/editorial-policy"'),
  );
  prefixCheck(
    label,
    "Link to methodology",
    html.includes('href="/methodology"'),
  );

  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const mainText = mainMatch ? stripHtml(mainMatch[1]) : stripHtml(html);
  const wordCount = countWords(mainText);
  prefixCheck(
    label,
    "Body word count ≥800",
    wordCount >= 800,
    `${wordCount} words`,
  );

  for (const p of internalPaths) {
    const ok = await headOk(p);
    prefixCheck(label, `Internal link resolves: ${p}`, ok);
  }

  const ogRes = await fetch(`${BASE_URL}${path}/opengraph-image`);
  prefixCheck(
    label,
    "OG image returns 200",
    ogRes.ok && (ogRes.headers.get("content-type") ?? "").includes("image"),
    `status ${ogRes.status}, type ${ogRes.headers.get("content-type")}`,
  );
}

async function verifyInfrastructure() {
  console.log("\n--- Infrastructure ---\n");

  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  const robotsText = await robotsRes.text();
  check(
    "robots.txt returns 200",
    robotsRes.ok,
    `status ${robotsRes.status}`,
  );
  check(
    "robots.txt sitemap points to production host",
    robotsText.includes("Sitemap: https://calculatories.com/sitemap.xml"),
  );
  check("robots.txt disallows /studio", robotsText.includes("Disallow: /studio"));
  check("robots.txt disallows /api/", robotsText.includes("Disallow: /api/"));

  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemapText = await sitemapRes.text();
  check(
    "sitemap.xml returns 200",
    sitemapRes.ok,
    `status ${sitemapRes.status}`,
  );
  check(
    "sitemap.xml is XML (not HTML)",
    sitemapText.includes("<sitemapindex") || sitemapText.includes("<urlset"),
    sitemapText.slice(0, 80),
  );
  check(
    "sitemap.xml contains calculatories.com",
    sitemapText.includes("calculatories.com"),
  );
  check(
    "sitemap.xml has no localhost",
    !sitemapText.includes("localhost"),
  );

  const hostChecks = [
    { label: "Home", path: "/" },
    {
      label: "Finance tool",
      path: "/finance/mortgage-calculator",
      canonical: "https://calculatories.com/finance/mortgage-calculator",
    },
    {
      label: "Blog post",
      path: BLOG_PATH,
      canonical: "https://calculatories.com/blog/how-to-calculate-mortgage-payments",
    },
  ];

  for (const { label, path, canonical } of hostChecks) {
    const html = await fetchHtml(path);
    check(
      `[${label}] no localhost in HTML`,
      !html.includes("localhost"),
    );
    if (canonical) {
      check(
        `[${label}] canonical is production host`,
        html.includes(canonical),
      );
      check(
        `[${label}] og:url is production host`,
        html.includes(`content="${canonical}"`),
      );
    }
  }
}

async function verifyBlogPost() {
  console.log("\n--- Blog post ---\n");
  const html = await fetchHtml(BLOG_PATH);

  check("Blog H1 present", /<h1[\s>]/.test(html));
  check("Article byline", html.includes("Written by"));
  check(
    "Article JSON-LD",
    extractJsonLd(html).some((s) => s["@type"] === "Article"),
  );
  check(
    "Person JSON-LD",
    extractJsonLd(html).some((s) => s["@type"] === "Person"),
  );
  check("No AdSense script pre-consent", !html.includes("adsbygoogle.js"));
}

async function main() {
  console.log(`Verifying SEO HTML at ${BASE_URL}\n`);

  try {
    await verifyInfrastructure();

    await verifyToolPage({
      label: "Mortgage",
      path: "/finance/mortgage-calculator",
      canonical: "https://calculatories.com/finance/mortgage-calculator",
      faqs: mortgageFaqs,
      toolName: "Mortgage Calculator",
      keyword: "Mortgage Calculator",
      categoryName: "Finance",
      internalPaths: [
        "/editorial-policy",
        "/methodology",
        "/finance/mortgage-calculator/new-york",
        "/blog/how-to-calculate-mortgage-payments",
      ],
    });

    await verifyToolPage({
      label: "Compound Interest",
      path: "/finance/compound-interest-calculator",
      canonical: "https://calculatories.com/finance/compound-interest-calculator",
      faqs: compoundInterestFaqs,
      toolName: "Compound Interest Calculator",
      keyword: "Compound Interest",
      categoryName: "Finance",
      internalPaths: [
        "/editorial-policy",
        "/methodology",
        "/finance/mortgage-calculator",
        "/finance/loan-repayment-calculator",
        "/blog/how-to-calculate-mortgage-payments",
      ],
    });

    await verifyToolPage({
      label: "Loan Repayment",
      path: "/finance/loan-repayment-calculator",
      canonical: "https://calculatories.com/finance/loan-repayment-calculator",
      faqs: loanRepaymentFaqs,
      toolName: "Loan Repayment Calculator",
      keyword: "Loan Repayment",
      categoryName: "Finance",
      internalPaths: [
        "/editorial-policy",
        "/methodology",
        "/finance/mortgage-calculator",
        "/finance/compound-interest-calculator",
        "/blog/how-to-calculate-mortgage-payments",
      ],
    });

    const healthClusterPaths = [
      "/editorial-policy",
      "/methodology",
      "/health",
      "/health/bmi-calculator",
      "/health/calorie-calculator",
      "/health/bmr-calculator",
    ];

    await verifyToolPage({
      label: "BMI",
      path: "/health/bmi-calculator",
      canonical: "https://calculatories.com/health/bmi-calculator",
      faqs: bmiFaqs,
      toolName: "BMI Calculator",
      keyword: "BMI",
      categoryName: "Health",
      internalPaths: healthClusterPaths,
    });

    await verifyToolPage({
      label: "Calorie",
      path: "/health/calorie-calculator",
      canonical: "https://calculatories.com/health/calorie-calculator",
      faqs: calorieFaqs,
      toolName: "Calorie Calculator",
      keyword: "Calorie",
      categoryName: "Health",
      internalPaths: [
        ...healthClusterPaths,
        "/health/macro-calculator",
      ],
    });

    await verifyToolPage({
      label: "BMR",
      path: "/health/bmr-calculator",
      canonical: "https://calculatories.com/health/bmr-calculator",
      faqs: bmrFaqs,
      toolName: "BMR Calculator",
      keyword: "BMR",
      categoryName: "Health",
      internalPaths: healthClusterPaths,
    });

    await verifyToolPage({
      label: "Body Fat",
      path: "/health/body-fat-calculator",
      canonical: "https://calculatories.com/health/body-fat-calculator",
      faqs: bodyFatFaqs,
      toolName: "Body Fat Calculator",
      keyword: "Body Fat",
      categoryName: "Health",
      internalPaths: healthClusterPaths,
    });

    await verifyToolPage({
      label: "Ideal Weight",
      path: "/health/ideal-weight-calculator",
      canonical: "https://calculatories.com/health/ideal-weight-calculator",
      faqs: idealWeightFaqs,
      toolName: "Ideal Weight Calculator",
      keyword: "Ideal Weight",
      categoryName: "Health",
      internalPaths: healthClusterPaths,
    });

    await verifyToolPage({
      label: "Macro",
      path: "/health/macro-calculator",
      canonical: "https://calculatories.com/health/macro-calculator",
      faqs: macroFaqs,
      toolName: "Macro Calculator",
      keyword: "Macro",
      categoryName: "Health",
      internalPaths: [
        ...healthClusterPaths,
        "/finance/compound-interest-calculator",
      ],
    });

    await verifyBlogPost();
  } catch (err) {
    console.error("\nVerification aborted:", err);
    process.exit(1);
  }

  const failed = results.filter((r) => !r.pass);
  console.log(
    `\n--- Summary: ${results.length - failed.length}/${results.length} passed ---\n`,
  );

  if (failed.length > 0) {
    console.error("Failed checks:");
    for (const f of failed) {
      console.error(`  - ${f.name}${f.detail ? `: ${f.detail}` : ""}`);
    }
    process.exit(1);
  }
}

main();
