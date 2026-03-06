import { describe, expect, it } from "vitest";
import { generateMermaidFlowchart } from "../src/mermaid.js";

describe("mermaid flowchart", () => {
  it("generates a linear flowchart from steps", () => {
    const result = generateMermaidFlowchart([
      { id: "step-1", title: "Open project", imagePath: "a.png" },
      { id: "step-2", title: "Click button", imagePath: "b.png" },
      { id: "step-3", title: "Verify result", imagePath: "c.png" },
    ]);

    expect(result).toContain("```mermaid");
    expect(result).toContain("graph TD");
    expect(result).toContain('step0["Open project"]');
    expect(result).toContain("step0 --> step1");
    expect(result).toContain("step1 --> step2");
    expect(result).toContain("```");
  });

  it("returns empty string for no steps", () => {
    expect(generateMermaidFlowchart([])).toBe("");
  });

  it("skips flowchart for single step", () => {
    // generateMermaidFlowchart is called from markdown only when steps > 1
    // but the function itself still works with 1 step
    const result = generateMermaidFlowchart([
      { id: "s1", title: "Only step", imagePath: "x.png" },
    ]);
    expect(result).toContain('step0["Only step"]');
    expect(result).not.toContain("-->");
  });
});
