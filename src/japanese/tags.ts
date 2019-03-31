export type Tag = "ippyaku" | "hyaku";

const TAG_INCOMPATIBILITIES: { [tag in Tag]: ReadonlySet<Tag> } = {
  ippyaku: new Set<Tag>(["hyaku"]),
  hyaku: new Set<Tag>(["ippyaku"])
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
