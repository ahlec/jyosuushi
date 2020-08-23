import React from "react";
import { ConnectedComponent } from "react-redux";

export interface PageDefinition {
  component:
    | React.ComponentType
    | ConnectedComponent<React.ComponentType, unknown>;
  primaryPath: string;
  aliasPaths: readonly string[];
}
