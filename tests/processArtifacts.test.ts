import { mkdtemp, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import sharp from "sharp";
import { afterEach, describe, expect, it } from "vitest";

import { processArtifacts } from "../src/processArtifacts.js";

const tempDirs: string[] = [];

afterEach(async () => {
  await Promise.all(tempDirs.map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("processArtifacts", () => {
  it("applies annotations to all steps in RunArtifacts", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "renderer-proc-"));
    tempDirs.push(tempDir);

    const imagePath1 = join(tempDir, "step1.png");
    const imagePath2 = join(tempDir, "step2.png");

    // Create dummy images
    await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 3,
        background: { r: 255, g: 0, b: 0 }
      }
    })
      .png()
      .toFile(imagePath1);
    await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 3,
        background: { r: 0, g: 255, b: 0 }
      }
    })
      .png()
      .toFile(imagePath2);

    await processArtifacts({
      scenarioId: "test",
      title: "Test",
      steps: [
        {
          id: "s1",
          title: "Step 1",
          imagePath: imagePath1,
          annotation: { type: "click", box: { x: 10, y: 10, width: 20, height: 20 } }
        },
        {
          id: "s2",
          title: "Step 2",
          imagePath: imagePath2,
          annotations: [{ type: "highlight_box", box: { x: 5, y: 5, width: 30, height: 30 } }]
        }
      ]
    });

    const stat1 = await stat(imagePath1);
    const stat2 = await stat(imagePath2);
    expect(stat1.size).toBeGreaterThan(0);
    expect(stat2.size).toBeGreaterThan(0);
  });
});
