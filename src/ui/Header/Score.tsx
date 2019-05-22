import { round } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";

import Localization from "../../localization";
import { Scorecard, State } from "../../redux";

import "./Score.scss";

interface ProvidedProps {
  localization: Localization;
}

interface ReduxProps {
  scorecard: Scorecard;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    scorecard: state.scorecard
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

const TOOLTIP_ID = "score-tooltip";

class Score extends React.PureComponent<ComponentProps> {
  public render() {
    const {
      localization,
      scorecard: { numCorrectAnswers, numIncorrectAnswers }
    } = this.props;
    const numAnswered = numCorrectAnswers + numIncorrectAnswers;
    if (numAnswered <= 0) {
      return <div className="Score" />;
    }

    const grade = round((numCorrectAnswers / numAnswered) * 100, 2);
    return (
      <div className="Score">
        <span className="anchor" data-tip data-for={TOOLTIP_ID}>
          {grade}%
        </span>
        <ReactTooltip id={TOOLTIP_ID} place="bottom" type="dark" effect="solid">
          {localization.xOfYCorrect(numCorrectAnswers, numAnswered)}
        </ReactTooltip>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Score);
