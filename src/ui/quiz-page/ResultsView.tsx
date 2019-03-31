import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import { Answer, Question, State } from "../../redux";

import "./ResultsView.scss";

interface ProvidedProps {
  currentQuestion: Question;
  usersCorrectAnswer: Answer | null;
}

interface ReduxProps {}

function mapStateToProps(state: State): ReduxProps {
  return {};
}

type ComponentProps = ProvidedProps & ReduxProps;

class ResultsView extends React.PureComponent<ComponentProps> {
  public render() {
    const { usersCorrectAnswer } = this.props;
    const isCorrectAnswer = !!usersCorrectAnswer;
    return (
      <div className="ResultsView">
        <div
          className={classnames(
            "result-bubble",
            isCorrectAnswer ? "correct" : "incorrect"
          )}
        >
          {isCorrectAnswer ? (
            <ruby>
              <rt>せいかい</rt>
            </ruby>
          ) : (
            <ruby>
              <rt>ふせいかい</rt>
            </ruby>
          )}
        </div>
        <div className="info">
          <h3>{isCorrectAnswer ? "Correct!" : "Not quite right..."}</h3>
          <p>
            Here are all of the possible answers based on the sets you have
            enabled:
          </p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ResultsView);
