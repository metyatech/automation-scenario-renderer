import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { renderMarkdownFromArtifacts } from "../src/renderMarkdown.js";

const tempDirs: string[] = [];

afterEach(async () => {
  await Promise.all(
    tempDirs.map((dir) => rm(dir, { recursive: true, force: true })),
  );
});

describe("renderMarkdownFromArtifacts", () => {
  it("writes markdown with relative asset paths", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "renderer-md-"));
    tempDirs.push(tempDir);

    const markdownPath = join(tempDir, "docs", "guide.md");
    await renderMarkdownFromArtifacts(
      {
        scenarioId: "sample",
        title: "Sample",
        steps: [
          {
            id: "step-1",
            title: "Step 1",
            imagePath: join(tempDir, "artifacts", "step-1.png"),
          },
        ],
        videoPath: join(tempDir, "artifacts", "video.mp4"),
      },
      markdownPath,
    );

    const markdown = await readFile(markdownPath, "utf8");
    expect(markdown).toContain("../artifacts/step-1.png");
    expect(markdown).toContain("../artifacts/video.mp4");
  });
});
