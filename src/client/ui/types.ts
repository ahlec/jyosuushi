import React from "react";

export type PageComponentProps = Record<string, never>;

export interface PageDefinition {
  component: React.ComponentType<PageComponentProps>;
  primaryPath: string;
  aliasPaths: readonly string[];
}
