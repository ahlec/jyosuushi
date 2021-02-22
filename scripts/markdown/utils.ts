import { HastNode } from "./types";

export function isIndexableObject(
  obj: unknown
): obj is { [index: string]: unknown } {
  return typeof obj === "object" && obj !== null;
}

export function isNodeFootnotesContainer(node: HastNode): boolean {
  if (node.type !== "element") {
    return false;
  }

  if (node.tagName !== "div") {
    return false;
  }

  if (!node.properties) {
    return false;
  }

  const { className } = node.properties;
  if (!Array.isArray(className) || !className.length) {
    return false;
  }

  return className[0] === "footnotes";
}
