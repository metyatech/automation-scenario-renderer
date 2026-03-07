import { describe, expect, it } from "vitest";

import { generateAnimation } from "../src/animation/generateAnimation.js";
import type { AnimationConfig, StepArtifact } from "../src/types.js";

describe("generateAnimation", () => {
  it("does nothing when steps array is empty", async () => {
    await expect(
      generateAnimation([], "/tmp/out.gif", { format: "gif" }),
    ).resolves.toBeUndefined();
  });

  it("filters steps by stepIds when provided", async () => {
    const steps: StepArtifact[] = [
      { id: "a", title: "A", imagePath: "/tmp/a.png" },
      { id: "b", title: "B", imagePath: "/tmp/b.png" },
    ];
    const config: AnimationConfig = {
      format: "gif",
      stepIds: ["nonexistent"],
    };

    await expect(
      generateAnimation(steps, "/tmp/out.gif", config),
    ).resolves.toBeUndefined();
  });
});
