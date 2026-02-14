import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { toMarkdownAssetPath } from "../src/paths.js";

describe("toMarkdownAssetPath", () => {
  it("converts absolute path into markdown-relative path", () => {
    const markdownPath = resolve("docs/controls/auto-web-example.md");
    const assetPath = resolve(
      "artifacts/web-example/screenshots/open-example.png",
    );

    const value = toMarkdownAssetPath(assetPath, markdownPath);

    expect(value).toBe(
      "../../artifacts/web-example/screenshots/open-example.png",
    );
  });

  it("keeps http url untouched", () => {
    const value = toMarkdownAssetPath(
      "https://example.com/video.mp4",
      resolve("docs/controls/test.md"),
    );

    expect(value).toBe("https://example.com/video.mp4");
  });
});
