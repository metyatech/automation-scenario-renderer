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
