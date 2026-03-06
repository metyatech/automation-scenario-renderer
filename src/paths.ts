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

export function toBaseUrlAssetPath(
  assetPath: string,
  outputDir: string,
  baseUrl: string,
): string {
  if (/^https?:\/\//.test(assetPath)) {
    return assetPath;
  }

  const absoluteAssetPath = isAbsolute(assetPath)
    ? assetPath
    : resolve(assetPath);
  const absoluteOutputDir = resolve(outputDir);

  const relativePath = relative(absoluteOutputDir, absoluteAssetPath);
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return `${normalizedBase}/${relativePath.split(sep).join("/")}`;
}
