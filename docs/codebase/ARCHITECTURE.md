# Architecture

## 1) Architectural Style

- Primary style: multi-application monorepo with framework-driven application boundaries and shared packages.
- Why this classification: `apps/web`, `apps/payload`, and `apps/docs` have separate manifests and entry points, while `packages/ui` and `packages/payload-config` are shared workspace packages.
- Current constraints: Payload owns the configured data model; the web application and its Capacitor shell communicate with Payload over HTTP; Turborepo coordinates workspace tasks.
- Intended constraints: Capacitor wraps the shared web application for mobile app-store distribution; server-side rendering should be used where appropriate; the intended data store is MongoDB.
- Product constraint: meaningful data belongs to authenticated users. After authentication, local cached account data must support offline packing workflows and queued synchronization into Payload.

## 2) System Flow

```text
web page -> TanStack Query hook -> fetch wrapper -> Payload REST route -> Payload configuration -> MongoDB
```

1. `apps/web/app/page.tsx` renders the home page as a client component and calls `useHomePage`.
2. `apps/web/lib/hooks.ts` creates a TanStack Query request using `fetchHomePage`.
3. `apps/web/lib/api.ts` sends a request to the configured or default Payload API URL.
4. `apps/payload/src/app/(payload)/api/[...slug]/route.ts` maps HTTP methods to Payload REST handlers.
5. `apps/payload/src/payload.config.ts` loads the shared configuration from `packages/payload-config`.
6. `packages/payload-config/src/payload.config.ts` configures collections and the MongoDB adapter.

The mobile flow builds `apps/web` as a static export and synchronizes its `out` directory into the Capacitor iOS and Android projects under `apps/web`.

## 3) Layer/Module Responsibilities

| Layer or module | Owns | Must not own | Evidence |
|-----------------|------|--------------|----------|
| `apps/web/app` | Web route and page rendering | Direct database access | `apps/web/app/page.tsx`, `apps/web/app/layout.tsx` |
| `apps/web/lib` | Web API wrappers, query hooks, and query-provider setup | Payload collection definitions | `apps/web/lib/api.ts`, `apps/web/lib/hooks.ts`, `apps/web/lib/providers.tsx` |
| `apps/payload/src/app/(payload)/api` | HTTP-to-Payload route adaptation | Product-specific client hooks | `apps/payload/src/app/(payload)/api/[...slug]/route.ts` |
| `packages/payload-config/src` | Payload configuration, collections, database adapter, and access settings | Interface rendering | `packages/payload-config/src/payload.config.ts`, `packages/payload-config/src/collections/*.ts` |
| `packages/ui/src` | Reusable React presentation components | API calls and persistence | `packages/ui/src/*.tsx` |
| `apps/web` Capacitor files | Capacitor configuration, static web assets, and native platform projects around the shared web application | Product domain logic or a second interface implementation | `apps/web/capacitor.config.ts`, `apps/web/ios`, `apps/web/android` |

## 4) Reused Patterns

| Pattern | Where found | Why it exists |
|---------|-------------|---------------|
| Shared workspace package | `packages/ui`, `packages/payload-config` | Allows multiple applications to consume common components or Payload setup | `package.json`, package manifests |
| TanStack Query provider and hooks | `apps/web/lib/providers.tsx`, `apps/web/lib/hooks.ts` | Provides client-side request caching and query state | Those files |
| Configuration factory | `packages/payload-config/src/payload.config.ts` | Exposes a base Payload configuration and an override-capable `configurePayload` function | `packages/payload-config/src/payload.config.ts` |
| Generated framework routes | `apps/payload/src/app/(payload)` | Connects Payload to Next.js admin and API route conventions | Generated route and layout files |

## 5) Known Architectural Risks

- Native platform projects are generated artifacts that must be kept synchronized with the `apps/web` static build.
- The web application is a client-rendered starter page using TanStack Query, while the project direction calls for server-side rendering where appropriate.
- Product domain logic and inventory collections are not present in the current Payload configuration; only users, media, and pages are configured.
- Offline storage, synchronization queues, Auth0 integration, and conflict resolution are product requirements but are not implemented.
- The web application currently fetches Payload data client-side; the native shell relies on the same runtime configuration.

## 6) Evidence

- `apps/web/app/page.tsx`
- `apps/web/lib/api.ts`
- `apps/web/lib/hooks.ts`
- `apps/payload/src/app/(payload)/api/[...slug]/route.ts`
- `apps/payload/src/payload.config.ts`
- `packages/payload-config/src/payload.config.ts`
- `apps/web/capacitor.config.ts`
- `docs/knowledge-base.md`
