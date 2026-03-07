import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { RunArtifacts } from "./types.js";

import { generateMarkdown } from "./markdown.js";
import { toBaseUrlAssetPath, toMarkdownAssetPath } from "./paths.js";

export type RenderMarkdownOptions = {
  assetBaseUrl?: string;
  outputDir?: string;
};

export async function renderMarkdownFromArtifacts(
  artifacts: RunArtifacts,
  markdownPath: string,
  options?: RenderMarkdownOptions,
): Promise<void> {
  const transformPath = (assetPath: string): string => {
    if (options?.assetBaseUrl && options?.outputDir) {
      return toBaseUrlAssetPath(
        assetPath,
        options.outputDir,
        options.assetBaseUrl,
      );
    }
    return toMarkdownAssetPath(assetPath, markdownPath);
  };

  const markdownArtifacts: RunArtifacts = {
    ...artifacts,
    steps: artifacts.steps.map((step) => ({
      ...step,
      imagePath: transformPath(step.imagePath),
    })),
    videoPath: artifacts.videoPath
      ? transformPath(artifacts.videoPath)
      : undefined,
    animationPath: artifacts.animationPath
      ? transformPath(artifacts.animationPath)
      : undefined,
  };

  await mkdir(dirname(markdownPath), { recursive: true });
  const markdownOutput = generateMarkdown({
    scenarioId: markdownArtifacts.scenarioId,
    title: markdownArtifacts.title,
    steps: markdownArtifacts.steps,
    videoPath: markdownArtifacts.videoPath,
    animationPath: markdownArtifacts.animationPath,
    relatedScenarios: markdownArtifacts.relatedScenarios,
  });

  await writeFile(markdownPath, markdownOutput, "utf8");
}
