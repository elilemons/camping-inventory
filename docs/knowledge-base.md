# Project Knowledge Base

This is a living working agreement that we are creating together. It captures collaboration, engineering, and product-development context that future Codex agents should use when working in this repository. It is not assumed to be complete or authoritative beyond the decisions explicitly recorded here. Product vision and product decisions remain canonical in [product.md](product.md). Unimplemented product ideas remain tracked in [backlog.md](backlog.md).

When adding guidance, distinguish between:

- Confirmed decisions: explicitly agreed to by the human contributor.
- Repository observations: facts discovered by inspecting the current codebase.
- Open decisions: questions that still need to be answered before they affect implementation.

Agents should not turn a repository observation or an unexamined assumption into a project rule without recording the decision and its reasoning.

## Human collaborator

- The repository has one human contributor.
- The human contributor is a very senior front-end developer and an expert in the technologies used by this repository.
- Agents should be precise, show their reasoning through a clear plan and review, and avoid explaining basic technology concepts unless asked.

## Product focus

The product is an app for tracking camping inventory and creating packing lists. The primary personal use case is car camping.

The app must not interrupt a user's work to request a review, promote a paid plan, or encourage a plan switch. It should stay out of the user's way and provide prompts only when they are relevant to the task.

## Domain decisions

- The first version is for individual camping organization; social and collaborative features are out of scope.
- Core entities are users, inventory items, containers, trips, packing lists, packing-list entries, and locations.
- Users own their inventory items, containers, trips, and packing lists. Trips may include non-account participants, but access remains personal.
- The app distinguishes required, owned, packed, and shortfall quantities.
- Inventory states are `Owned`, `Available`, `Packed`, `Missing`, and `Unavailable`. `Packed` is always trip-specific.
- One physical inventory item may appear on multiple packing lists. Overlapping-trip conflicts should warn without silently blocking the user.
- Unauthenticated users may browse a demo or starter packing list and retain temporary interface state, but they do not receive a persistent anonymous workspace.
- Authentication is required before meaningful user data is created or saved.
- Auth0 is the intended product-user authentication provider, using the Auth0 Next.js integration for the web application. The web application and Capacitor wrapper pass validated Auth0 access tokens minted for the Payload API to Payload as bearer tokens. Payload associates the request with a user context for ownership-based authorization. Payload authentication is for the Payload admin application.
- The Payload API must not use an Auth0 identity token or the Next.js session cookie as its API credential.
- The system should create a matching Payload user on first authenticated product use and recreate it if an unexpected missing-user condition occurs.
- Users should be able to delete their account and associated personal data. This is a product requirement, not yet a complete compliance policy.
- After authentication, users can work offline with locally cached account data and queue changes for synchronization.
- Before authentication, web local storage may hold temporary interface state only. The web application may use browser storage for local caching, while the Capacitor application will use Capacitor storage APIs for authenticated local data; the exact storage implementation is `[TODO]`.
- Payload versions and drafts are a possible synchronization aid because they preserve document history, but they do not by themselves define the offline synchronization or conflict-resolution protocol.
- The official Payload auth example demonstrates the target authorization shape—an authenticated Payload user context and collection access rules—but it uses Payload-native authentication. Payload custom strategies provide the intended adapter point for validating the Auth0 bearer token and returning the matching Payload user.
- Product documentation records entities, relationships, ownership, calculations, states, offline guarantees, authentication, merging, journeys, and invariants. Issue plans record implementation details for one change.

## Engineering direction

This is a Turbo repo. The Payload application and the product interface can live together within the repository while preserving clear application and package boundaries.

Current direction:

- Payload owns application data.
- Users authenticate before inventory data is saved to Payload. Before authentication, temporary work may be stored in local storage and the interface must clearly explain that it is device-local, is not backed up or synced, and may be lost if local app data is cleared or the app is uninstalled.
- MongoDB hosts the database.
- Server-side rendering should be used where it is appropriate.
- Vercel is the deployment platform.
- Vitest covers custom logic and expected interface behavior.
- Playwright covers end-to-end behavior.
- Capacitor is the target native application runtime. It wraps the web application for distribution through mobile app stores; it is not a replacement user-interface framework.
- Tailwind CSS is the styling system.
- Components should use the neobrutalism.com component library where appropriate.

## Current repository observations

The repository currently contains:

- `apps/web`: a Next.js web application.
- `apps/payload`: a Payload application with Next.js routes and tests.
- `apps/mobile`: the current Expo and React Native application, which is scheduled for removal.
- `apps/docs`: a documentation application.
- `packages/ui`: a shared React component package.
- `packages/payload-config`: shared Payload configuration and generated types.
- `packages/typescript-config`: shared TypeScript configuration.

These are observations of the current codebase, not a final architecture decision. The planned Capacitor migration may change or remove some of these boundaries.

Architecture transition:

- Current state: the repository has a native application based on React Native and Expo under `apps/mobile`.
- Target state: remove `apps/mobile`; keep the web application as the shared product interface; add a likely `services/capacitor` workspace that wraps the web application for iOS and Android distribution.
- Payload remains a separate application and continues to own application data.
- Capacitor-specific native integrations should live in the Capacitor workspace or its plugins, not in the shared web interface.
- This transition is an architectural change and should be planned and reviewed separately before feature work that depends on it.
- Do not implement this migration merely because it is documented here; treat this section as the agreed direction until a dedicated issue or plan is approved.

## Language and naming

- Do not use abbreviations in prose, filenames, or identifiers except for `btn` for button.
- Approved branch prefixes are `feat/`, `fix/`, `chore/`, and `docs/`.
- Branch names should use a short, descriptive kebab-case suffix, such as `feat/knowledge-base`.
- Prefer complete words in new names. Existing names do not need to be renamed solely to satisfy this rule.

## Standard issue workflow

For each issue:

1. Inspect the issue and the relevant repository context.
2. Read `docs/product.md` before planning or implementing product work.
3. Check `docs/backlog.md` for related unimplemented ideas.
4. Inspect existing patterns, application boundaries, and tests.
5. Create a concise implementation plan.
6. Ask focused questions when an unresolved decision could change scope or direction.
7. Implement the smallest change that solves the issue.
8. Add or update tests for custom logic and expected interface behavior.
9. Update documentation when the change introduces or alters an important decision.
10. Run the relevant checks using Bun, Vitest, and Playwright as appropriate.
11. Perform a self-review and add review comments directly on the diff. Initially, the human contributor reviews these comments before changes are made in response to them.
12. Summarize the implementation, checks, self-review findings, and any remaining risks.
13. Present the work as an explicit pull request and wait for the human contributor's review.

The repository pull request template at `.github/pull_request_template.md` is part of this workflow. Use it to describe the change, included and excluded scope, validation, self-review findings, risks, deployment notes, and the handoff for human review.

## Pull request size

Pull requests should generally contain roughly 500 to 1,000 changed lines or fewer so one person can understand the full change. Architectural changes are an expected exception when splitting the work would make the migration less safe or coherent. When exceeding the normal size, explain why and identify how the change is being kept understandable.

## Documentation and decision ownership

Agents may update repository documentation and backlog files when the work requires it. Product vision, scope, and recorded product decisions belong in `docs/product.md`; individual future work belongs in `docs/backlog.md`; collaboration and engineering guidance belong here.

When a decision is not documented or is ambiguous, the agent should ask rather than silently establish a new product direction.
