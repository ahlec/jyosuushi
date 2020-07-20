import React from "react";
import ReactTooltip from "react-tooltip";

import { KeyCode } from "@jyosuushi/constants";

import styles from "./TooltipButton.scss";

interface ComponentProps {
  enabled: boolean;
  icon: React.ComponentClass<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
  text: string;
}

function TooltipButton({
  enabled,
  icon: Icon,
  onClick,
  text,
}: ComponentProps): React.ReactElement {
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
  const id = `tb-${text}`;
  return (
    <div
      className={styles.tooltipButton}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      <Icon data-tip data-for={id} />
      <ReactTooltip id={id} place="bottom" type="dark" effect="solid">
        {text}
      </ReactTooltip>
    </div>
  );
}

export default TooltipButton;
