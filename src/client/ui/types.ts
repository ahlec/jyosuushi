import React from "react";
import { ConnectedComponent } from "react-redux";
import { RouteComponentProps } from "react-router";

type ValidComponent<TProps> =
  | React.ComponentType<TProps>
  | ConnectedComponent<React.ComponentType<TProps & any>, unknown>;

export interface PageDefinition {
  component: ValidComponent<Partial<RouteComponentProps>>;
  primaryPath: string;
  aliasPaths: readonly string[];
}
