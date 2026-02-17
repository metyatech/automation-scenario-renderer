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

  it("draws pulse circle and label text", () => {
    const svg = buildSvgOverlay(1280, 720, {
      type: "click_pulse",
      box: { x: 320, y: 240, width: 180, height: 64 },
    });

    const labeled = buildSvgOverlay(1280, 720, {
      type: "label",
      text: "Select blend shape",
      point: { x: 400, y: 300 },
    });

    expect(svg).toContain("<circle");
    expect(svg).toContain("pulseRing");
    expect(labeled).toContain("<text");
    expect(labeled).toContain("Select blend shape");
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

  it("draws drag arrow alias and highlight box", () => {
    const drag = buildSvgOverlay(1280, 720, {
      type: "drag_arrow",
      from: { x: 200, y: 160 },
      to: { x: 700, y: 500 },
    });

    const highlight = buildSvgOverlay(1280, 720, {
      type: "highlight_box",
      box: { x: 40, y: 80, width: 300, height: 120 },
    });

    expect(drag).toContain("<line");
    expect(drag).toContain('marker-end="url(#arrowhead)"');
    expect(highlight).toContain("<rect");
    expect(highlight).toContain('stroke="#ff0000"');
  });
});
