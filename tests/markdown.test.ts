import { describe, expect, it } from "vitest";

import {
  buildFrontmatter,
  computeDifficulty,
  computeTimeEstimate,
  generateMarkdown,
} from "../src/markdown.js";

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

  it("includes animation image when animationPath is provided", () => {
    const markdown = generateMarkdown({
      scenarioId: "test",
      title: "Test",
      steps: [{ id: "s1", title: "Step", imagePath: "img.png" }],
      animationPath: "/guide-assets/test/animation.gif",
    });

    expect(markdown).toContain("![Test](/guide-assets/test/animation.gif)");
  });

  it("includes frontmatter with badge metadata", () => {
    const markdown = generateMarkdown({
      scenarioId: "test",
      title: "Test",
      steps: [
        { id: "s1", title: "Step 1", imagePath: "a.png" },
        { id: "s2", title: "Step 2", imagePath: "b.png" },
      ],
    });

    expect(markdown).toContain("---\nstepCount: 2");
    expect(markdown).toContain("difficulty: Easy");
    expect(markdown).toContain('timeEstimate: "5分以内"');
  });
});

describe("buildFrontmatter", () => {
  it("returns undefined for empty steps", () => {
    expect(buildFrontmatter([])).toBeUndefined();
  });

  it("includes stepCount and difficulty", () => {
    const fm = buildFrontmatter([
      { id: "s1", title: "S1", imagePath: "a.png" },
    ]);
    expect(fm).toContain("stepCount: 1");
    expect(fm).toContain("difficulty: Easy");
  });

  it("uses timing data for time estimate", () => {
    const fm = buildFrontmatter([
      {
        id: "s1",
        title: "S1",
        imagePath: "a.png",
        startedAtMs: 0,
        endedAtMs: 90_000,
      },
    ]);
    expect(fm).toContain('timeEstimate: "約2分"');
  });
});

describe("computeDifficulty", () => {
  it("returns Easy for 1-3 steps", () => {
    expect(computeDifficulty(1)).toBe("Easy");
    expect(computeDifficulty(3)).toBe("Easy");
  });

  it("returns Normal for 4-8 steps", () => {
    expect(computeDifficulty(4)).toBe("Normal");
    expect(computeDifficulty(8)).toBe("Normal");
  });

  it("returns Hard for 9+ steps", () => {
    expect(computeDifficulty(9)).toBe("Hard");
  });
});

describe("computeTimeEstimate", () => {
  it("estimates from step count when no timing data", () => {
    const steps = Array.from({ length: 3 }, (_, i) => ({
      id: `s${i}`,
      title: `S${i}`,
      imagePath: `${i}.png`,
    }));
    expect(computeTimeEstimate(steps)).toBe("5〜15分");
  });

  it("computes from timing data when available", () => {
    const steps = [
      {
        id: "s1",
        title: "S1",
        imagePath: "a.png",
        startedAtMs: 0,
        endedAtMs: 30_000,
      },
    ];
    expect(computeTimeEstimate(steps)).toBe("1分以内");
  });

  it("handles long durations", () => {
    const steps = [
      {
        id: "s1",
        title: "S1",
        imagePath: "a.png",
        startedAtMs: 0,
        endedAtMs: 7_200_000,
      },
    ];
    expect(computeTimeEstimate(steps)).toBe("約2.0時間");
  });
});
