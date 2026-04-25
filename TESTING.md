# Testing

## Philosophy

100% test coverage is the goal. Tests make vibe coding safe — without them, moving fast means breaking things silently. With them, it's a superpower.

## Framework

**vitest** v4 + **@testing-library/react** + **jsdom**

## Running tests

```bash
npm test          # run all tests once
npx vitest        # interactive watch mode
```

Tests live in `__tests__/`. Files follow the pattern `*.test.ts` or `*.test.tsx`.

## Layers

- **Unit tests** — pure functions, utility libraries (`lib/`). Fast, no DOM needed.
- **Component tests** — React components using `@testing-library/react`. Test what the user sees, not implementation.
- **Integration tests** — flows that cross multiple modules (e.g., data fetching + rendering).

## Conventions

- One test file per source file, mirroring the directory structure under `__tests__/`
- Use `describe` to group related cases, `it` for individual assertions
- Test behavior, not implementation — assert what the output is, not how it's computed
- When fixing a bug, write a regression test first

## Expectations

- New functions get a corresponding test
- New conditionals (if/else, ternary) get tests for both paths
- New error handling gets a test that triggers the error
- Never commit code that makes existing tests fail
