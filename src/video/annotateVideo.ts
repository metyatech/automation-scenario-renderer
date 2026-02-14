import { spawn } from "node:child_process";

import type { VideoTimelineEvent } from "@metyatech/automation-scenario-spec";
import { buildFfmpegFilterGraph } from "./ffmpegFilters.js";

export async function annotateVideo(
  inputPath: string,
  outputPath: string,
  events: VideoTimelineEvent[],
): Promise<void> {
  const filter = buildFfmpegFilterGraph(events);

  await runCommand(
    "ffmpeg",
    ["-y", "-i", inputPath, "-vf", filter, "-codec:a", "copy", outputPath],
    `ffmpeg failed while creating annotated video: ${outputPath}`,
  );
}

async function runCommand(
  command: string,
  args: string[],
  errorMessage: string,
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${errorMessage} (exit=${code ?? "unknown"})`));
      }
    });
  });
}
