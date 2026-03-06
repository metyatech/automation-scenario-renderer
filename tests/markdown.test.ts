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
    expect(markdown).toContain("<!-- scenario_id: unity-basic -->");
    expect(markdown).not.toContain("Scenario ID:");
    expect(markdown).toContain("## 1. Open project");
    expect(markdown).toContain(
      "![Open project](artifacts/run-1/screenshots/open-project.png)",
    );
    expect(markdown).toContain("<video controls");
    expect(markdown).toContain(
      '<source src="artifacts/run-1/video/unity-basic-annotated.mp4"',
    );
  });

  it("renders related scenarios as See Also section", () => {
    const markdown = generateMarkdown({
      scenarioId: "test",
      title: "Test",
      steps: [{ id: "s1", title: "Step", imagePath: "img.png" }],
      relatedScenarios: [
        { scenarioId: "unity-basic", label: "Unity の基本操作" },
        { scenarioId: "web-example" },
      ],
    });

    expect(markdown).toContain("## 関連ガイド");
    expect(markdown).toContain("[Unity の基本操作](./unity-basic.md)");
    expect(markdown).toContain("[web-example](./web-example.md)");
  });
});
