# Tool Authoring Spec

Contract for adding a new calculator to Calculatories.com. Follow this spec end-to-end before marking any tool `status: "live"` in the registry.

## 1. Registry entry (`data/tools.ts`)

Every tool requires a Zod-validated entry. See `data/schemas/tool.ts`.

| Field | Required | Notes |
|-------|----------|-------|
| `slug` | yes | URL segment, kebab-case, e.g. `mortgage-calculator` |
| `category` | yes | Category id: `finance`, `health`, `salary`, `tools`, `legal`, `productivity` |
| `name` | yes | Display name |
| `h1` | yes | Page H1 (one per page) |
| `shortDescription` | yes | ~1 line for cards/meta |
| `longDescription` | yes | 1–2 sentences above content fold |
| `primaryKeyword` | yes | Target keyword, e.g. `mortgage calculator` |
| `lsiKeywords` | yes | Array of related terms |
| `relatedToolSlugs` | yes | Sibling tool slugs (can be draft) |
| `schemaType` | yes | `WebApplication` or `SoftwareApplication` |
| `unitSystem` | yes | `imperial`, `metric`, `both`, or `none` |
| `status` | yes | `draft` until QA gate passes; then `live` |
| `publishedAt` | yes | ISO date |
| `updatedAt` | yes | ISO date; drives sitemap lastmod + "Last updated" |
| `authorId` | yes | Writer id from `data/authors.ts` |
| `reviewedBy` | yes | Reviewer id (required for YMYL) |
| `isYMYL` | yes | `true` for finance, health, legal |
| `icon` | yes | Lucide icon name |
| `programmatic` | optional | `true` if location variants exist in `data/locations.ts` |
| `featured` | optional | Homepage/category prominence |

## 2. Files to create

```
content/tools/<slug>.tsx     # Server content + exported FAQs
components/tools/<slug>.tsx  # 'use client' calculator widget
lib/<domain>.ts              # Pure math helpers + unit tests
lib/<domain>.test.ts         # Vitest (≥5 cases, edge cases)
```

### Registration (3 maps)

1. [`lib/tool-components.ts`](../lib/tool-components.ts) — slug → component
2. [`components/tools/ToolRenderer.tsx`](../components/tools/ToolRenderer.tsx) — `switch (slug)` case
3. [`lib/tool-content.ts`](../lib/tool-content.ts) — slug → `{ Content, faqs }`

Optional: add blog cross-link in [`lib/contextual-links.ts`](../lib/contextual-links.ts) `TOOL_BLOG_LINKS`.

Routes are automatic via `app/[category]/[slug]/page.tsx` once `status: "live"`.

## 3. Content structure (`content/tools/<slug>.tsx`)

Server Component. **≥800 words** total. US English. Sections in order:

| Section | Word target | Rules |
|---------|-------------|-------|
| What is X? | 100–150 | Primary keyword in first sentence |
| How to Use This Calculator | steps | Numbered list |
| How to Calculate X Manually | 400–600 | Formula + worked example with real numbers |
| X Formula | — | Formatted formula block |
| FAQ | ≥5 Q&A | Export as `export const <slug>Faqs: FAQItem[]` |
| Related Calculators | ≥3 links | Use `<RelatedTools currentSlug="..." />` |

### FAQ rules

- Export FAQ array from content file; import in `lib/tool-content.ts`
- FAQ answers in content DOM must **match** `FAQPage` JSON-LD word-for-word
- Use native `<details>`/`<summary>` (server-rendered), not client-only accordion
- Answers must be in HTML source, not lazy-loaded on click

### YMYL (finance, health, legal)

- Link to `/editorial-policy` and `/methodology` in body copy
- Author + reviewer assigned in registry; `ToolPageShell` renders byline automatically
- Cite authoritative sources with `<Citation label="..." url="..." />`

### Keyword placement

- Primary keyword in H1, first paragraph, and ≥3 H2 headings
- No keyword stuffing

## 4. Calculator component (`components/tools/<slug>.tsx`)

- First line: `'use client'`
- Instant calculation on input change (no submit button)
- Explicit `interface` for props; typed state; **no `any`**
- Validate inputs; show placeholder until valid — **never render NaN/Infinity**
- `Intl.NumberFormat` for money/numbers
- Copy-to-clipboard on primary result with `aria-label`
- `aria-live="polite"` on results region
- Breakdown table when it aids understanding (amortization, macro split, etc.)
- Unit toggle when `unitSystem` is `metric`, `imperial`, or `both`

