import classnames from "classnames";
import { uniq } from "lodash";
import type { PostHog } from "posthog-js/react";
import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import StandardButton from "@jyosuushi/ui/components/StandardButton";

import {
  Answer,
  CounterReadingFrequency,
  Question,
} from "@jyosuushi/interfaces";
import { HIRAGANA } from "@jyosuushi/japanese/kana";
import { State } from "@jyosuushi/redux";
import {
  skipQuestion,
  submitCorrectAnswer,
  submitIncorrectAnswer,
} from "@jyosuushi/redux/actions";
import { Dispatch } from "@jyosuushi/redux/store";
import KanaInput, { KanaInputValue } from "./KanaInput";

import RightIcon from "@jyosuushi/ui/right.svg";

import TsuNotice from "./TsuNotice";

import * as styles from "./index.scss";

interface ProvidedProps {
  buttonsClassName: string;
  currentQuestion: Question;
  enabled: boolean;
  posthog: PostHog;
}

interface ReduxProps {
  failOnUncommonReadings: boolean;
  numQuestionsAsked: number;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    failOnUncommonReadings: state.settings.failOnUncommonReadings,
    numQuestionsAsked: state.user.numQuestionsAsked,
  };
}

type ComponentProps = ProvidedProps & ReduxProps & { dispatch: Dispatch };

interface ComponentState {
  value: KanaInputValue | null;
}

function getCounterId(answer: Answer): string {
  return answer.counterId;
}

const INTL_MESSAGES = defineMessages({
  buttonSkip: {
    defaultMessage: "Skip this question",
    id: "quiz-page.AnswerInput.buttonSkipQuestion",
  },
  howToSubmit: {
    defaultMessage:
      "Press the [enter] key when you're finished, or click the arrow button to submit.",
    id: "quiz-page.AnswerInput.howToSubmit",
  },
});

class AnswerInput extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState = {
    value: null,
  };

  public componentDidUpdate({
    numQuestionsAsked: prevNumQuestionsAsked,
  }: ComponentProps): void {
    const { numQuestionsAsked } = this.props;
    if (numQuestionsAsked !== prevNumQuestionsAsked) {
      this.setState({ value: null });
    }
  }

  public render(): React.ReactNode {
    const { buttonsClassName, enabled } = this.props;
    const { value } = this.state;
    return (
      <div
        className={classnames(styles.answerInput, !enabled && styles.disabled)}
      >
        <KanaInput
          className={styles.kanaInput}
          enabled={enabled}
          kana={HIRAGANA}
          onChange={this.onChange}
          onSubmit={this.handleInputSubmit}
          value={value}
        >
          <div className={styles.submitButtonContainer}>
            <button
              className={classnames(
                styles.submitButton,
                !!value && enabled && styles.show,
              )}
              onClick={this.onClickSubmitButton}
              disabled={!enabled}
            >
              <RightIcon />
            </button>
          </div>
        </KanaInput>
        <FormattedMessage {...INTL_MESSAGES.howToSubmit}>
          {(text) => (
            <div
              className={classnames(
                styles.submitInstructions,
                !!value && enabled && styles.hasValue,
                !!value && !value.validValue && enabled && "invalid",
              )}
            >
              {text}
            </div>
          )}
        </FormattedMessage>
        <TsuNotice />
        <div className={buttonsClassName}>
          {enabled && (
            <FormattedMessage {...INTL_MESSAGES.buttonSkip}>
              {(text) => (
                <StandardButton onClick={this.onSkipClicked}>
                  {text}
                </StandardButton>
              )}
            </FormattedMessage>
          )}
        </div>
      </div>
    );
  }

  private onChange = (value: KanaInputValue): void =>
    this.setState({
      value,
    });

  private onClickSubmitButton = (event: React.MouseEvent): void => {
    this.submit();
    event.preventDefault();
  };

  private handleInputSubmit = (): void => {
    const { enabled } = this.props;
    if (!enabled) {
      return;
    }

    this.submit();
  };

  private submit(): void {
    const { currentQuestion, dispatch } = this.props;
    const { value } = this.state;

    if (!value || !value.validValue) {
      return;
    }

    const answerWithKanaReading = currentQuestion.allReadings.find(
      (reading): boolean => reading.kana === value.validValue,
    );

    if (answerWithKanaReading && this.isCorrectAnswer(answerWithKanaReading)) {
      dispatch(
        submitCorrectAnswer(value.validValue, answerWithKanaReading.frequency),
      );
    } else {
      dispatch(
        submitIncorrectAnswer(
          value.validValue,
          uniq(currentQuestion.allReadings.map(getCounterId)),
          answerWithKanaReading?.frequency ?? null,
        ),
      );
    }
  }

  private isCorrectAnswer(answer: Answer): boolean {
    const { failOnUncommonReadings } = this.props;
    if (failOnUncommonReadings) {
      return answer.frequency === CounterReadingFrequency.Common;
    }

    return true;
  }

  private onSkipClicked = (): void => {
    const { currentQuestion, posthog } = this.props;
    posthog.capture("question-skipped", {
      amount: currentQuestion.amount,
      itemId: currentQuestion.itemId,
    });

    this.props.dispatch(skipQuestion());
  };
}

export default connect(mapStateToProps)(AnswerInput);
