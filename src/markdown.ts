import { generateMermaidFlowchart } from "./mermaid.js";
import type { RelatedScenario, RunArtifacts } from "./types.js";

export function generateMarkdown(artifacts: {
  scenarioId: string;
  title: string;
  steps: RunArtifacts["steps"];
  videoPath?: string;
  relatedScenarios?: RelatedScenario[];
}): string {
  const lines: string[] = [];
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

function toMarkdownPath(pathValue: string): string {
  return pathValue.replaceAll("\\", "/");
}