## 5. Math helpers (`lib/<domain>.ts`)

- Pure functions only (no React)
- `Number.isFinite()` validation; return `null` for invalid input
- Document edge cases (0% rate, zero principal, etc.)
- Cent rounding via `roundToCents()` where currency is involved
- Full-schedule test for amortization tools (balance → $0 at term)

### Out of scope (document, do not implement unless specified)

- Biweekly payments
- Extra principal payments
- PMI/escrow/tax estimates (unless tool explicitly covers them)

## 6. Unit tests (`lib/<domain>.test.ts`)

- Framework: **Vitest**
- Minimum **5 test cases** including edge cases
- Tests run on every build: `pnpm build` = `vitest run && next build`
- Reference values cross-checked against Bankrate, IRS, or manual formula

## 7. SEO (automatic via templates)

[`app/[category]/[slug]/page.tsx`](../app/[category]/[slug]/page.tsx) handles:

- `generateMetadata()` → `buildMetadata()` (canonical, OG, Twitter, hreflang)
- JSON-LD: `BreadcrumbList` (Home → Category → Tool), `SoftwareApplication`, `FAQPage`
- Dynamic OG image at `/<category>/<slug>/opengraph-image`

Do **not** hand-write metadata in page files.

### Canonical rules

- Self-referencing: `https://calculatories.com/<category>/<slug>` (no www, no trailing slash)
- Programmatic location pages: self-canonical to themselves

## 8. Internal links

- ≥3 contextual internal links per page
- `RelatedTools` uses registry + fallback chain: live siblings → location variants → blog posts → category hub
- All links must resolve (HTTP 200) before going live

## 9. Per-tool QA gate

Run before setting `status: "live"`.

### Part A — Correctness

- [ ] Math verified against trusted reference
- [ ] Edge cases handled (0% rate, invalid input, empty fields)
- [ ] `lib/<domain>.test.ts` has ≥5 cases, all pass
- [ ] UI never shows NaN, Infinity, or `$NaN`
- [ ] `pnpm test` passes
- [ ] `pnpm build` passes

### Part B — Rendered HTML & SEO

Run `pnpm build && pnpm start`, then `pnpm verify:seo`.

- [ ] FAQ answers in server HTML match FAQPage JSON-LD verbatim
- [ ] Exactly one H1
- [ ] Primary keyword in H1, first paragraph, ≥3 H2s
- [ ] Body ≥800 words
- [ ] Canonical correct (non-www, no trailing slash)
- [ ] Per-page OG and Twitter (not homepage defaults)
- [ ] hreflang: en-US, en-GB, en-CA, en-AU, x-default
- [ ] BreadcrumbList: Home → Category → Tool
- [ ] OG image returns 200
- [ ] ≥3 internal links resolve
- [ ] YMYL: byline, reviewer, last updated, editorial-policy + methodology links

### Part C — Performance & accessibility

- [ ] Lighthouse SEO ≥ 100
- [ ] Lighthouse Accessibility ≥ 95
- [ ] CLS < 0.1
- [ ] LCP < 2.5s
- [ ] Ad slots reserve fixed height; no ads pre-consent
- [ ] All inputs have labels; results region has `aria-live`

### Part D — Registry

- [ ] Entry in `data/tools.ts` complete and Zod-valid
- [ ] Registered in `tool-components.ts`, `ToolRenderer.tsx`, `tool-content.ts`
- [ ] Sitemap includes URL with correct `updatedAt`

## 10. Reference implementation

See the mortgage calculator as the canonical example:

- Math: [`lib/mortgage.ts`](../lib/mortgage.ts) + [`lib/mortgage.test.ts`](../lib/mortgage.test.ts)
- Widget: [`components/tools/mortgage-calculator.tsx`](../components/tools/mortgage-calculator.tsx)
- Content: [`content/tools/mortgage-calculator.tsx`](../content/tools/mortgage-calculator.tsx)
- Blog cross-link: [`content/blog/how-to-calculate-mortgage-payments.mdx`](../content/blog/how-to-calculate-mortgage-payments.mdx)
