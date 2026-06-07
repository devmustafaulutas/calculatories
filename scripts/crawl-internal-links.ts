/**
 * Crawl internal links from built site pages.
 * Usage: pnpm build && pnpm start (in another terminal) && pnpm crawl:links
 * Optional: BASE_URL=http://localhost:3000 pnpm crawl:links
 */

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const SITE_HOST = "calculatories.com";

const SITEMAP_SEGMENTS = [
  "/sitemap/static.xml",
  "/sitemap/categories.xml",
  "/sitemap/tools.xml",
  "/sitemap/blog.xml",
  "/sitemap/programmatic.xml",
];

interface BrokenLink {
  path: string;
  source: string;
  status: number;
}

function extractInternalPaths(html: string): string[] {
  const paths = new Set<string>();

  const hrefRegex = /href=["'](\/[^"'#?]*)["']/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    const path = match[1].replace(/\/$/, "") || "/";
    paths.add(path);
  }

  const canonicalMatch = html.match(
    /rel=["']canonical["'][^>]*href=["']([^"']+)["']/i,
  );
  if (canonicalMatch?.[1]?.includes(SITE_HOST)) {
    try {
      paths.add(new URL(canonicalMatch[1]).pathname);
    } catch {
      // skip malformed canonical
    }
  }

  return [...paths];
}

async function fetchText(path: string): Promise<string> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
  return res.text();
}

async function headStatus(path: string): Promise<number> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { method: "HEAD" });
    return res.status;
  } catch {
    return 0;
  }
}

function parseSitemapLocs(xml: string): string[] {
  const locs: string[] = [];
  const regex = /<loc>([^<]+)<\/loc>/gi;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    try {
      const url = new URL(match[1]);
      if (url.hostname === SITE_HOST) {
        locs.push(url.pathname);
      }
    } catch {
      // skip malformed
    }
  }
  return locs;
}

async function collectSeedPaths(): Promise<string[]> {
  const paths = new Set<string>(["/"]);

  for (const segment of SITEMAP_SEGMENTS) {
    try {
      const xml = await fetchText(segment);
      for (const p of parseSitemapLocs(xml)) {
        paths.add(p);
      }
    } catch (err) {
      console.warn(`Warning: could not fetch ${segment}:`, err);
    }
  }

  return [...paths];
}

async function main() {
  console.log(`Crawling internal links at ${BASE_URL}\n`);

  const seedPaths = await collectSeedPaths();
  console.log(`Seed pages: ${seedPaths.length}`);

  const allLinks = new Map<string, Set<string>>();

  for (const pagePath of seedPaths) {
    try {
      const html = await fetchText(pagePath);
      for (const link of extractInternalPaths(html)) {
        if (!allLinks.has(link)) allLinks.set(link, new Set());
        allLinks.get(link)!.add(pagePath);
      }
    } catch (err) {
      console.error(`FAIL: could not fetch seed page ${pagePath}:`, err);
      process.exit(1);
    }
  }

  const uniqueLinks = [...allLinks.keys()].sort();
  console.log(`Unique internal links found: ${uniqueLinks.length}\n`);

  const broken: BrokenLink[] = [];

  for (const path of uniqueLinks) {
    const status = await headStatus(path);
    const sources = [...(allLinks.get(path) ?? [])].join(", ");
    if (status >= 200 && status < 400) {
      console.log(`[OK] ${path} (${status})`);
    } else {
      console.log(`[BROKEN] ${path} (${status || "network error"}) from: ${sources}`);
      broken.push({ path, source: sources, status });
    }
  }

  console.log(`\n--- Summary: ${uniqueLinks.length - broken.length}/${uniqueLinks.length} links OK ---\n`);

  if (broken.length > 0) {
    console.error("Broken links:");
    for (const b of broken) {
      console.error(`  ${b.path} (${b.status}) ← ${b.source}`);
    }
    process.exit(1);
  }
}

main();

export {};
