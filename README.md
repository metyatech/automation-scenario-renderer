# automation-scenario-renderer

Renderer package for generating publishable assets from scenario run artifacts.

## Overview

This package provides:

- Markdown generation from run artifacts
- Relative asset path conversion for Markdown
- Screenshot annotation overlays (click and drag-drop)
- Video annotation overlays using ffmpeg filter graphs

## Install

```bash
npm install @metyatech/automation-scenario-renderer
```

## Usage

```ts
import { renderMarkdownFromArtifacts } from "@metyatech/automation-scenario-renderer";

await renderMarkdownFromArtifacts(artifacts, "./docs/controls/generated.md");
```

## Development

```bash
npm install
npm run verify
```

## Compatibility

- Node.js 20+
- `ffmpeg` in `PATH` for video annotation

## Links

- LICENSE: `LICENSE`
- SECURITY: `SECURITY.md`
- CONTRIBUTING: `CONTRIBUTING.md`
- CODE OF CONDUCT: `CODE_OF_CONDUCT.md`
- CHANGELOG: `CHANGELOG.md`

## Release

This package uses standard npm release flow:

1. Update the version in `package.json`.
2. Update `CHANGELOG.md`.
3. Commit and push the changes.
4. Create a Git tag (e.g., `v0.1.0`) and push it.
5. Create a GitHub Release.
6. Publish to npm: `npm publish --access public` (scoped as `@metyatech`).
