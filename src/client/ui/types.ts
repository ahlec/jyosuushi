import React from "react";

import {
  UserCounterCollection,
  UserCounterCollectionManager,
} from "@jyosuushi/interfaces";

export type PageComponentProps = {
  userCollections: readonly UserCounterCollection[];
  userCollectionsManager: UserCounterCollectionManager;
};

export interface PageDefinition {
  component: React.ComponentType<PageComponentProps>;
  primaryPath: string;
  aliasPaths: readonly string[];
}
