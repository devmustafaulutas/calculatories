/**
 * Verify all opengraph-image routes return 200 with image content-type.
 * Usage: pnpm build && pnpm start (in another terminal) && pnpm verify:og
 * Optional: BASE_URL=http://localhost:3000 pnpm verify:og
 */

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const OG_PATHS = [
  "/opengraph-image",
  "/finance/opengraph-image",
  "/finance/mortgage-calculator/opengraph-image",
  "/finance/compound-interest-calculator/opengraph-image",
  "/finance/loan-repayment-calculator/opengraph-image",
  "/finance/mortgage-calculator/new-york/opengraph-image",
  "/finance/mortgage-calculator/california/opengraph-image",
  "/health/bmi-calculator/opengraph-image",
  "/health/calorie-calculator/opengraph-image",
  "/blog/how-to-calculate-mortgage-payments/opengraph-image",
];

interface CheckResult {
  path: string;
  pass: boolean;
  detail: string;
}

async function verifyOgPath(path: string): Promise<CheckResult> {
  try {
    const res = await fetch(`${BASE_URL}${path}`);
    const contentType = res.headers.get("content-type") ?? "";
    const pass = res.ok && contentType.includes("image");
    return {
      path,
      pass,
      detail: `status ${res.status}, type ${contentType}`,
    };
  } catch (err) {
    return {
      path,
      pass: false,
      detail: err instanceof Error ? err.message : "fetch failed",
    };
  }
}

async function main() {
  console.log(`Verifying OG images at ${BASE_URL}\n`);

  const results = await Promise.all(OG_PATHS.map(verifyOgPath));

  for (const r of results) {
    const icon = r.pass ? "PASS" : "FAIL";
    console.log(`[${icon}] ${r.path} — ${r.detail}`);
  }

  const failed = results.filter((r) => !r.pass);
  console.log(
    `\n--- Summary: ${results.length - failed.length}/${results.length} passed ---\n`,
  );

  if (failed.length > 0) process.exit(1);
}

main();

export {};
