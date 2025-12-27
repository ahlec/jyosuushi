import { ChangelogVersion, FirstVersion } from "./types";

export function isFirstVersion(
  version: ChangelogVersion,
): version is Readonly<FirstVersion> {
  return "isInitialRelease" in version && version.isInitialRelease === true;
}
