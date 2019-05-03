import { round } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { Scorecard, State } from "../../redux";

import "./index.scss";

interface ComponentProps {
  scorecard: Scorecard;
}

function mapStateToProps(state: State): ComponentProps {
  return {
    scorecard: state.scorecard
  };
}

class Score extends React.PureComponent<ComponentProps> {
  public render() {
    const {
      scorecard: { numCorrectAnswers, numIncorrectAnswers }
    } = this.props;
    const numAnswered = numCorrectAnswers + numIncorrectAnswers;
    const grade = round((numCorrectAnswers / numAnswered) * 100, 2);

    return (
      <div className="score">
        {numCorrectAnswers} / {numAnswered} ({grade}%)
      </div>
    );
  }
}

export default connect(mapStateToProps)(Score);
