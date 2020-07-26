import { uniqueId } from "lodash";
import React, { useMemo } from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";
import ReactTooltip from "react-tooltip";

import { KeyCode } from "@jyosuushi/constants";

import styles from "./TooltipButton.scss";

interface ComponentProps {
  enabled: boolean;
  icon: React.ComponentClass<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
  text: MessageDescriptor;
}

function TooltipButton({
  enabled,
  icon: Icon,
  onClick,
  text,
}: ComponentProps): React.ReactElement {
  // Use a unique ID for this instance of the TooltipButton, since we need to rely on
  // DOM `id` attribute which requires global uniqueness.
  const id = useMemo(() => uniqueId("tb-"), []);

  // Handle events
  const handleClick = (): void => onClick();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (!enabled) {
      return;
    }

    switch (e.which) {
      case KeyCode.Enter:
      case KeyCode.Space: {
        onClick();
        break;
      }
    }
  };

  // Render this component
  return (
    <div
      className={styles.tooltipButton}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      <Icon data-tip data-for={id} />
      <FormattedMessage {...text}>
        {(localizedText) => (
          <ReactTooltip id={id} place="bottom" type="dark" effect="solid">
            {localizedText}
          </ReactTooltip>
        )}
      </FormattedMessage>
    </div>
  );
}

export default TooltipButton;
