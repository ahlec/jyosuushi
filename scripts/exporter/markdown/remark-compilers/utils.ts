export function isIndexableObject(
  obj: unknown
): obj is { [index: string]: unknown } {
  return typeof obj === "object" && obj !== null;
}
