# Codebase Concerns

## 1) Top Risks (Prioritized)

| Severity | Concern | Evidence | Impact | Suggested action |
|----------|---------|----------|--------|------------------|
| high | Native platform projects require a reachable deployed Payload API and synchronized static assets | `apps/web/capacitor.config.ts`, `apps/web/lib/api.ts` | Native builds can succeed while runtime requests fail if `NEXT_PUBLIC_API_URL` is not configured for the device | Configure the API URL for each deployment environment before native builds |
| high | Current product interface is still a Turborepo and Payload starter | `apps/web/app/page.tsx`, `apps/docs/app/page.tsx`, `apps/payload/README.md` | Product assumptions may be mistaken for implemented behavior | Treat current code as scaffolding and verify every feature boundary before implementation |
| high | Payload configuration permits public reads for pages and media | `packages/payload-config/src/collections/Page.ts`, `packages/payload-config/src/collections/Media.ts` | Data exposure may exceed the intended product access model | Define access rules before adding real inventory data |
| high | The product requires authenticated offline local data, synchronization, and Auth0-to-Payload identity association, but none of those mechanisms exist | `docs/product.md`, `docs/knowledge-base.md`, current repository tree | Data loss, unauthorized access, or failed synchronization could violate core product invariants | Design authentication, local persistence, sync, identity association, conflict handling, and recovery before implementing inventory workflows |
| medium | No continuous-integration pipeline or deployment configuration was found during the repository scan | `package.json`, `turbo.json`, repository tree | Checks may not run automatically and Vercel deployment assumptions are unverified | Add deployment and continuous-integration configuration when the application is ready |
| medium | Repository-wide validation has pre-existing starter-project failures outside the Capacitor migration | `packages/ui/tsconfig.json`, `apps/docs/app/page.tsx` | `bun run check-types` fails on composite incremental settings, and the root build fails on the docs Button prop type | Fix these baseline starter issues separately from the native migration |

## 2) Technical Debt

| Debt item | Why it exists | Where | Risk if ignored | Suggested fix |
|-----------|-------------|-------|----------------|---------------|
| Starter components and copy remain in shared interface package | Repository began from a Turborepo starter | `packages/ui/src`, `apps/docs/app/page.tsx` | New product code may inherit unsuitable behavior such as the alert in `button.tsx` | Replace or remove starter components as product interface work begins |
| Generated Payload types are committed but product collections are not defined | Payload was installed before the domain model | `packages/payload-config/payload-types.ts`, `packages/payload-config/src/collections` | Types will not represent the camping inventory domain | Generate types after each collection-model change |

## 3) Security Concerns

| Risk | OWASP category (if applicable) | Evidence | Current mitigation | Gap |
|------|--------------------------------|----------|--------------------|-----|
| Public read access for pages and media | A01 Broken Access Control | `packages/payload-config/src/collections/Page.ts`, `packages/payload-config/src/collections/Media.ts` | None beyond Payload's collection access hooks | Inventory access policy is not defined |
| Empty-string fallbacks for database and Payload secret configuration | A05 Security Misconfiguration | `packages/payload-config/src/payload.config.ts` | `.env.example` documents required variables | Startup does not fail immediately when required secrets are absent |

## 4) Performance and Scaling Concerns

| Concern | Evidence | Current symptom | Scaling risk | Suggested improvement |
|---------|----------|-----------------|--------------|----------------------|
| Client-side home-page request in the web application | `apps/web/app/page.tsx`, `apps/web/lib/hooks.ts` | The page is marked `'use client'` and fetches after render | More client loading and network work than necessary if the page can be server-rendered | Reassess data flow when the product page architecture is designed |
| Pages endpoint requests up to 100 records without pagination strategy | `apps/web/lib/api.ts` | `limit=100` is hard-coded | Larger datasets may increase response and rendering cost | Define pagination or query boundaries for inventory workflows |
| No performance testing or instrumentation was found during the repository scan | `package.json`, `turbo.json`, repository tree | No baseline exists | Regressions may be discovered late | Add targeted performance checks after core workflows exist |

## 5) Fragile/High-Churn Areas

| Area | Why fragile | Churn signal | Safe change strategy |
|------|-------------|--------------|----------------------|
| `packages/payload-config/src/payload.config.ts` | Central configuration controls collections, database, editor, media processing, and CORS | High-churn file in scan output | Make focused changes and run Payload integration and end-to-end tests |
| `packages/payload-config/payload-types.ts` | Generated file changes with collection definitions | High-churn file in scan output | Regenerate through the declared Payload command; do not hand-edit generated types |
| `apps/payload/tests/e2e` | Tests depend on local server, database, and seeded users | Both end-to-end files appear in high-churn output | Preserve setup and cleanup behavior when changing collections |

## 6) Evidence

- `package.json`
- `turbo.json`
- `apps/web/capacitor.config.ts`
- `apps/web/app/page.tsx`
- `apps/web/lib/api.ts`
- `packages/payload-config/src/payload.config.ts`
- `packages/payload-config/src/collections/Page.ts`
- `packages/payload-config/src/collections/Media.ts`
- `apps/payload/package.json`
- `apps/payload/tests/e2e`
- `docs/knowledge-base.md`
