---
name: commit-messages
description: Use when writing git commit messages or reviewing commit history. Enforce Conventional Commits formatting and help choose the right type, scope, and breaking-change marker.
---

# Commit Messages

Use Conventional Commits for every commit message unless the user explicitly asks for a different style.

## Format

```text
<type>[optional scope]: <description>

[optional body]
[optional footer(s)]
```

## Types

- `feat` for a new user-facing feature
- `fix` for a bug fix
- `docs` for documentation-only changes
- `chore` for maintenance work
- `refactor` for code changes that do not add features or fix bugs
- `test` for test-only changes
- `ci` for CI/CD changes
- `build` for build or dependency tooling

## Rules

- Keep the description short, specific, and imperative.
- Use lowercase types for consistency.
- Add a scope when it adds useful context, for example `feat(api): ...`.
- Use `!` after the type or scope for breaking changes, or add a `BREAKING CHANGE:` footer.
- Prefer one logical change per commit.
- If a change spans multiple types, split it into multiple commits when practical.
- Do not write vague messages like `update`, `fix stuff`, or `wip`.

## Examples

```text
feat: add trip quantity recalculation
fix(parser): handle empty selection state
docs: clarify setup steps
refactor(api): extract commit message formatter
feat!: remove legacy packing list format
```

## When asked for a commit message

- Infer the best type from the diff or described change.
- Suggest a scope when the touched area is obvious.
- Mention if the change appears breaking.
- If the user wants, provide 2-3 candidate messages ordered from most precise to most general.
