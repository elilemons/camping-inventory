# Codebase Structure

## 1) Top-Level Map

| Path | Purpose | Evidence |
|------|---------|----------|
| `apps/web/` | Next.js product web application | `apps/web/package.json`, `apps/web/app`, `apps/web/lib` |
| `apps/payload/` | Next.js application hosting Payload admin routes and API routes | `apps/payload/package.json`, `apps/payload/src/app`, `apps/payload/src/payload.config.ts` |
| `apps/mobile/` | Current Expo and React Native application; planned for removal | `apps/mobile/package.json`, `apps/mobile/App.tsx` |
| `apps/docs/` | Next.js Turborepo starter documentation application | `apps/docs/package.json`, `apps/docs/app/page.tsx` |
| `packages/ui/` | Shared React component package | `packages/ui/package.json`, `packages/ui/src` |
| `packages/payload-config/` | Shared Payload configuration, collections, and generated types | `packages/payload-config/package.json`, `packages/payload-config/src`, `packages/payload-config/payload-types.ts` |
| `packages/typescript-config/` | Shared TypeScript configuration presets | `packages/typescript-config/package.json`, `packages/typescript-config/*.json` |
| `docs/` | Product, backlog, collaboration, and codebase documentation | `docs/product.md`, `docs/backlog.md`, `docs/knowledge-base.md`, `docs/codebase` |
| `.agents/skills/` | Repository-local agent skills and references | `.agents/skills` |

## 2) Entry Points

- Web runtime entry: `apps/web/app/layout.tsx` and `apps/web/app/page.tsx`; selected by the `dev`, `build`, and `start` scripts in `apps/web/package.json`.
- Payload runtime entry: `apps/payload/src/payload.config.ts` and Next.js route files under `apps/payload/src/app/(payload)`; selected by `apps/payload/package.json` scripts.
- Mobile runtime entry: `apps/mobile/index.ts`, which registers `apps/mobile/App.tsx` with Expo.
- Documentation runtime entry: `apps/docs/app/layout.tsx` and `apps/docs/app/page.tsx`.
- Shared package entry points: `packages/ui` exports files through its wildcard export map; `packages/payload-config` exports configuration, generated types, and collection paths.
- Root orchestration entry: root scripts in `package.json` and task definitions in `turbo.json`.

## 3) Module Boundaries

| Boundary | What belongs here | What must not be here |
|----------|-------------------|------------------------|
| `apps/web` | Web routes, web-specific providers, and web API hooks | Payload collection definitions or mobile runtime code |
| `apps/payload` | Payload server integration, admin routes, API routes, and Payload tests | Product interface code intended to be shared with the web or future Capacitor application |
| `apps/mobile` | Current Expo application shell and mobile-specific API hooks | New product architecture; this boundary is scheduled for removal during migration |
| `packages/payload-config` | Payload configuration, collections, database adapter setup, and generated Payload types | Web or mobile presentation components |
| `packages/ui` | Reusable React presentation components | Data fetching, database access, or application-specific business workflows |
| `packages/typescript-config` | Shared compiler configuration | Application runtime logic |

These boundaries describe the current source layout. The target layout is to remove `apps/mobile` and add a likely `services/capacitor` workspace that wraps the shared web application. The exact Capacitor workspace structure remains `[TODO]` until the migration is planned.

## 4) Naming and Organization Rules

- File naming is mixed: route and page files use framework conventions such as `page.tsx`, `layout.tsx`, and `route.ts`; shared component files use lowercase names such as `button.tsx`; Payload collections use PascalCase names such as `Users.ts` and `Page.ts`.
- Application code is organized primarily by application and framework area, with shared packages for reusable configuration and components.
- The Payload application defines `@/*` as an alias to `apps/payload/src/*` and `@payload-config` as an alias to `apps/payload/src/payload.config.ts` in `apps/payload/tsconfig.json`.
- The web application defines `@/*` as an alias to `apps/web/*` in `apps/web/tsconfig.json`.
- `packages/ui` exposes source files through `./*`: `./src/*.tsx` in `packages/ui/package.json`.

## 5) Evidence

- `package.json`
- `turbo.json`
- `apps/web/package.json`
- `apps/payload/package.json`
- `apps/mobile/package.json`
- `apps/mobile/index.ts`
- `packages/ui/package.json`
- `packages/payload-config/package.json`
- `apps/web/tsconfig.json`
- `apps/payload/tsconfig.json`
