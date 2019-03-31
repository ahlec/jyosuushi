import * as React from "react";
import { connect } from "react-redux";

import { AskNewQuestion } from "../../QuestionManager";
import { Answer, Question, QuizState, State } from "../../redux";

import AnswerInput from "./AnswerInput";
import QuestionDisplay from "./QuestionDisplay";
import ResultsView from "./ResultsView";
import ScoreBar from "./ScoreBar";

import "./index.scss";

interface ProvidedProps {
  askNewQuestion: AskNewQuestion;
  currentQuestion: Question;
}

interface ReduxProps {
  quizState: QuizState;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    quizState: state.quizState
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

interface ComponentState {
  lastQuestionCorrectAnswer: Answer | null;
}

class QuizPage extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState = {
    lastQuestionCorrectAnswer: null
  };

  public render() {
    const { askNewQuestion, currentQuestion, quizState } = this.props;
    const { lastQuestionCorrectAnswer } = this.state;
    if (quizState === "not-in-quiz") {
      return null;
    }

    return (
      <div className="QuestionPage">
        <ScoreBar />
        <QuestionDisplay currentQuestion={currentQuestion} />
        <AnswerInput
          askNewQuestion={askNewQuestion}
          currentQuestion={currentQuestion}
          enabled={quizState === "waiting-for-answer"}
          onAnswerSubmitted={this.onAnswerSubmitted}
        />
        {quizState === "reviewing-answer" && (
          <React.Fragment>
            <ResultsView
              currentQuestion={currentQuestion}
              usersCorrectAnswer={lastQuestionCorrectAnswer}
            />
            <button className="next-question" onClick={askNewQuestion}>
              Next Question!
            </button>
          </React.Fragment>
        )}
      </div>
    );
  }

  private onAnswerSubmitted = (usersCorrectAnswer: Answer | null) =>
    this.setState({ lastQuestionCorrectAnswer: usersCorrectAnswer });
}

export default connect(mapStateToProps)(QuizPage);
