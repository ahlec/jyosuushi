import React from "react";

import { UserCounterCollection } from "@jyosuushi/interfaces";

export type PageComponentProps = {
  userCollections: readonly UserCounterCollection[];
};

export interface PageDefinition {
  component: React.ComponentType<PageComponentProps>;
  primaryPath: string;
  aliasPaths: readonly string[];
}
