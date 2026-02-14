import type { VideoTimelineEvent } from "@metyatech/automation-scenario-spec";

export function buildFfmpegFilterGraph(events: VideoTimelineEvent[]): string {
  const filters: string[] = [];

  for (const event of events) {
    if (event.type === "click") {
      filters.push(
        `drawbox=x=${event.box.x}:y=${event.box.y}:w=${event.box.width}:h=${event.box.height}:color=red@0.9:t=4:enable='between(t,${event.startSeconds},${event.endSeconds})'`,
      );
      continue;
    }

    filters.push(
      `drawbox=x=${event.from.x - 10}:y=${event.from.y - 10}:w=20:h=20:color=red@0.9:t=fill:enable='between(t,${event.startSeconds},${event.endSeconds})'`,
    );
    filters.push(
      `drawbox=x=${event.to.x - 10}:y=${event.to.y - 10}:w=20:h=20:color=red@0.9:t=fill:enable='between(t,${event.startSeconds},${event.endSeconds})'`,
    );
    filters.push(
      `drawline=x1=${event.from.x}:y1=${event.from.y}:x2=${event.to.x}:y2=${event.to.y}:color=red@0.9:thickness=4:enable='between(t,${event.startSeconds},${event.endSeconds})'`,
    );
  }

  if (filters.length === 0) {
    return "null";
  }

  return filters.join(",");
}
