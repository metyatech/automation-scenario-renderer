import type { RunArtifacts } from "@metyatech/automation-scenario-spec";

export function generateMarkdown(artifacts: {
  scenarioId: string;
  title: string;
  steps: RunArtifacts["steps"];
  videoPath?: string;
}): string {
  const lines: string[] = [];
  lines.push(`# ${artifacts.title}`);
  lines.push("");
  lines.push(`Scenario ID: \`${artifacts.scenarioId}\``);
  lines.push("");

  if (artifacts.videoPath) {
    lines.push(`[操作動画](${toMarkdownPath(artifacts.videoPath)})`);
    lines.push("");
  }

  artifacts.steps.forEach((step, index) => {
    lines.push(`## ${index + 1}. ${step.title}`);
    lines.push("");
    if (step.description) {
      lines.push(step.description);
      lines.push("");
    }
    lines.push(`![${step.title}](${toMarkdownPath(step.imagePath)})`);
    lines.push("");
  });

  return lines.join("\n");
}

function toMarkdownPath(pathValue: string): string {
  return pathValue.replaceAll("\\", "/");
}
