export function isIndexableObject(
  obj: unknown,
): obj is { [index: string]: unknown } {
  return typeof obj === "object" && obj !== null;
}

export function isStringOrUndefined(obj: unknown): obj is string | undefined {
  return typeof obj === "undefined" || typeof obj === "string";
}

export function isArrayOf<T>(
  obj: unknown,
  elementTypeGuard: (val: unknown) => val is T,
): obj is T[] {
  if (!obj || !Array.isArray(obj)) {
    return false;
  }

  if (obj.some((el) => !elementTypeGuard(el))) {
    return false;
  }

  return true;
}
