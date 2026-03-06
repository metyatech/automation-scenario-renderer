import { annotateImage } from "./annotation/annotateImage.js";
import type { RunArtifacts, VideoTimelineEvent } from "./types.js";
import { annotateVideo } from "./video/annotateVideo.js";

/**
 * Processes artifacts by applying annotations to images and videos.
 *
 * For each step:
 * - If `annotation` is present, it is applied to `imagePath`.
 * - If `annotations` is present, each is applied to `imagePath`.
 *
 * For the scenario:
 * - If `rawVideoPath` and `videoPath` are present, and there are video events,
 *   it creates an annotated video.
 *
 * Note: This function modifies images in-place unless otherwise specified in the future.
 */
export async function processArtifacts(
  artifacts: RunArtifacts,
  videoEvents: VideoTimelineEvent[] = []
): Promise<void> {
  // Apply image annotations
  for (const step of artifacts.steps) {
    if (step.annotation) {
      await annotateImage(step.imagePath, step.annotation);
    }
    if (step.annotations && step.annotations.length > 0) {
      for (const annotation of step.annotations) {
        await annotateImage(step.imagePath, annotation);
      }
    }
  }

  // Apply video annotations
  if (artifacts.rawVideoPath && artifacts.videoPath && videoEvents.length > 0) {
    await annotateVideo(artifacts.rawVideoPath, artifacts.videoPath, videoEvents);
  }
}
