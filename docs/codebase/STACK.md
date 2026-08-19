# Technology Stack

## 1) Runtime Summary

| Area | Value | Evidence |
|------|-------|----------|
| Primary language | TypeScript and TypeScript with React | `package.json`, `apps/*/src`, `apps/*/app`, `packages/*/src` |
| Runtime + version | Node.js `>=18`; Bun `1.3.14` is the declared package-manager version | `package.json` |
| Package manager | Bun is the repository instruction; the lockfile is `bun.lock` | `package.json`, `bun.lock`, `AGENTS.md` |
| Module/build system | ECMAScript modules, TypeScript bundler resolution, and Turborepo tasks | `package.json`, `tsconfig.json`, `turbo.json` |

## 2) Production Frameworks and Dependencies

| Dependency | Version | Role in system | Evidence |
|------------|---------|----------------|----------|
| Next.js | `16.2.6` | Web and Payload application framework | `package.json` catalog, `apps/web/package.json`, `apps/payload/package.json` |
| React | `19.2.6` catalog | User-interface runtime | `package.json`, `apps/web/package.json` |
| Payload | `3.85.1` | Content management system, REST and GraphQL API, admin application | `package.json`, `apps/payload/package.json`, `apps/payload/src/app/(payload)/api` |
| Payload MongoDB adapter | `3.85.1` | MongoDB data access for Payload | `package.json`, `packages/payload-config/package.json`, `packages/payload-config/src/payload.config.ts` |
| TanStack Query (`@tanstack/react-query`) | `^5.62.11` catalog | Client-side query and cache layer in the shared web application | `package.json`, `apps/web/package.json`, `apps/web/lib/hooks.ts` |
| Capacitor | `8.5.0` | Packages the static web export for iOS and Android | `apps/web/package.json`, `apps/web/capacitor.config.ts` |
| Sharp | `0.34.2` catalog; root declares `^0.35.2` | Image processing used by Payload | `package.json`, `packages/payload-config/src/payload.config.ts` |

The intended Capacitor, Tailwind CSS, and neobrutalism.com component-library direction is recorded in `docs/knowledge-base.md`, but those dependencies are not present in the current manifests.

## 3) Development Toolchain

| Tool | Purpose | Evidence |
|------|---------|----------|
| Turborepo | Monorepo task orchestration | `turbo.json`, `package.json` |
| TypeScript `5.9.2` | Type checking and compilation support | `package.json` catalog |
| Biome `2.5.1` | Formatting and linting | `biome.json`, root `package.json` |
| Vitest `4.0.18` | Integration-style tests in the Payload application | `apps/payload/package.json`, `apps/payload/vitest.config.mts` |
| Playwright `1.58.2` | Browser end-to-end tests in the Payload application | `apps/payload/package.json`, `apps/payload/playwright.config.ts` |

## 4) Key Commands

```bash
bun install
bun run build
bun run check-types
bun run lint
bun run format-and-lint
bun run --filter payload test
```

The Payload package scripts and local container commands now use Bun, matching the repository instruction.

## 5) Environment and Config

- Config sources: `package.json`, `tsconfig.json`, `turbo.json`, `biome.json`, workspace package manifests, `apps/payload/.env.example`.
- Required Payload environment variables: `DATABASE_URL` and `PAYLOAD_SECRET`, according to `apps/payload/.env.example` and `packages/payload-config/src/payload.config.ts`.
- Web API environment variable: `NEXT_PUBLIC_API_URL` is optional and falls back to `http://localhost:3000/api` in `apps/web/lib/api.ts`.
- Capacitor API URL: uses the web build's `NEXT_PUBLIC_API_URL`; the value must point to a reachable Payload API before building native assets.
- Deployment constraints: Vercel is the intended deployment platform in `docs/knowledge-base.md`, but no Vercel project configuration or continuous-integration pipeline was found during the Phase 1 repository scan.

## 6) Evidence

- `package.json`
- `bun.lock`
- `turbo.json`
- `biome.json`
- `apps/payload/package.json`
- `apps/payload/.env.example`
- `packages/payload-config/src/payload.config.ts`
- `docs/knowledge-base.md`
