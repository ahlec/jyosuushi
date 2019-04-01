import classnames from "classnames";
import { uniq } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { HIRAGANA } from "../../../japanese/kana";
import { Answer, Question } from "../../../redux";
import { markCorrectAnswer, markIncorrectAnswer } from "../../../redux/actions";
import { Dispatch } from "../../../redux/store";
import KanaInput from "./KanaInput";

import "./index.scss";

const KEY_ENTER = 13;

interface ProvidedProps {
  currentQuestion: Question;
  enabled: boolean;
  onAnswerSubmitted: (usersCorrectAnswer: Answer | null) => void;
}

type ComponentProps = ProvidedProps & { dispatch: Dispatch };

interface ComponentState {
  value: string;
  isValid: boolean;
}

function getCounterId(answer: Answer): string {
  return answer.counterId;
}

class AnswerInput extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState = {
    isValid: false,
    value: ""
  };

  public render() {
    const { currentQuestion, enabled } = this.props;
    const { isValid, value } = this.state;
    return (
      <div className="AnswerInput" onKeyDown={this.onKeyDown}>
        <KanaInput
          currentQuestion={currentQuestion}
          enabled={enabled}
          kana={HIRAGANA}
          onChange={this.onChange}
        >
          <button
            className={classnames("submit-button", !!value && "show")}
            onClick={this.onClickSubmitButton}
          />
        </KanaInput>
        <div
          className={classnames(
            "submit-instructions",
            !!value && "has-value",
            !isValid && "invalid"
          )}
        >
          Press the [enter] key when you're finished, or click the arrow button
          to submit.
        </div>
      </div>
    );
  }

  private onChange = (value: string) => {
    this.setState({
      isValid: !!value && HIRAGANA.isOnlyKana(value),
      value
    });
  };

  private onClickSubmitButton = (event: React.MouseEvent) => {
    this.submit();
    event.preventDefault();
  };

  private onKeyDown = (event: React.KeyboardEvent) => {
    const { enabled } = this.props;
    if (enabled && event.keyCode === KEY_ENTER) {
      this.submit();
      event.stopPropagation();
    }
  };

  private submit() {
    const { currentQuestion, dispatch, onAnswerSubmitted } = this.props;
    const { isValid, value } = this.state;

    if (!isValid) {
      return;
    }

    const correct = this.getCorrectAnswer(value);
    onAnswerSubmitted(correct);
    if (correct) {
      dispatch(markCorrectAnswer());
    } else {
      dispatch(
        markIncorrectAnswer(
          uniq(currentQuestion.validAnswers.map(getCounterId))
        )
      );
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
