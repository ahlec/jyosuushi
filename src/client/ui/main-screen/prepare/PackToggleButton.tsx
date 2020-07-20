import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

import { KeyCode } from "@jyosuushi/constants";
import { StudyPack } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";

import { getStudyPackLink } from "@jyosuushi/ui/main-screen/explore/pathing";

import CheckIcon from "@jyosuushi/ui/main-screen/check.svg";

import "./PackToggleButton.scss";

interface ComponentProps {
  isEnabled: boolean;
  localization: Localization;
  onToggle: () => void;
  pack: StudyPack;
}

function PackToggleButton({
  isEnabled,
  localization,
  onToggle,
  pack,
}: ComponentProps): React.ReactElement {
  // Handle events
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    switch (e.which) {
      case KeyCode.Enter:
      case KeyCode.Space: {
        onToggle();
        break;
      }
    }
  };

  // Render the component
  return (
    <div className="PackToggleButton">
      <div
        className={classnames("front", isEnabled && "checked")}
        onClick={onToggle}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={0}
      >
        <CheckIcon className="check" />
        <div className="name">{localization.studyPackName(pack)}</div>
        <div className="count">
          {localization.studyPackSize(pack.counters.length)}
        </div>
      </div>
      <Link className="view-details" to={getStudyPackLink(pack)}>
        View Details
      </Link>
    </div>
  );
}

export default PackToggleButton;
