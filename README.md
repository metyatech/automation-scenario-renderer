# automation-scenario-renderer

Renderer package for generating publishable assets from scenario run artifacts.

## Overview

This package provides:

- Markdown generation from run artifacts
- Relative asset path conversion for Markdown
- Screenshot annotation overlays (using `sharp`)
- Video annotation overlays (using `ffmpeg` filter graphs)
- Batch processing of artifacts (images and videos)

## Install

```bash
npm install @metyatech/automation-scenario-renderer
```

## Usage

### Rendering Markdown

```ts
import { renderMarkdownFromArtifacts } from "@metyatech/automation-scenario-renderer";

await renderMarkdownFromArtifacts(artifacts, "./docs/controls/generated.md");
```

### Applying Annotations

```ts
import { processArtifacts } from "@metyatech/automation-scenario-renderer";

// This applies all step annotations to images (in-place)
// and generates an annotated video if videoPath is provided.
await processArtifacts(artifacts, videoEvents);
```

## Development

```bash
npm install
npm run verify
```

## Requirements

- Node.js 20+
- `sharp` (included as dependency)
- `ffmpeg` must be available in your `PATH` for video annotation.

## Links

- LICENSE: `LICENSE`
- SECURITY: `SECURITY.md`
- CONTRIBUTING: `CONTRIBUTING.md`
- CHANGELOG: `CHANGELOG.md`
