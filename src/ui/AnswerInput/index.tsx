import * as React from "react";
import { connect } from "react-redux";

import { HIRAGANA } from "../../japanese/kana";
import { AskNewQuestion } from "../../QuestionManager";
import { Question } from "../../redux";
import { markCorrectAnswer, markIncorrectAnswer } from "../../redux/actions";
import { Dispatch } from "../../redux/store";
import KanaInput from "./KanaInput";

import "./index.scss";

const KEY_ENTER = 13;

interface ProvidedProps {
  askNewQuestion: AskNewQuestion;
  currentQuestion: Question;
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
    return (
      <div className="AnswerInput" onKeyDown={this.onKeyDown}>
        <KanaInput kana={HIRAGANA} onChange={this.onChange} />
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
    const { dispatch } = this.props;
    const { value } = this.state;

    if (this.isCorrectAnswer(value)) {
      dispatch(markCorrectAnswer());
    } else {
      dispatch(markIncorrectAnswer());
    }
  }

  private isCorrectAnswer(value: string): boolean {
    const { currentQuestion } = this.props;
    for (const { kana, kanji } of currentQuestion.validAnswers) {
      if (kana === value || kanji === value) {
        return true;
      }
    }

    return false;
  }
}

export default connect()(AnswerInput);
