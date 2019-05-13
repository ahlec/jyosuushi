import classnames from "classnames";
import { uniq } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { HIRAGANA } from "../../../japanese/kana";
import { Answer, Question } from "../../../redux";
import {
  skipQuestion,
  submitCorrectAnswer,
  submitIncorrectAnswer
} from "../../../redux/actions";
import { Dispatch } from "../../../redux/store";
import KanaInput from "./KanaInput";

import RightIcon from "../../right.svg";

import "./index.scss";

const KEY_ENTER = 13;

interface ProvidedProps {
  currentQuestion: Question;
  enabled: boolean;
  onAnswerSubmitted?: (usersCorrectAnswer: Answer | null) => void;
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
      <div
        className={classnames("AnswerInput", !enabled && "disabled")}
        onKeyDown={this.onKeyDown}
      >
        <KanaInput
          currentQuestion={currentQuestion}
          enabled={enabled}
          kana={HIRAGANA}
          onChange={this.onChange}
        >
          <div className="submit-button-container">
            <button
              className={classnames(
                "submit-button",
                !!value && enabled && "show"
              )}
              onClick={this.onClickSubmitButton}
              disabled={!enabled}
            >
              <RightIcon />
            </button>
          </div>
        </KanaInput>
        <div
          className={classnames(
            "submit-instructions",
            !!value && enabled && "has-value",
            !isValid && enabled && "invalid"
          )}
        >
          Press the [enter] key when you're finished, or click the arrow button
          to submit.
        </div>
        <div className="buttons">
          {enabled && (
            <button onClick={this.onSkipClicked}>Skip this question</button>
          )}
        </div>
      </div>
    );
  }

  private onChange = (changedValue: string) => {
    let isValid = !!changedValue && HIRAGANA.isOnlyKana(changedValue);
    let value = changedValue;
    if (!isValid && changedValue && changedValue.toLowerCase().endsWith("n")) {
      // Check to see if we end with "n" like "じｎ"
      // If we hit enter with that, then we know that's still valid
      if (changedValue.length === 1) {
        // The input is just "n"
        isValid = true;
        value = "ん";
      } else {
        const withoutUnconvertedFinalN = changedValue.substr(
          0,
          changedValue.length - 1
        );
        value = withoutUnconvertedFinalN + "ん";
        isValid = HIRAGANA.isOnlyKana(withoutUnconvertedFinalN);
      }
    }

    this.setState({
      isValid,
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
    if (onAnswerSubmitted) {
      onAnswerSubmitted(correct);
    }

    if (correct) {
      dispatch(submitCorrectAnswer(value));
    } else {
      dispatch(
        submitIncorrectAnswer(
          value,
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

  private onSkipClicked = () => this.props.dispatch(skipQuestion());
}

export default connect()(AnswerInput);
