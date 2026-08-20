# Coding Conventions

## 1) Naming Rules

| Item | Rule | Example | Evidence |
|------|------|---------|----------|
| Framework files | Follow framework-required names | `page.tsx`, `layout.tsx`, `route.ts` | `apps/web/app`, `apps/payload/src/app` |
| Shared component files | Lowercase file names are used | `packages/ui/src/button.tsx` | `packages/ui/src` |
| Payload collections | PascalCase file and export names are used | `Users.ts`, `Media.ts`, `Pages` | `packages/payload-config/src/collections` |
| Functions | camelCase names | `fetchHomePage`, `usePageBySlug`, `configurePayload` | `apps/web/lib`, `packages/payload-config/src` |
| Components | PascalCase names | `Home`, `Providers`, `Button`, `Card` | `apps/web/app`, `apps/web/lib`, `packages/ui/src` |
| Types and interfaces | PascalCase names | `ButtonProps`, `LoginOptions`, `Config` | `packages/ui/src/button.tsx`, `apps/payload/tests/helpers/login.ts`, Payload configuration |
| Environment variables | Uppercase snake case | `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_API_URL` | `apps/payload/.env.example`, source files |

## 2) Formatting and Linting

- Formatter: Biome `2.5.1`, configured in `biome.json` with two-space indentation, single quotes, optional semicolons, and trailing commas.
- Linter: Biome recommended preset in `biome.json`.
- TypeScript strictness: root `tsconfig.json` enables `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, and `noFallthroughCasesInSwitch`; workspace configurations add framework-specific settings.
- Run commands: `bun run lint`, `bun run format`, and `bun run format-and-lint`.

## 3) Import and Module Conventions

- Source files use ECMAScript module syntax and omit semicolons.
- Type-only imports are used in several files, for example `import type { Metadata } from 'next'`.
- Relative imports are used for nearby modules; configured aliases are used in the web and Payload applications.
- `packages/ui` uses per-file exports rather than a single barrel export, through `./*` in its package export map.
- Biome is configured to organize imports automatically through an assist action, but no generated output demonstrates that action running in this repository.

## 4) Error and Logging Conventions

- API wrappers throw a new `Error` when `fetch` returns a non-success response, as shown in `apps/web/lib/api.ts`.
- Client pages render loading, error, and empty states directly, as shown in `apps/web/app/page.tsx`.
- No application logging library or structured logging convention was found. `[TODO]` Define logging expectations when production workflows are introduced.
- No explicit sensitive-data redaction convention was found. `[TODO]` Define redaction requirements before adding authentication or sensitive inventory data.

## 5) Testing Conventions

- Integration test files use `tests/int/**/*.int.spec.ts` in the Payload application.
- Browser tests use `tests/e2e/**/*.e2e.spec.ts` and Playwright's `test` and `expect` APIs.
- Tests use helper modules for seeded users and login setup under `apps/payload/tests/helpers`.
- No coverage threshold is configured. `[TODO]` Define coverage expectations when custom product logic exists.

## 6) Evidence

- `biome.json`
- `tsconfig.json`
- `apps/web/tsconfig.json`
- `apps/payload/tsconfig.json`
- `apps/web/app/page.tsx`
- `apps/web/lib/api.ts`
- `packages/ui/src/button.tsx`
- `apps/payload/tests/int/api.int.spec.ts`
- `apps/payload/tests/e2e/admin.e2e.spec.ts`
