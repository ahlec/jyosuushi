export type Tag =
  | "ippyaku"
  | "hyaku"
  | "counter-wa-4-yo"
  | "counter-wa-4-ba"
  | "counter-wa-6-8-full-num"
  | "counter-wa-6-8-pa"
  | "counter-wa-6-8-small-tsu"
  | "counter-wa-6-8-wa";

const TAG_INCOMPATIBILITIES: { [tag in Tag]: ReadonlySet<Tag> } = {
  "counter-wa-4-ba": new Set<Tag>(["counter-wa-4-yo"]),
  "counter-wa-4-yo": new Set<Tag>(["counter-wa-4-ba"]),
  "counter-wa-6-8-full-num": new Set<Tag>(["counter-wa-6-8-pa"]),
  "counter-wa-6-8-pa": new Set<Tag>(["counter-wa-6-8-full-num"]),
  "counter-wa-6-8-small-tsu": new Set<Tag>(["counter-wa-6-8-wa"]),
  "counter-wa-6-8-wa": new Set<Tag>(["counter-wa-6-8-small-tsu"]),
  hyaku: new Set<Tag>(["ippyaku"]),
  ippyaku: new Set<Tag>(["hyaku"])
};

function checkCompatibility(
  source: ReadonlySet<Tag>,
  other: ReadonlySet<Tag>
): boolean {
  for (const tag of source) {
    const incompatibilities = TAG_INCOMPATIBILITIES[tag];
    for (const incompatibility of incompatibilities) {
      if (other.has(incompatibility)) {
        return false;
      }
    }
  }

  return true;
}

export function areTagsCompatible(
  first: ReadonlySet<Tag>,
  second: ReadonlySet<Tag>
): boolean {
  return checkCompatibility(first, second) && checkCompatibility(second, first);
}
