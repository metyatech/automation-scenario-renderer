import type { VideoTimelineEvent } from "../types.js";

export function buildFfmpegFilterGraph(events: VideoTimelineEvent[]): string {
  const filters: string[] = [];

  for (const event of events) {
    if (
      event.type === "click" ||
      event.type === "click_pulse" ||
      event.type === "highlight_box"
    ) {
      filters.push(
        `drawbox=x=${event.box.x}:y=${event.box.y}:w=${event.box.width}:h=${event.box.height}:color=red@0.9:t=4:enable='between(t,${event.startSeconds},${event.endSeconds})'`,
      );

      if (event.type === "click_pulse") {
        const pulseX = event.box.x + Math.floor(event.box.width / 2) - 12;
        const pulseY = event.box.y + Math.floor(event.box.height / 2) - 12;
        filters.push(
          `drawbox=x=${pulseX}:y=${pulseY}:w=24:h=24:color=red@0.6:t=3:enable='between(t,${event.startSeconds},${event.endSeconds})'`,
        );
      }
      continue;
    }

    if (event.type === "dragDrop" || event.type === "drag_arrow") {
      filters.push(
        `drawbox=x=${event.from.x - 10}:y=${event.from.y - 10}:w=20:h=20:color=red@0.9:t=fill:enable='between(t,${event.startSeconds},${event.endSeconds})'`,
      );
      filters.push(
        `drawbox=x=${event.to.x - 10}:y=${event.to.y - 10}:w=20:h=20:color=red@0.9:t=fill:enable='between(t,${event.startSeconds},${event.endSeconds})'`,
      );
      filters.push(
        `drawline=x1=${event.from.x}:y1=${event.from.y}:x2=${event.to.x}:y2=${event.to.y}:color=red@0.9:thickness=4:enable='between(t,${event.startSeconds},${event.endSeconds})'`,
      );
      continue;
    }

    if (event.type === "label") {
      const x = Math.floor(
        event.point?.x ?? (event.box ? event.box.x + event.box.width / 2 : 40),
      );
      const y = Math.floor(
        event.point?.y ?? (event.box ? Math.max(20, event.box.y - 12) : 40),
      );
      filters.push(
        `drawtext=text='${escapeDrawText(event.text)}':x=${x}:y=${y}:fontcolor=red:fontsize=32:borderw=2:bordercolor=black@0.7:enable='between(t,${event.startSeconds},${event.endSeconds})'`,
      );
    }
  }

  if (filters.length === 0) {
    return "null";
  }

  return filters.join(",");
}

function escapeDrawText(text: string): string {
  return text
    .replaceAll("\\", "\\\\")
    .replaceAll(":", "\\:")
    .replaceAll("'", "\\'")
    .replaceAll(",", "\\,")
    .replaceAll("[", "\\[")
    .replaceAll("]", "\\]")
    .replaceAll("%", "\\%")
    .replaceAll(">", "\\>");
}
