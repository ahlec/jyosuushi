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

  // Render the component
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
        <button
          className={className}
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
