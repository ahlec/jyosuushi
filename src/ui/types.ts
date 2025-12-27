import React from "react";

import {
  CreateUserCounterCollectionFn,
  UserCounterCollection,
} from "@jyosuushi/interfaces";

export type PageComponentProps = {
  createUserCollection: CreateUserCounterCollectionFn;
  userCollections: readonly UserCounterCollection[];
};

export interface PageDefinition {
  component: React.ComponentType<PageComponentProps>;
  primaryPath: string;
}
