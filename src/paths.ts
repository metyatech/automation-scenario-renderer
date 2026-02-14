import { dirname, isAbsolute, relative, resolve, sep } from "node:path";

export function toMarkdownAssetPath(
  assetPath: string,
  markdownPath: string,
): string {
  if (/^https?:\/\//.test(assetPath)) {
    return assetPath;
  }

  const markdownDir = dirname(resolve(markdownPath));
  const absoluteAssetPath = isAbsolute(assetPath)
    ? assetPath
    : resolve(assetPath);

  const relativePath = relative(markdownDir, absoluteAssetPath);
  return relativePath.split(sep).join("/");
}
