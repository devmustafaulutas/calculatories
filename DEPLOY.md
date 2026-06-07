# Calculatories — Production Deploy Runbook

First-deploy guide for [calculatories.com](https://calculatories.com) on Vercel with Sanity CMS.

## Prerequisites

- Vercel project linked to this repository
- Domain `calculatories.com` configured on Vercel (apex + www)
- `vercel.json` sends `www.calculatories.com` → `https://calculatories.com` (301)
- `next.config.mjs` redirects HTTP → HTTPS via `x-forwarded-proto`

## Environment variables

Set all production values in **Vercel → Project → Settings → Environment Variables** (Production scope).

| Variable | Required | Where used | Notes |
|----------|----------|------------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | **Yes** (production) | Sanity client, Studio, blog SSG | Without this, build uses CMS fallback (1 hardcoded blog post) |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity API | Default: `production` |
| `SANITY_API_READ_TOKEN` | **Yes** (when project ID set) | `fetchSanity`, draft preview, blog SSG | Build fails at SSG if project ID is set but token is missing |
| `SANITY_API_WRITE_TOKEN` | Seed only | `pnpm seed:sanity` | Not needed for runtime or build |
| `SANITY_REVALIDATE_SECRET` | **Yes** (production) | `/api/draft-mode/enable`, `/api/revalidate` | Shared secret for preview + webhook |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Studio preview origin | Set to `https://calculatories.com` |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Optional | `lib/ads-config.ts` | Omit or leave placeholder to disable ads |
| `NEXT_PUBLIC_ADSENSE_SLOT_HEADER` | Optional | Header ad slot | Placeholder `0000000000` if unset |
| `NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT` | Optional | In-content ad slot | Placeholder `0000000001` if unset |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | Optional | Sidebar ad slot | Placeholder `0000000002` if unset |

Canonical SEO host is hardcoded in `lib/site-config.ts` as `https://calculatories.com` (non-www, no trailing slash). It does not depend on env vars.

## Build modes

### A — Sanity live (production default)

```bash
# All Sanity vars set on Vercel
pnpm build
```

- Blog pages, authors, and site settings fetched from Sanity during SSG
- `SANITY_API_READ_TOKEN` required for successful build
- `SANITY_REVALIDATE_SECRET` not required for build (runtime only)

### B — CMS fallback (emergency / CI without secrets)

```bash
env -u NEXT_PUBLIC_SANITY_PROJECT_ID pnpm build
```

- `isCmsFallbackEnabled()` returns true
- 1 migrated blog post, 3 hardcoded authors, default site settings
- Studio renders but Sanity client is `null`
- Use only when Sanity is unreachable or for offline builds

## Sanity project setup

### 1. Create project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a project
2. Create dataset `production`
3. Copy **Project ID** → `NEXT_PUBLIC_SANITY_PROJECT_ID`

### 2. CORS origins

In Sanity project → API → CORS origins, add:

- `https://calculatories.com`
- `https://www.calculatories.com`
- `http://localhost:3000` (local dev)

### 3. API tokens

In Sanity project → API → Tokens:

| Token | Permissions | Env var |
|-------|-------------|---------|
| Read token | Viewer (or read-only) | `SANITY_API_READ_TOKEN` |
| Write token | Editor | `SANITY_API_WRITE_TOKEN` (seed only) |

### 4. Seed content

```bash
# Requires SANITY_API_WRITE_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
pnpm seed:sanity
```

Seeds blog post, authors, categories, tags, and site settings from local fallback data.

### 5. Studio

- Embedded at `/studio` (Sanity `basePath`)
- `robots: noindex` in page metadata
- `Disallow: /studio` in `robots.txt`
- Not included in sitemap

## Preview and draft mode

Sanity Presentation tool is configured in `sanity/sanity.config.ts`:

- **Enable preview:** `GET /api/draft-mode/enable?secret={SANITY_REVALIDATE_SECRET}&slug={path}`
- **Disable preview:** `GET /api/draft-mode/disable` → redirects to `https://calculatories.com/`

Set `NEXT_PUBLIC_SITE_URL=https://calculatories.com` so Studio preview points at production.

## Webhook (on-publish revalidation)

In Sanity project → API → Webhooks:

| Field | Value |
|-------|-------|
| URL | `https://calculatories.com/api/revalidate` |
| Dataset | `production` |
| Trigger | Create, Update, Delete |
| Secret | Same value as `SANITY_REVALIDATE_SECRET` |
| Filter | `_type in ["post", "author", "blogCategory", "tag", "siteSettings"]` |

Invalidates Next.js cache tags:

- `post`, `post:{slug}`, `blog:index`
- `author`, `author:{slug}`
- `blogCategory`, `tag`
- `siteSettings`

## Deploy to Vercel

1. Push to `main` (or trigger manual deploy)
2. Confirm build logs show SSG for finance tools and blog post
3. Run post-deploy checks (see below)

## Post-deploy checks

```bash
# Against production (or local prod build)
BASE_URL=https://calculatories.com pnpm verify:seo
BASE_URL=https://calculatories.com pnpm verify:og
BASE_URL=https://calculatories.com pnpm crawl:links
```

Local regression guard:

```bash
pnpm build && pnpm start   # separate terminal
pnpm verify:seo
pnpm verify:og
pnpm crawl:links
pnpm lhci                  # LCP may exceed 2.5s locally; use Vercel Speed Insights for real CWV
```

### Manual spot-checks

- [ ] `https://calculatories.com/sitemap.xml` returns XML index (not HTML)
- [ ] `https://calculatories.com/robots.txt` lists sitemap + disallows `/studio`, `/api/`
- [ ] Finance tool canonicals use `https://calculatories.com/...` (no www, no trailing slash)
- [ ] OG images return `200` with `image/png` at `/finance/mortgage-calculator/opengraph-image`

## Google Search Console

1. Add property: `https://calculatories.com` (domain or URL prefix)
2. Verify via DNS TXT record (Vercel domain settings) or HTML file
3. Submit sitemap: `https://calculatories.com/sitemap.xml`
4. Request indexing for key URLs:
   - `/finance/mortgage-calculator`
   - `/finance/compound-interest-calculator`
   - `/finance/loan-repayment-calculator`
   - `/blog/how-to-calculate-mortgage-payments`

## Rollback procedure

### Instant rollback (Vercel)

1. Vercel → Deployments → select previous successful deployment
2. Click **Promote to Production** (instant, no rebuild)

### Content rollback

- Sanity content is unaffected by Vercel rollback
- To hide a tool without redeploying code: set `status: "draft"` in `data/tools.ts`, commit, redeploy

### Emergency CMS fallback

If Sanity is down and you need a deploy:

1. Temporarily unset `NEXT_PUBLIC_SANITY_PROJECT_ID` on Vercel
2. Redeploy — build uses hardcoded fallback content
3. Restore Sanity vars once service recovers

## Security headers

Set in `next.config.mjs` for all routes:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

No CSP (would break AdSense and Sanity Studio embeds).

## Core Web Vitals

- **Local LHCI** (`pnpm lhci`): regression guard; LCP often exceeds 2.5s on localhost
- **Production CWV**: monitor via Vercel Speed Insights and Google Search Console → Experience
- Budgets in `lighthouserc.cjs`: SEO 100, A11y ≥ 95, CLS < 0.1, LCP < 2.5s (warn locally)
