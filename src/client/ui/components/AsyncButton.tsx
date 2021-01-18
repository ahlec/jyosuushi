import { noop } from "lodash";
import React, { useCallback, useState } from "react";

interface ComponentProps {
  children:
    | React.ReactElement
    | ((isPerforming: boolean) => React.ReactElement);

  /**
   * An optional CSS class name that will be included on the root <button />
   * element if provided.
   */
  className?: string;

  /**
   * A callback which will be invoked when the user has interacted with this
   * button by clicking on it (or a similar manner).
   *
   * This should return a promise which, until it is resolved or rejected, will
   * render this component in a loading state whereby it cannot be interacted
   * with.
   */
  onClick: () => Promise<void>;
}

function AsyncButton({
  children,
  className,
  onClick,
}: ComponentProps): React.ReactElement {
  // Define component state
  const [isPerforming, setIsPerforming] = useState<boolean>(false);

  // Handle events
  const handleClick = useCallback(async (): Promise<void> => {
    try {
      setIsPerforming(true);
      await onClick();
    } finally {
      setIsPerforming(false);
    }
  }, [onClick]);

  // Render the component
  return (
    <button
      className={className}
      disabled={isPerforming}
      onClick={isPerforming ? noop : handleClick}
    >
      {typeof children === "function" ? children(isPerforming) : children}
    </button>
  );
}

export default AsyncButton;
