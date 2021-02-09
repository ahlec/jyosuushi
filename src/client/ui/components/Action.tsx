import classnames from "classnames";
import { LocationDescriptorObject } from "history";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

type ButtonClickFn = () => void | Promise<void>;

export type ActionDefinition =
  | {
      variant: "link";
      to: LocationDescriptorObject;
    }
  | {
      variant: "button";
      onClick: ButtonClickFn;
    };

export interface ActionClassNames {
  /**
   * A CSS class name that will always be included on the root of the element
   * rendered.
   */
  always?: string;

  /**
   * A CSS class name that will only be included on the root of the button
   * variant while the `onClick` function is being invoked and until the
   * promise (if it's asynchronous) resolves.
   */
  whileProcessing?: string;
}

interface ComponentProps {
  children: React.ReactNode;
  className?: ActionClassNames | string;
  definition: ActionDefinition;
}

function Action({
  children,
  className,
  definition,
}: ComponentProps): React.ReactElement {
  // Define component state
  const [isProcessingClick, setIsProcessingClick] = useState<boolean>(false);

  // Handle events
  let onClick: null | ButtonClickFn;
  switch (definition.variant) {
    case "link": {
      onClick = null;
      break;
    }
    case "button": {
      onClick = definition.onClick;
      break;
    }
  }

  const handleClick = useCallback(async (): Promise<void> => {
    if (!onClick) {
      return;
    }

    setIsProcessingClick(true);
    try {
      await onClick();
    } finally {
      setIsProcessingClick(false);
    }
  }, [onClick]);

  // Determine the current CSS class names
  let resolvedClassName: string | undefined;
  if (className) {
    if (typeof className === "string") {
      resolvedClassName = className;
    } else {
      resolvedClassName = classnames(
        className.always,
        definition.variant === "button" &&
          isProcessingClick &&
          className.whileProcessing
      );
    }
  }

  // Render the component
  switch (definition.variant) {
    case "link": {
      return (
        <Link className={resolvedClassName} to={definition.to}>
          {children}
        </Link>
      );
    }
    case "button": {
      return (
        <button
          className={resolvedClassName}
          disabled={isProcessingClick}
          onClick={handleClick}
        >
          {children}
        </button>
      );
    }
  }
}

export default Action;
