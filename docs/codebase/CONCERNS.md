# Codebase Concerns

## 1) Top Risks (Prioritized)

| Severity | Concern | Evidence | Impact | Suggested action |
|----------|---------|----------|--------|------------------|
| high | Intended Capacitor architecture is absent and the current mobile application depends on Expo and React Native | `apps/mobile/package.json`, `apps/mobile/App.tsx`, `docs/knowledge-base.md` | Future product work may be built on a runtime scheduled for removal | Remove `apps/mobile` and add the planned `services/capacitor` wrapper in a dedicated architecture change |
| high | Current product interface is still a Turborepo and Payload starter | `apps/web/app/page.tsx`, `apps/docs/app/page.tsx`, `apps/payload/README.md` | Product assumptions may be mistaken for implemented behavior | Treat current code as scaffolding and verify every feature boundary before implementation |
| high | Mobile API access uses a hard-coded private network address | `apps/mobile/lib/api.ts` | The application is environment-specific and cannot reliably run on another device or environment | Replace with environment-specific configuration during the mobile migration |
| high | Payload configuration permits public reads for pages and media | `packages/payload-config/src/collections/Page.ts`, `packages/payload-config/src/collections/Media.ts` | Data exposure may exceed the intended product access model | Define access rules before adding real inventory data |
| high | The product requires authenticated offline local data, synchronization, and Auth0-to-Payload identity association, but none of those mechanisms exist | `docs/product.md`, `docs/knowledge-base.md`, current repository tree | Data loss, unauthorized access, or failed synchronization could violate core product invariants | Design authentication, local persistence, sync, identity association, conflict handling, and recovery before implementing inventory workflows |
| medium | No continuous-integration pipeline or deployment configuration was found during the repository scan | `package.json`, `turbo.json`, repository tree | Checks may not run automatically and Vercel deployment assumptions are unverified | Add deployment and continuous-integration configuration when the application is ready |

## 2) Technical Debt

| Debt item | Why it exists | Where | Risk if ignored | Suggested fix |
|-----------|-------------|-------|----------------|---------------|
| Duplicate web and mobile API and query-hook implementations | The current applications were scaffolded independently | `apps/web/lib`, `apps/mobile/lib` | Behavior can diverge between clients | Decide whether a shared client package belongs in the target architecture |
| Starter components and copy remain in shared interface package | Repository began from a Turborepo starter | `packages/ui/src`, `apps/docs/app/page.tsx` | New product code may inherit unsuitable behavior such as the alert in `button.tsx` | Replace or remove starter components as product interface work begins |
| Generated Payload types are committed but product collections are not defined | Payload was installed before the domain model | `packages/payload-config/payload-types.ts`, `packages/payload-config/src/collections` | Types will not represent the camping inventory domain | Generate types after each collection-model change |

## 3) Security Concerns

| Risk | OWASP category (if applicable) | Evidence | Current mitigation | Gap |
|------|--------------------------------|----------|--------------------|-----|
| Public read access for pages and media | A01 Broken Access Control | `packages/payload-config/src/collections/Page.ts`, `packages/payload-config/src/collections/Media.ts` | None beyond Payload's collection access hooks | Inventory access policy is not defined |
| Empty-string fallbacks for database and Payload secret configuration | A05 Security Misconfiguration | `packages/payload-config/src/payload.config.ts` | `.env.example` documents required variables | Startup does not fail immediately when required secrets are absent |
| Hard-coded local API address | A05 Security Misconfiguration | `apps/mobile/lib/api.ts` | None | Runtime configuration is not portable and may expose development assumptions |

## 4) Performance and Scaling Concerns

| Concern | Evidence | Current symptom | Scaling risk | Suggested improvement |
|---------|----------|-----------------|--------------|----------------------|
| Client-side home-page request in the web application | `apps/web/app/page.tsx`, `apps/web/lib/hooks.ts` | The page is marked `'use client'` and fetches after render | More client loading and network work than necessary if the page can be server-rendered | Reassess data flow when the product page architecture is designed |
| Pages endpoint requests up to 100 records without pagination strategy | `apps/web/lib/api.ts`, `apps/mobile/lib/api.ts` | `limit=100` is hard-coded | Larger datasets may increase response and rendering cost | Define pagination or query boundaries for inventory workflows |
| No performance testing or instrumentation was found during the repository scan | `package.json`, `turbo.json`, repository tree | No baseline exists | Regressions may be discovered late | Add targeted performance checks after core workflows exist |

## 5) Fragile/High-Churn Areas

| Area | Why fragile | Churn signal | Safe change strategy |
|------|-------------|--------------|----------------------|
| `packages/payload-config/src/payload.config.ts` | Central configuration controls collections, database, editor, media processing, and CORS | High-churn file in scan output | Make focused changes and run Payload integration and end-to-end tests |
| `packages/payload-config/payload-types.ts` | Generated file changes with collection definitions | High-churn file in scan output | Regenerate through the declared Payload command; do not hand-edit generated types |
| `apps/payload/tests/e2e` | Tests depend on local server, database, and seeded users | Both end-to-end files appear in high-churn output | Preserve setup and cleanup behavior when changing collections |
| `apps/mobile` | Planned runtime replacement and duplicated API layer | Multiple mobile files appear in high-churn output | Treat migration as an isolated architectural change |

## 6) `[ASK USER]` Questions

1. [ASK USER] What exact workspace name and native platform directory layout should `services/capacitor` use?
2. [ASK USER] How should the web build output be synchronized into the Capacitor native projects?

## 7) Evidence

- `package.json`
- `turbo.json`
- `apps/mobile/package.json`
- `apps/mobile/lib/api.ts`
- `apps/web/app/page.tsx`
- `apps/web/lib/api.ts`
- `packages/payload-config/src/payload.config.ts`
- `packages/payload-config/src/collections/Page.ts`
- `packages/payload-config/src/collections/Media.ts`
- `apps/payload/package.json`
- `apps/payload/tests/e2e`
- `docs/knowledge-base.md`
