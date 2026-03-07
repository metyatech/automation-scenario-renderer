import { generateMermaidFlowchart } from "./mermaid.js";
import type { RelatedScenario, RunArtifacts, StepArtifact } from "./types.js";

export function generateMarkdown(artifacts: {
  scenarioId: string;
  title: string;
  steps: RunArtifacts["steps"];
  videoPath?: string;
  animationPath?: string;
  relatedScenarios?: RelatedScenario[];
}): string {
  const lines: string[] = [];

  const frontmatter = buildFrontmatter(artifacts.steps);
  if (frontmatter) {
    lines.push("---");
    lines.push(frontmatter);
    lines.push("---");
    lines.push("");
  }

  lines.push(`# ${artifacts.title}`);
  lines.push("");
  lines.push(`<!-- scenario_id: ${artifacts.scenarioId} -->`);
  lines.push("");

  if (artifacts.videoPath) {
    lines.push(`<video controls preload="metadata" style="max-width:100%">`);
    lines.push(
      `  <source src="${toMarkdownPath(artifacts.videoPath)}" type="video/mp4">`,
    );
    lines.push(`</video>`);
    lines.push("");
  }

  if (artifacts.animationPath) {
    lines.push(
      `![${artifacts.title}](${toMarkdownPath(artifacts.animationPath)})`,
    );
    lines.push("");
  }

  if (artifacts.steps.length > 1) {
    lines.push(generateMermaidFlowchart(artifacts.steps));
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

  if (artifacts.relatedScenarios && artifacts.relatedScenarios.length > 0) {
    lines.push("## 関連ガイド");
    lines.push("");
    for (const related of artifacts.relatedScenarios) {
      const label = related.label ?? related.scenarioId;
      lines.push(`- [${label}](./${related.scenarioId}.md)`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function buildFrontmatter(steps: StepArtifact[]): string | undefined {
  if (steps.length === 0) {
    return undefined;
  }

  const stepCount = steps.length;
  const difficulty = computeDifficulty(stepCount);
  const timeEstimate = computeTimeEstimate(steps);

  const entries: string[] = [];
  entries.push(`stepCount: ${stepCount}`);
  entries.push(`difficulty: ${difficulty}`);
  if (timeEstimate) {
    entries.push(`timeEstimate: "${timeEstimate}"`);
  }

  return entries.join("\n");
}

export function computeDifficulty(
  stepCount: number,
): "Easy" | "Normal" | "Hard" {
  if (stepCount <= 3) {
    return "Easy";
  }
  if (stepCount <= 8) {
    return "Normal";
  }
  return "Hard";
}

export function computeTimeEstimate(steps: StepArtifact[]): string | undefined {
  const timedSteps = steps.filter(
    (s) => typeof s.startedAtMs === "number" && typeof s.endedAtMs === "number",
  );

  if (timedSteps.length === 0) {
    return estimateFromStepCount(steps.length);
  }

  const totalMs = timedSteps.reduce(
    (sum, s) => sum + (s.endedAtMs! - s.startedAtMs!),
    0,
  );
  const totalSeconds = totalMs / 1000;

  if (totalSeconds < 60) {
    return "1分以内";
  }
  if (totalSeconds < 300) {
    return `約${Math.ceil(totalSeconds / 60)}分`;
  }
  if (totalSeconds < 3600) {
    const minutes = Math.round(totalSeconds / 60);
    return `約${minutes}分`;
  }
  const hours = (totalSeconds / 3600).toFixed(1);
  return `約${hours}時間`;
}

function estimateFromStepCount(count: number): string | undefined {
  if (count <= 2) {
    return "5分以内";
  }
  if (count <= 5) {
    return "5〜15分";
  }
  if (count <= 10) {
    return "15〜30分";
  }
  return "30分以上";
}

function toMarkdownPath(pathValue: string): string {
  return pathValue.replaceAll("\\", "/");
}
