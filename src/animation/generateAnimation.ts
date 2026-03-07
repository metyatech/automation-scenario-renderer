import { spawn } from "node:child_process";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";

import type { AnimationConfig, StepArtifact } from "../types.js";

export async function generateAnimation(
  steps: StepArtifact[],
  outputPath: string,
  config: AnimationConfig,
): Promise<void> {
  const filtered = config.stepIds
    ? steps.filter((s) => config.stepIds!.includes(s.id))
    : steps;

  if (filtered.length === 0) {
    return;
  }

  const fps = config.fps ?? 10;
  const frameDuration = 1 / fps;

  const durations = filtered.map((step) => {
    if (
      typeof step.startedAtMs === "number" &&
      typeof step.endedAtMs === "number"
    ) {
      return Math.max(0.1, (step.endedAtMs - step.startedAtMs) / 1000);
    }
    return frameDuration;
  });

  if (config.maxDurationSeconds) {
    const total = durations.reduce((a, b) => a + b, 0);
    if (total > config.maxDurationSeconds) {
      const scale = config.maxDurationSeconds / total;
      for (let i = 0; i < durations.length; i++) {
        durations[i] = Math.max(0.05, durations[i] * scale);
      }
    }
  }

  const concatLines: string[] = [];
  for (let i = 0; i < filtered.length; i++) {
    const safePath = filtered[i].imagePath.replaceAll("\\", "/");
    concatLines.push(`file '${safePath.replaceAll("'", "'\\''")}'`);
    concatLines.push(`duration ${durations[i].toFixed(3)}`);
  }
  const lastPath = filtered[filtered.length - 1].imagePath.replaceAll(
    "\\",
    "/",
  );
  concatLines.push(`file '${lastPath.replaceAll("'", "'\\''")}'`);

  const concatFile = join(
    tmpdir(),
    `animation-concat-${Date.now()}-${Math.random().toString(36).slice(2)}.txt`,
  );

  try {
    await writeFile(concatFile, concatLines.join("\n"), "utf8");
    await mkdir(dirname(outputPath), { recursive: true });

    const args = buildFfmpegArgs(concatFile, outputPath, config.format, fps);
    await runCommand("ffmpeg", args);
  } finally {
    await unlink(concatFile).catch(() => {});
  }
}

function buildFfmpegArgs(
  concatFile: string,
  outputPath: string,
  format: "gif" | "webp",
  fps: number,
): string[] {
  const inputArgs = ["-y", "-f", "concat", "-safe", "0", "-i", concatFile];

  if (format === "gif") {
    return [
      ...inputArgs,
      "-vf",
      `fps=${fps},scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
      "-loop",
      "0",
      outputPath,
    ];
  }

  return [
    ...inputArgs,
    "-vf",
    `fps=${fps},scale=640:-1:flags=lanczos`,
    "-loop",
    "0",
    "-quality",
    "75",
    outputPath,
  ];
}

async function runCommand(command: string, args: string[]): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} failed (exit=${code ?? "unknown"})`));
      }
    });
  });
}
