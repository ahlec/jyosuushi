import { noop, uniqueId } from "lodash";
import React, { useMemo } from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";
import ReactTooltip from "react-tooltip";

import * as styles from "./TooltipButton.scss";

interface ComponentProps {
  enabled: boolean;
  icon: SvgIcon;
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

  // Render this component
  return (
    <button className={styles.tooltipButton} onClick={enabled ? onClick : noop}>
      <Icon data-tip data-for={id} />
      <ReactTooltip id={id} place="bottom" type="dark" effect="solid">
        <FormattedMessage {...text} />
      </ReactTooltip>
    </button>
  );
}

export default TooltipButton;
