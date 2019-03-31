import * as React from "react";
import { connect } from "react-redux";

import { AskNewQuestion } from "../../QuestionManager";
import { Question, QuizState, State } from "../../redux";

import HistoryPanel from "../HistoryPanel";
import PackSelection from "../shared/PackSelection";
import AnswerInput from "./AnswerInput";
import QuestionDisplay from "./QuestionDisplay";
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

class QuizPage extends React.PureComponent<ComponentProps> {
  public render() {
    const { askNewQuestion, currentQuestion, quizState } = this.props;
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
        />
        <HistoryPanel />
        <PackSelection />
      </div>
    );
  }
}

export default connect(mapStateToProps)(QuizPage);
