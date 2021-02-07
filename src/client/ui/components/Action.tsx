import { LocationDescriptorObject } from "history";
import React from "react";
import { Link } from "react-router-dom";

export type ActionDefinition =
  | {
      variant: "link";
      to: LocationDescriptorObject;
    }
  | {
      variant: "button";
      onClick: () => void | Promise<void>;
    };

interface ComponentProps {
  children: React.ReactNode;
  className?: string;
  definition: ActionDefinition;
}

function Action({
  children,
  className,
  definition,
}: ComponentProps): React.ReactElement {
  switch (definition.variant) {
    case "link": {
      return (
        <Link className={className} to={definition.to}>
          {children}
        </Link>
      );
    }
    case "button": {
      return (
        <button className={className} onClick={definition.onClick}>
          {children}
        </button>
      );
    }
  }
}

export default Action;
