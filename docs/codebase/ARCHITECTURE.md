# Architecture

## 1) Architectural Style

- Primary style: multi-application monorepo with framework-driven application boundaries and shared packages.
- Why this classification: `apps/web`, `apps/payload`, `apps/mobile`, and `apps/docs` have separate manifests and entry points, while `packages/ui` and `packages/payload-config` are shared workspace packages.
- Current constraints: Payload owns the configured data model; the web and mobile applications communicate with Payload over HTTP; Turborepo coordinates workspace tasks.
- Intended constraints: Capacitor should wrap the shared web application for mobile app-store distribution; the current Expo and React Native application should be removed; server-side rendering should be used where appropriate; the intended data store is MongoDB. These intentions are not yet implemented everywhere.
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

The current mobile flow is structurally similar: `apps/mobile/App.tsx` calls the mobile hook and `apps/mobile/lib/api.ts` sends requests to a hard-coded development address. The target mobile flow should instead build the web application and have `services/capacitor` package that web output for native platforms.

## 3) Layer/Module Responsibilities

| Layer or module | Owns | Must not own | Evidence |
|-----------------|------|--------------|----------|
| `apps/web/app` | Web route and page rendering | Direct database access | `apps/web/app/page.tsx`, `apps/web/app/layout.tsx` |
| `apps/web/lib` | Web API wrappers, query hooks, and query-provider setup | Payload collection definitions | `apps/web/lib/api.ts`, `apps/web/lib/hooks.ts`, `apps/web/lib/providers.tsx` |
| `apps/payload/src/app/(payload)/api` | HTTP-to-Payload route adaptation | Product-specific client hooks | `apps/payload/src/app/(payload)/api/[...slug]/route.ts` |
| `packages/payload-config/src` | Payload configuration, collections, database adapter, and access settings | Interface rendering | `packages/payload-config/src/payload.config.ts`, `packages/payload-config/src/collections/*.ts` |
| `packages/ui/src` | Reusable React presentation components | API calls and persistence | `packages/ui/src/*.tsx` |
| `apps/mobile` | Current Expo and React Native application shell and client requests; scheduled for removal | Shared web route rendering | `apps/mobile/App.tsx`, `apps/mobile/lib/api.ts` |
| `services/capacitor` | `[TODO]` Capacitor project configuration, native platform projects, and native plugins around the web application | Product domain logic or a second interface implementation | `[TODO]` Target workspace does not yet exist |

## 4) Reused Patterns

| Pattern | Where found | Why it exists |
|---------|-------------|---------------|
| Shared workspace package | `packages/ui`, `packages/payload-config` | Allows multiple applications to consume common components or Payload setup | `package.json`, package manifests |
| TanStack Query provider and hooks | `apps/web/lib/providers.tsx`, `apps/web/lib/hooks.ts`, `apps/mobile/lib/providers.tsx`, `apps/mobile/lib/hooks.ts` | Provides client-side request caching and query state | Those files |
| Configuration factory | `packages/payload-config/src/payload.config.ts` | Exposes a base Payload configuration and an override-capable `configurePayload` function | `packages/payload-config/src/payload.config.ts` |
| Generated framework routes | `apps/payload/src/app/(payload)` | Connects Payload to Next.js admin and API route conventions | Generated route and layout files |

## 5) Known Architectural Risks

- The intended Capacitor architecture is not present; the current mobile boundary is Expo and React Native.
- The web application is a client-rendered starter page using TanStack Query, while the project direction calls for server-side rendering where appropriate.
- Product domain logic and inventory collections are not present in the current Payload configuration; only users, media, and pages are configured.
- Offline storage, synchronization queues, Auth0 integration, and conflict resolution are product requirements but are not implemented.
- Web and mobile duplicate API wrappers and query hooks instead of consuming a shared client package.
- `[TODO]` The exact build and synchronization commands between the web application and `services/capacitor` have not been decided.

## 6) Evidence

- `apps/web/app/page.tsx`
- `apps/web/lib/api.ts`
- `apps/web/lib/hooks.ts`
- `apps/payload/src/app/(payload)/api/[...slug]/route.ts`
- `apps/payload/src/payload.config.ts`
- `packages/payload-config/src/payload.config.ts`
- `apps/mobile/App.tsx`
- `docs/knowledge-base.md`
