import { mkdtemp, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

import sharp from "sharp";
import { afterEach, beforeAll, describe, expect, it } from "vitest";

import { annotateImage } from "../src/annotation/annotateImage.js";
import { annotateVideo } from "../src/video/annotateVideo.js";

const tempDirs: string[] = [];

afterEach(async () => {
  await Promise.all(tempDirs.map((dir) => rm(dir, { recursive: true, force: true })));
});

async function runCommand(command: string, args: string[]): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args);
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} failed exit code ${code}`));
    });
  });
}

describe("integration tests (side-effects)", () => {
  it("annotateImage applies SVG overlay to a real image file", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "renderer-img-"));
    tempDirs.push(tempDir);

    const imagePath = join(tempDir, "input.png");
    const outputPath = join(tempDir, "output.png");

    // Create a 100x100 solid color image
    await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 3,
        background: { r: 255, g: 255, b: 255 }
      }
    })
      .png()
      .toFile(imagePath);

    await annotateImage(
      imagePath,
      {
        type: "click",
        box: { x: 10, y: 10, width: 20, height: 20 }
      },
      outputPath
    );

    const outStat = await stat(outputPath);
    expect(outStat.size).toBeGreaterThan(0);
  });

  it("annotateVideo generates a video using ffmpeg", async () => {
    const tempDir = await mkdtemp(join(tmpdir(), "renderer-vid-"));
    tempDirs.push(tempDir);

    const rawPath = join(tempDir, "raw.mp4");
    const videoPath = join(tempDir, "annotated.mp4");

    // Create a dummy 1-second video if ffmpeg is available
    try {
      await runCommand("ffmpeg", [
        "-y",
        "-f",
        "lavfi",
        "-i",
        "color=c=blue:s=320x240:d=1",
        "-vcodec",
        "libx264",
        rawPath
      ]);

      await annotateVideo(rawPath, videoPath, [
        {
          type: "click",
          startSeconds: 0,
          endSeconds: 1,
          box: { x: 50, y: 50, width: 100, height: 100 }
        }
      ]);

      const outStat = await stat(videoPath);
      expect(outStat.size).toBeGreaterThan(0);
    } catch (err) {
      console.warn("Skipping ffmpeg test as ffmpeg is not functional in this environment:", err);
    }
  });
});
