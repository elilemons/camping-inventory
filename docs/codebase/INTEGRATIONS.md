# External Integrations

## 1) Integration Inventory

| System | Type (API/DB/Queue/etc) | Purpose | Auth model | Criticality | Evidence |
|--------|---------------------------|---------|------------|-------------|----------|
| Payload REST API | Internal HTTP API | Supplies data to the web application and future Capacitor wrapper | Public collection reads are configured; authenticated inventory persistence is an agreed product direction but not implemented | High | `apps/payload/src/app/(payload)/api/[...slug]/route.ts`, `packages/payload-config/src/collections/Page.ts`, `packages/payload-config/src/collections/Users.ts`, `docs/product.md` |
| Payload GraphQL API | Internal HTTP API | Exposes Payload GraphQL route | `[TODO]` Verify intended consumers and access policy | Medium | `apps/payload/src/app/(payload)/api/graphql/route.ts` |
| MongoDB | Database | Stores Payload collections | Connection URL from `DATABASE_URL` | High | `packages/payload-config/src/payload.config.ts`, `apps/payload/.env.example` |
| Auth0 | External authentication service | Authenticates product users for the web application and future Capacitor wrapper | Auth0 access tokens for the Payload API are intended to be validated by a Payload custom strategy; the matching Payload user is created on first use | High | `docs/product.md`, `docs/knowledge-base.md`, Auth0 documentation, Payload custom strategies documentation |
| Capacitor | Mobile platform integration | Packages the shared web application for iOS and Android | `apps/web/capacitor.config.ts`; native projects use the configured application identifier | Medium | `apps/web/package.json`, `apps/web/ios`, `apps/web/android` |

The intended Capacitor and Vercel integrations are recorded in `docs/knowledge-base.md`, but no Capacitor configuration or Vercel deployment configuration is present.

## 2) Data Stores

| Store | Role | Access layer | Key risk | Evidence |
|-------|------|--------------|----------|----------|
| MongoDB | Payload persistence for users, media, pages, and Payload system collections | Payload MongoDB adapter in shared configuration | The connection falls back to an empty string if `DATABASE_URL` is missing | `packages/payload-config/src/payload.config.ts`, `packages/payload-config/src/collections/*.ts` |

## 3) Secrets and Credentials Handling

- Credential sources: environment variables `DATABASE_URL` and `PAYLOAD_SECRET`; the web API URL may use `NEXT_PUBLIC_API_URL`; Auth0 domain, client, session, issuer, audience, and secret configuration is `[TODO]`.
- Hardcoding check: the web API URL is environment-configured through `NEXT_PUBLIC_API_URL`; no committed secret value was found in the inspected source files.
- Rotation or lifecycle notes: `[TODO]` No rotation or secret lifecycle policy is documented.
- Payload uses `process.env.PAYLOAD_SECRET || ''` and `process.env.DATABASE_URL || ''`, so missing configuration does not fail at configuration construction time. `apps/payload/.env.example` documents the expected variables.

## 4) Reliability and Failure Behavior

- Retry and backoff behavior: no explicit retry or backoff logic found in the web or mobile API wrappers.
- Timeout policy: no request timeout configuration found.
- Circuit breaker or fallback behavior: no circuit breaker found; web API URL has a localhost fallback and the client renders an error state when a request fails.
- CORS: Payload allows the local web development origins configured in the shared Payload configuration. Native production origins and API deployment settings remain deployment concerns.

## 5) Observability for Integrations

- Logging around external calls: no application logging around `fetch` or database calls was found.
- Metrics and tracing: no metrics or tracing configuration was found.
- Missing visibility gaps: request timing, database health, production errors, and integration failures are not documented or instrumented.

## 6) Evidence

- `packages/payload-config/src/payload.config.ts`
- `packages/payload-config/src/collections/Page.ts`
- `packages/payload-config/src/collections/Users.ts`
- `apps/payload/src/app/(payload)/api/[...slug]/route.ts`
- `apps/payload/src/app/(payload)/api/graphql/route.ts`
- `apps/payload/.env.example`
- `apps/web/lib/api.ts`
- `apps/web/capacitor.config.ts`
- `docs/knowledge-base.md`
