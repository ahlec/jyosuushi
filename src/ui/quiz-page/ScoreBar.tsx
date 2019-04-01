import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Counter, CountersState, Scorecard, State } from "../../redux";

import "./ScoreBar.scss";

interface ComponentProps {
  counters: CountersState;
  scorecard: Scorecard;
}

function mapStateToProps(state: State): ComponentProps {
  return {
    counters: state.counters,
    scorecard: state.scorecard
  };
}

class ScoreBar extends React.PureComponent<ComponentProps> {
  public render() {
    const {
      counters,
      scorecard: { mostMissedCounterId, numQuestionsAsked, numCorrectAnswers }
    } = this.props;

    if (numQuestionsAsked === 0) {
      return (
        <div className="ScoreBar">
          <div className="item">
            <strong>Good luck!</strong> Once you've answered your first
            question, I'll show your score here.
          </div>
        </div>
      );
    }

    return (
      <div className="ScoreBar">
        <div className={classnames("item", mostMissedCounterId && "left")}>
          <strong>Score:</strong> {numCorrectAnswers} / {numQuestionsAsked} (
          {Math.floor((numCorrectAnswers / numQuestionsAsked) * 100)}
          %)
        </div>
        {mostMissedCounterId && (
          <div className="item right">
            <strong>Most Missed Counter:</strong>{" "}
            {this.renderCounter(counters[mostMissedCounterId].counter)}
          </div>
        )}
      </div>
    );
  }

  private renderCounter(counter: Counter) {
    return (
      <span>
        {counter.kanji ? (
          <React.Fragment>
            {counter.kanji}【{counter.kana}】
          </React.Fragment>
        ) : (
          counter.kana
        )}{" "}
        ({counter.name})
      </span>
    );
  }
}

export default connect(mapStateToProps)(ScoreBar);
