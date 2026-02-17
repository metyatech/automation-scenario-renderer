# Contributing

Thanks for your interest in contributing to `@metyatech/automation-scenario-renderer`.

## Development workflow

- Create a branch for your changes.
- Ensure you have Node.js 20 or later installed.
- Install dependencies:
  ```bash
  npm install
  ```
- Make your changes and add tests if applicable.
- Verify your changes locally:
  ```bash
  npm run verify
  ```
- Commit with a clear message and open a PR.

## Development commands

- `npm run build`: Build the project (compiles TypeScript).
- `npm run test`: Run unit tests using Vitest.
- `npm run lint`: Check code style using ESLint.
- `npm run format`: Check formatting using Prettier.
- `npm run format:write`: Fix formatting issues automatically.
- `npm run typecheck`: Run TypeScript type checking.
- `npm run verify`: Run all checks (format, lint, typecheck, test, build, and dependency audit).

## Commit messages

Please use clear and descriptive commit messages. If your change addresses an issue, reference it in the commit message (e.g., `Fixes #123`).
