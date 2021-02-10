export interface ConsumerFacingEntry {
  label: string;
  details: string;
  nestedListItems?: readonly string[];
}

export type BugFixBrowser = "chrome" | "firefox" | "safari" | "edge" | "ie";

export interface BugFixEntry {
  browser?: BugFixBrowser;
  text: string;
}

export interface IncrementalVersion {
  date: string;
  version: string;
  comments?: string;
  bugFixes: readonly BugFixEntry[];
  newFeatures: readonly ConsumerFacingEntry[];
  improvements: readonly ConsumerFacingEntry[];
  developerChanges: readonly string[];
}

export interface FirstVersion {
  version: string;
  date: string;
  isInitialRelease: true;
}

export type ChangelogVersion = Readonly<FirstVersion | IncrementalVersion>;
