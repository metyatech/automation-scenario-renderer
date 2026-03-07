export { generateAnimation } from "./animation/generateAnimation.js";
export { annotateImage } from "./annotation/annotateImage.js";
export { buildSvgOverlay } from "./annotation/svgOverlay.js";
export {
  buildFrontmatter,
  computeDifficulty,
  computeTimeEstimate,
  generateMarkdown,
} from "./markdown.js";
export { generateMermaidFlowchart } from "./mermaid.js";
export { toBaseUrlAssetPath, toMarkdownAssetPath } from "./paths.js";
export { renderMarkdownFromArtifacts } from "./renderMarkdown.js";
export type { RenderMarkdownOptions } from "./renderMarkdown.js";
export type {
  AnimationConfig,
  AnnotationSpec,
  Box,
  Point,
  RelatedScenario,
  RunArtifacts,
  StepArtifact,
  VideoTimelineEvent,
} from "./types.js";
export { annotateVideo } from "./video/annotateVideo.js";
export { buildFfmpegFilterGraph } from "./video/ffmpegFilters.js";
