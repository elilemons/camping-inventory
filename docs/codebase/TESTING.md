# Testing Patterns

## 1) Test Stack and Commands

- Primary test framework: Vitest `4.0.18` for Payload integration tests.
- Assertion and mocking tools: Vitest assertions; React Testing Library and jsdom are installed in the Payload package, but no React Testing Library test was found in the inspected test tree.
- Browser framework: Playwright `1.58.2` for Payload end-to-end tests.
- Commands declared by the repository:

```bash
bun run --filter payload test
bun run --filter payload test:int
bun run --filter payload test:e2e
```

No root test script is defined. The Payload package scripts and Playwright web-server command use Bun.

## 2) Test Layout

- Integration tests: `apps/payload/tests/int/**/*.int.spec.ts`.
- End-to-end tests: `apps/payload/tests/e2e/**/*.e2e.spec.ts`.
- Shared test helpers: `apps/payload/tests/helpers`.
- Vitest setup: `apps/payload/vitest.setup.ts`, which loads environment configuration.
- Playwright setup: `apps/payload/playwright.config.ts`, which selects Chromium and starts the Payload development server.

## 3) Test Scope Matrix

| Scope | Covered? | Typical target | Notes |
|-------|----------|----------------|-------|
| Unit | No evidence of a unit suite | `[TODO]` Custom product logic | No unit test files were found in the current source tree |
| Integration | Yes, minimally | Payload collection access through `getPayload` | `api.int.spec.ts` checks that users can be fetched |
| E2E | Yes, minimally | Payload admin navigation and starter frontend page | `admin.e2e.spec.ts`, `frontend.e2e.spec.ts` |
| Web product interface behavior | No evidence | `[TODO]` Product workflows | `apps/web` has no test directory in the current tree |
| Capacitor behavior | No evidence | `[TODO]` Native shell behavior after migration | Native platform projects currently have no dedicated test suite |

## 4) Mocking and Isolation Strategy

- Main approach: tests use a real Payload configuration and database connection for the integration test; browser tests seed and clean up a user through helper functions.
- Isolation guarantees: the admin suite creates a test user in `beforeAll` and removes it in `afterAll`; broader database isolation is not configured in the inspected files.
- Common failure mode: tests depend on a running local server and configured database environment; the Playwright web server uses `http://localhost:3000`.

## 5) Coverage and Quality Signals

- Coverage tool and threshold: `[TODO]` No coverage tool or threshold is configured.
- Current reported coverage: `[TODO]` No coverage report was found.
- Known gaps: no product workflow tests, no mobile tests, no root-level test command, and no continuous-integration test workflow were found.

## 6) Evidence

- `apps/payload/package.json`
- `apps/payload/vitest.config.mts`
- `apps/payload/vitest.setup.ts`
- `apps/payload/playwright.config.ts`
- `apps/payload/tests/int/api.int.spec.ts`
- `apps/payload/tests/e2e/admin.e2e.spec.ts`
- `apps/payload/tests/e2e/frontend.e2e.spec.ts`
- `apps/payload/tests/helpers/seedUser.ts`
- `apps/payload/tests/helpers/login.ts`
- `AGENTS.md`
