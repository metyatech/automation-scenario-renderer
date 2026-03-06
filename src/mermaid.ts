import type { RunArtifacts } from "./types.js";

export function generateMermaidFlowchart(steps: RunArtifacts["steps"]): string {
  if (steps.length === 0) return "";

  const lines: string[] = ["```mermaid", "graph TD"];

  steps.forEach((step, index) => {
    const nodeId = `step${index}`;
    const label = escapeLabel(step.title);
    lines.push(`  ${nodeId}["${label}"]`);

    if (index > 0) {
      lines.push(`  step${index - 1} --> ${nodeId}`);
    }
  });

  lines.push("```");
  return lines.join("\n");
}

function escapeLabel(text: string): string {
  return text
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
