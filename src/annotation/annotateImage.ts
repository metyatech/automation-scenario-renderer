import sharp from "sharp";

import type { AnnotationSpec } from "../types.js";
import { buildSvgOverlay } from "./svgOverlay.js";

export async function annotateImage(
  imagePath: string,
  annotation: AnnotationSpec,
): Promise<void> {
  const image = sharp(imagePath);
  const metadata = await image.metadata();

  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;
  if (!width || !height) {
    throw new Error(
      `Could not read image dimensions for annotation: ${imagePath}`,
    );
  }

  const overlay = Buffer.from(buildSvgOverlay(width, height, annotation));

  const rendered = await image
    .composite([
      {
        input: overlay,
        top: 0,
        left: 0,
      },
    ])
    .toBuffer();

  await sharp(rendered).toFile(imagePath);
}
