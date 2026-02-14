export { annotateImage } from "./annotation/annotateImage.js";
export { buildSvgOverlay } from "./annotation/svgOverlay.js";
export { generateMarkdown } from "./markdown.js";
export { toMarkdownAssetPath } from "./paths.js";
export { renderMarkdownFromArtifacts } from "./renderMarkdown.js";
export type {
  AnnotationSpec,
  Box,
  Point,
  RunArtifacts,
  StepArtifact,
  VideoTimelineEvent,
} from "./types.js";
export { annotateVideo } from "./video/annotateVideo.js";
export { buildFfmpegFilterGraph } from "./video/ffmpegFilters.js";
