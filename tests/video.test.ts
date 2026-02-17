import { describe, expect, it } from "vitest";

import { buildFfmpegFilterGraph } from "../src/video/ffmpegFilters.js";

describe("ffmpeg filter graph", () => {
  it("creates click highlight drawbox", () => {
    const graph = buildFfmpegFilterGraph([
      {
        type: "click",
        startSeconds: 1,
        endSeconds: 2,
        box: { x: 10, y: 20, width: 120, height: 50 },
      },
    ]);

    expect(graph).toContain("drawbox");
    expect(graph).toContain("enable='between(t,1,2)' ".trim());
  });

  it("creates highlight, pulse, and label overlays", () => {
    const graph = buildFfmpegFilterGraph([
      {
        type: "highlight_box",
        startSeconds: 1,
        endSeconds: 3,
        box: { x: 20, y: 30, width: 250, height: 80 },
      },
      {
        type: "click_pulse",
        startSeconds: 2,
        endSeconds: 4,
        box: { x: 100, y: 200, width: 90, height: 40 },
      },
      {
        type: "label",
        startSeconds: 2,
        endSeconds: 5,
        text: "Body > Armature",
        point: { x: 400, y: 250 },
      },
    ]);

    expect(graph).toContain("drawbox");
    expect(graph).toContain("drawtext");
    expect(graph).toContain("between(t,2,4)");
    expect(graph).toContain("Body \\> Armature");
  });

  it("creates drag and drop arrow layers", () => {
    const graph = buildFfmpegFilterGraph([
      {
        type: "dragDrop",
        startSeconds: 2,
        endSeconds: 5,
        from: { x: 50, y: 50 },
        to: { x: 400, y: 300 },
      },
    ]);

    expect(graph).toContain("drawline");
    expect(graph).toContain("drawbox");
    expect(graph).not.toContain("drawcircle");
  });

  it("supports drag_arrow alias", () => {
    const graph = buildFfmpegFilterGraph([
      {
        type: "drag_arrow",
        startSeconds: 0.5,
        endSeconds: 1.5,
        from: { x: 110, y: 120 },
        to: { x: 500, y: 450 },
      },
    ]);

    expect(graph).toContain("drawline");
    expect(graph).toContain("between(t,0.5,1.5)");
  });
});
