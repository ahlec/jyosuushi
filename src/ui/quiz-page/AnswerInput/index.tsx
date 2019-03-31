import * as React from "react";
import { connect } from "react-redux";

import { HIRAGANA } from "../../../japanese/kana";
import { AskNewQuestion } from "../../../QuestionManager";
import { Answer, Question } from "../../../redux";
import { markCorrectAnswer, markIncorrectAnswer } from "../../../redux/actions";
import { Dispatch } from "../../../redux/store";
import KanaInput from "./KanaInput";

import "./index.scss";

const KEY_ENTER = 13;

interface ProvidedProps {
  askNewQuestion: AskNewQuestion;
  currentQuestion: Question;
  enabled: boolean;
  onAnswerSubmitted: (usersCorrectAnswer: Answer | null) => void;
}

type ComponentProps = ProvidedProps & { dispatch: Dispatch };

interface ComponentState {
  value: string;
  isValid: boolean;
}

class AnswerInput extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState = {
    isValid: false,
    value: ""
  };

  public render() {
    const { currentQuestion, enabled } = this.props;
    return (
      <div className="AnswerInput" onKeyDown={this.onKeyDown}>
        <KanaInput
          currentQuestion={currentQuestion}
          enabled={enabled}
          kana={HIRAGANA}
          onChange={this.onChange}
        />
      </div>
    );
  }

  private onChange = (value: string) => {
    this.setState({
      isValid: !!value && HIRAGANA.isOnlyKana(value),
      value
    });
  };

  private onKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === KEY_ENTER) {
      this.submit();
    }
  };

  private submit() {
    const { dispatch, onAnswerSubmitted } = this.props;
    const { value } = this.state;

    const correct = this.getCorrectAnswer(value);
    onAnswerSubmitted(correct);
    if (correct) {
      dispatch(markCorrectAnswer());
    } else {
      dispatch(markIncorrectAnswer());
    }
  }

  private getCorrectAnswer(value: string): Answer | null {
    const { currentQuestion } = this.props;
    for (const answer of currentQuestion.validAnswers) {
      if (answer.kana === value || answer.kanji === value) {
        return answer;
      }
    }

    return null;
  }
}

export default connect()(AnswerInput);
