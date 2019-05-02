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
        {enabled && (
          <button onClick={this.onSkipClicked}>Skip this question</button>
        )}
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
