import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { RunArtifacts } from "@metyatech/automation-scenario-spec";

import { generateMarkdown } from "./markdown.js";
import { toMarkdownAssetPath } from "./paths.js";

export async function renderMarkdownFromArtifacts(
  artifacts: RunArtifacts,
  markdownPath: string,
): Promise<void> {
  const markdownArtifacts: RunArtifacts = {
    ...artifacts,
    steps: artifacts.steps.map((step) => ({
      ...step,
      imagePath: toMarkdownAssetPath(step.imagePath, markdownPath),
    })),
    videoPath: artifacts.videoPath
      ? toMarkdownAssetPath(artifacts.videoPath, markdownPath)
      : undefined,
  };

  await mkdir(dirname(markdownPath), { recursive: true });
  const markdownOutput = generateMarkdown({
    scenarioId: markdownArtifacts.scenarioId,
    title: markdownArtifacts.title,
    steps: markdownArtifacts.steps,
    videoPath: markdownArtifacts.videoPath,
  });

  await writeFile(markdownPath, markdownOutput, "utf8");
}
