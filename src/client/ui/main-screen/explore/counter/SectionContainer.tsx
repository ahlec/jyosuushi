import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import TooltipButton from "@jyosuushi/ui/components/TooltipButton";

import styles from "./SectionContainer.scss";

export interface SectionActionDefinition {
  /**
   * The icon that should be rendered as the inline contents of this button.
   */
  icon: SvgIcon;

  /**
   * A callback that should be invoked when the user has interacted with this
   * button.
   */
  onClick: () => void;

  /**
   * The localized text descriptor that will be displayed in the tooltip that
   * appears when the user has hovered over this button.
   */
  tooltip: MessageDescriptor;

  /**
   * A string that uniquely identifies this action and can be used for
   * performance optimizations such as React keys (when diffing two arrays of
   * actions).
   */
  uniqueId: string;
}

interface ComponentProps {
  /**
   * An ordered array of actions that should be displayed in the header
   * that the user can interact with to perform various section-specific tasks.
   */
  actions: readonly SectionActionDefinition[];

  children: React.ReactElement | readonly React.ReactElement[];

  /**
   * A localized text descriptor to display as the header for this section.
   */
  header: MessageDescriptor;
}

function SectionContainer({
  actions,
  children,
  header,
}: ComponentProps): React.ReactElement {
  // Render the component
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.header}>
        <FormattedMessage {...header} />
        {actions.length > 0 && (
          <div className={styles.actions}>
            {actions.map(
              (action): React.ReactElement => (
                <TooltipButton
                  key={action.uniqueId}
                  enabled={true}
                  icon={action.icon}
                  onClick={action.onClick}
                  text={action.tooltip}
                />
              )
            )}
          </div>
        )}
      </div>
      <div className={styles.contents}>{children}</div>
    </div>
  );
}

export default SectionContainer;
