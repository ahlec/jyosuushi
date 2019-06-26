import classnames from "classnames";
import { uniq } from "lodash";
import * as React from "react";
import * as ReactGA from "react-ga";
import { connect } from "react-redux";

import { Answer, Question } from "../../../interfaces";
import { HIRAGANA } from "../../../japanese/kana";
import Localization from "../../../localization";
import { State } from "../../../redux";
import {
  skipQuestion,
  submitCorrectAnswer,
  submitIncorrectAnswer
} from "../../../redux/actions";
import { Dispatch } from "../../../redux/store";
import KanaInput, { KanaInputValue } from "./KanaInput";

import RightIcon from "../../right.svg";

import TsuNotice from "./TsuNotice";

import "./index.scss";

const KEY_ENTER = 13;

interface ProvidedProps {
  currentQuestion: Question;
  enabled: boolean;
  localization: Localization;
  onAnswerSubmitted?: (usersCorrectAnswer: Answer | null) => void;
}

interface ReduxProps {
  numQuestionsAsked: number;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    numQuestionsAsked: state.user.numQuestionsAsked
  };
}

type ComponentProps = ProvidedProps & ReduxProps & { dispatch: Dispatch };

interface ComponentState {
  value: KanaInputValue | null;
}

function getCounterId(answer: Answer): string {
  return answer.counterId;
}

class AnswerInput extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState = {
    value: null
  };

  public componentDidUpdate({
    numQuestionsAsked: prevNumQuestionsAsked
  }: ComponentProps) {
    const { numQuestionsAsked } = this.props;
    if (numQuestionsAsked !== prevNumQuestionsAsked) {
      this.setState({ value: null });
    }
  }

  public render() {
    const { enabled, localization } = this.props;
    const { value } = this.state;
    return (
      <div
        className={classnames("AnswerInput", !enabled && "disabled")}
        onKeyDown={this.onKeyDown}
      >
        <KanaInput
          enabled={enabled}
          kana={HIRAGANA}
          onChange={this.onChange}
          value={value}
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
            !!value && !value.validValue && enabled && "invalid"
          )}
        >
          Press the [enter] key when you're finished, or click the arrow button
          to submit.
        </div>
        <TsuNotice localization={localization} />
        <div className="buttons">
          {enabled && (
            <button onClick={this.onSkipClicked}>Skip this question</button>
          )}
        </div>
      </div>
    );
  }

  private onChange = (value: KanaInputValue) =>
    this.setState({
      value
    });

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
    const { value } = this.state;

    if (!value || !value.validValue) {
      return;
    }

    const correct = this.getCorrectAnswer(value.validValue);
    if (onAnswerSubmitted) {
      onAnswerSubmitted(correct);
    }

    if (correct) {
      dispatch(submitCorrectAnswer(value.validValue));
    } else {
      dispatch(
        submitIncorrectAnswer(
          value.validValue,
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

  private onSkipClicked = () => {
    const { currentQuestion } = this.props;
    ReactGA.event({
      action: "Question Skipped",
      category: "Quiz",
      label: `${currentQuestion.amount} of '${currentQuestion.itemId}'`
    });

    this.props.dispatch(skipQuestion());
  };
}

export default connect(mapStateToProps)(AnswerInput);
