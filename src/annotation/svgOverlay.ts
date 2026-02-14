import type { AnnotationSpec } from "@metyatech/automation-scenario-spec";

export function buildSvgOverlay(
  width: number,
  height: number,
  annotation: AnnotationSpec,
): string {
  const base = [
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`,
    "<defs>",
    '<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">',
    '<polygon points="0 0, 10 3.5, 0 7" fill="#ff0000" />',
    "</marker>",
    "</defs>",
  ];

  if (annotation.type === "click") {
    base.push(
      `<rect x="${annotation.box.x}" y="${annotation.box.y}" width="${annotation.box.width}" height="${annotation.box.height}" fill="none" stroke="#ff0000" stroke-width="4" />`,
    );
  }

  if (annotation.type === "dragDrop") {
    base.push(
      `<circle cx="${annotation.from.x}" cy="${annotation.from.y}" r="12" fill="#ff0000" opacity="0.65" />`,
    );
    base.push(
      `<circle cx="${annotation.to.x}" cy="${annotation.to.y}" r="12" fill="#ff0000" opacity="0.65" />`,
    );
    base.push(
      `<line x1="${annotation.from.x}" y1="${annotation.from.y}" x2="${annotation.to.x}" y2="${annotation.to.y}" stroke="#ff0000" stroke-width="6" marker-end="url(#arrowhead)" />`,
    );
  }

  base.push("</svg>");
  return base.join("");
}
