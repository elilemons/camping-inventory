# Repository Guidance

Before planning or implementing product work, read [docs/product.md](docs/product.md) and use it as the source of truth for the product vision, scope, and recorded decisions.

When working in this repository:

- Use Bun exclusively. Use `bun`, `bun run`, and `bunx`; do not use `npm`, `npx`, Yarn, or pnpm.
- Preserve the established monorepo architecture and app boundaries.
- Make the smallest change that solves the requested task.
- Avoid unrelated refactors, cleanup, or formatting-only changes.
- Run the relevant tests or checks for the area you touched before handing work back.
- Prefer existing patterns and package conventions over introducing new ones.
- If a request would change scope, assumptions, or product direction, confirm before proceeding.

For product work specifically:

- Check the backlog document first for unimplemented product ideas.
- Do not implement backlog items unless the user explicitly asks for implementation.
- Keep repo documentation aligned with the agreed product decisions.
