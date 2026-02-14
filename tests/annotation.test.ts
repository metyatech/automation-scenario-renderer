import { describe, expect, it } from "vitest";

import { buildSvgOverlay } from "../src/annotation/svgOverlay.js";

describe("svg overlay", () => {
  it("draws red rectangle for click target", () => {
    const svg = buildSvgOverlay(1280, 720, {
      type: "click",
      box: { x: 100, y: 120, width: 200, height: 60 },
    });

    expect(svg).toContain('stroke="#ff0000"');
    expect(svg).toContain("<rect");
  });

  it("draws drag and drop arrow", () => {
    const svg = buildSvgOverlay(1280, 720, {
      type: "dragDrop",
      from: { x: 80, y: 90 },
      to: { x: 600, y: 420 },
    });

    expect(svg).toContain("<line");
    expect(svg).toContain('marker-end="url(#arrowhead)"');
  });
});
