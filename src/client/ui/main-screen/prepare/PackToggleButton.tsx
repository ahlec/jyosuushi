import classnames from "classnames";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { KeyCode } from "@jyosuushi/constants";
import { StudyPack } from "@jyosuushi/interfaces";

import useLocale from "@jyosuushi/i18n/useLocale";

import { getStudyPackLink } from "@jyosuushi/ui/main-screen/explore/pathing";

import CheckIcon from "@jyosuushi/ui/main-screen/check.svg";

import styles from "./PackToggleButton.scss";

interface ComponentProps {
  isEnabled: boolean;
  onToggle: (pack: StudyPack) => void;
  pack: StudyPack;
}

const INTL_MESSAGES = defineMessages({
  packSize: {
    defaultMessage: "{size, plural, one {# counter} other {# counters}}",
    id: "preparePage.PackToggleButton.studyPackSizeLabel",
  },
  viewPackContentsLink: {
    defaultMessage: "View Details",
    id: "preparePage.PackToggleButton.viewPackContentsLink",
  },
});

function PackToggleButton({
  isEnabled,
  onToggle,
  pack,
}: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const locale = useLocale();

  // Handle events
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    switch (e.which) {
      case KeyCode.Enter:
      case KeyCode.Space: {
        onToggle(pack);
        break;
      }
    }
  };

  const handleClick = () => onToggle(pack);

  // Render the component
  return (
    <div className={styles.packToggleButton}>
      <div
        className={classnames(styles.front, isEnabled && styles.checked)}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={0}
      >
        <CheckIcon className={styles.check} />
        <div className={styles.name}>
          {locale.dataLocalizers.getStudyPackName(pack)}
        </div>
        <FormattedMessage
          {...INTL_MESSAGES.packSize}
          values={{ size: pack.counters.length }}
          tagName="div"
        />
      </div>
      <Link className={styles.viewDetails} to={getStudyPackLink(pack)}>
        <FormattedMessage {...INTL_MESSAGES.viewPackContentsLink} />
      </Link>
    </div>
  );
}

export default PackToggleButton;
