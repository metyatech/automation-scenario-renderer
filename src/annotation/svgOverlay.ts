import type { AnnotationSpec } from "../types.js";

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

  if (
    annotation.type === "click" ||
    annotation.type === "click_pulse" ||
    annotation.type === "highlight_box"
  ) {
    base.push(
      `<rect x="${annotation.box.x}" y="${annotation.box.y}" width="${annotation.box.width}" height="${annotation.box.height}" fill="none" stroke="#ff0000" stroke-width="4" />`,
    );
  }

  if (annotation.type === "click_pulse") {
    const centerX = annotation.box.x + annotation.box.width / 2;
    const centerY = annotation.box.y + annotation.box.height / 2;
    const radius = Math.max(annotation.box.width, annotation.box.height) / 2;
    base.push(
      `<circle id="pulseRing" cx="${centerX}" cy="${centerY}" r="${radius}" fill="none" stroke="#ff0000" stroke-width="4" opacity="0.8"><animate attributeName="r" values="${radius * 0.8};${radius * 1.4}" dur="1s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.9;0.15" dur="1s" repeatCount="indefinite" /></circle>`,
    );
  }

  if (annotation.type === "dragDrop" || annotation.type === "drag_arrow") {
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

  if (annotation.type === "label") {
    const anchorX =
      annotation.point?.x ??
      (annotation.box ? annotation.box.x + annotation.box.width / 2 : 24);
    const anchorY =
      annotation.point?.y ??
      (annotation.box ? Math.max(20, annotation.box.y - 12) : 40);
    const text = escapeXml(annotation.text);
    base.push(
      `<text x="${anchorX}" y="${anchorY}" fill="#ff0000" font-size="28" font-family="sans-serif" font-weight="700">${text}</text>`,
    );
  }

  base.push("</svg>");
  return base.join("");
}

function escapeXml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
