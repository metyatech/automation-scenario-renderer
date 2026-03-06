import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { toBaseUrlAssetPath, toMarkdownAssetPath } from "../src/paths.js";

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

describe("toBaseUrlAssetPath", () => {
  it("converts asset path to base-url-prefixed path", () => {
    const assetPath = resolve(
      "artifacts/web-example/screenshots/open-example.png",
    );
    const outputDir = resolve("artifacts/web-example");

    const value = toBaseUrlAssetPath(
      assetPath,
      outputDir,
      "/guide-assets/web-example",
    );

    expect(value).toBe(
      "/guide-assets/web-example/screenshots/open-example.png",
    );
  });

  it("keeps http url untouched", () => {
    const value = toBaseUrlAssetPath(
      "https://example.com/video.mp4",
      resolve("artifacts/web-example"),
      "/guide-assets/web-example",
    );

    expect(value).toBe("https://example.com/video.mp4");
  });

  it("strips trailing slash from base url", () => {
    const assetPath = resolve("artifacts/web-example/video.mp4");
    const outputDir = resolve("artifacts/web-example");

    const value = toBaseUrlAssetPath(
      assetPath,
      outputDir,
      "/guide-assets/web-example/",
    );

    expect(value).toBe("/guide-assets/web-example/video.mp4");
  });
});
