import { round } from "lodash";
import classnames from "classnames";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";

import { State } from "@jyosuushi/redux";

import * as styles from "./Score.scss";

interface ComponentProps {
  className: string;
}

const TOOLTIP_ID = "score-tooltip";

const INTL_MESSAGES = defineMessages({
  xOfYCorrect: {
    defaultMessage: "{x} / {y} correct",
    id: "header.score.xOfYCorrect",
  },
});

function Score({ className }: ComponentProps): React.ReactElement {
  // Connect to the rest of the application
  const numCorrectAnswers = useSelector(
    (state: State) => state.scorecard.numCorrectAnswers
  );
  const numIncorrectAnswers = useSelector(
    (state: State) => state.scorecard.numIncorrectAnswers
  );

  // Don't render contents if we haven't answered anything yet.
  const numAnswered = numCorrectAnswers + numIncorrectAnswers;
  if (numAnswered <= 0) {
    return <div className={classnames(styles.score, className)} />;
  }

  // Render the current score
  const grade = round((numCorrectAnswers / numAnswered) * 100, 2);
  return (
    <div className={classnames(styles.score, className)}>
      <span className="anchor" data-tip data-for={TOOLTIP_ID}>
        {grade}%
      </span>
      <ReactTooltip id={TOOLTIP_ID} place="bottom" type="dark" effect="solid">
        <FormattedMessage
          {...INTL_MESSAGES.xOfYCorrect}
          values={{
            x: numCorrectAnswers,
            y: numAnswered,
          }}
        />
      </ReactTooltip>
    </div>
  );
}

export default Score;
