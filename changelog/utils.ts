import { ChangelogVersion, FirstVersion } from "./types";

export function isFirstVersion(
  version: ChangelogVersion
): version is FirstVersion {
  return "isInitialRelease" in version && version.isInitialRelease === true;
}
