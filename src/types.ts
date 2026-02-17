export type Point = {
  x: number;
  y: number;
};

export type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type AnnotationSpec =
  | {
      type: "click";
      box: Box;
    }
  | {
      type: "click_pulse";
      box: Box;
    }
  | {
      type: "highlight_box";
      box: Box;
    }
  | {
      type: "dragDrop";
      from: Point;
      to: Point;
    }
  | {
      type: "drag_arrow";
      from: Point;
      to: Point;
    }
  | {
      type: "label";
      text: string;
      point?: Point;
      box?: Box;
    };

export type StepArtifact = {
  id: string;
  title: string;
  description?: string;
  imagePath: string;
  annotation?: AnnotationSpec;
  annotations?: AnnotationSpec[];
  startedAtMs?: number;
  endedAtMs?: number;
};

export type RunArtifacts = {
  scenarioId: string;
  title: string;
  steps: StepArtifact[];
  videoPath?: string;
  rawVideoPath?: string;
};

export type VideoTimelineEvent =
  | {
      type: "click";
      startSeconds: number;
      endSeconds: number;
      box: Box;
    }
  | {
      type: "click_pulse";
      startSeconds: number;
      endSeconds: number;
      box: Box;
    }
  | {
      type: "highlight_box";
      startSeconds: number;
      endSeconds: number;
      box: Box;
    }
  | {
      type: "dragDrop";
      startSeconds: number;
      endSeconds: number;
      from: Point;
      to: Point;
    }
  | {
      type: "drag_arrow";
      startSeconds: number;
      endSeconds: number;
      from: Point;
      to: Point;
    }
  | {
      type: "label";
      startSeconds: number;
      endSeconds: number;
      text: string;
      point?: Point;
      box?: Box;
    };
