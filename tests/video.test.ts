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
});
