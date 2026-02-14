import { describe, expect, it } from "vitest";

import { generateMarkdown } from "../src/markdown.js";

describe("markdown generation", () => {
  it("creates vrchat-guidebook style steps with images and video", () => {
    const markdown = generateMarkdown({
      scenarioId: "unity-basic",
      title: "Unity basic flow",
      steps: [
        {
          id: "open-project",
          title: "Open project",
          description: "Open Unity project window.",
          imagePath: "artifacts/run-1/screenshots/open-project.png",
        },
      ],
      videoPath: "artifacts/run-1/video/unity-basic-annotated.mp4",
    });

    expect(markdown).toContain("# Unity basic flow");
    expect(markdown).toContain("## 1. Open project");
    expect(markdown).toContain(
      "![Open project](artifacts/run-1/screenshots/open-project.png)",
    );
    expect(markdown).toContain(
      "[操作動画](artifacts/run-1/video/unity-basic-annotated.mp4)",
    );
  });
});
