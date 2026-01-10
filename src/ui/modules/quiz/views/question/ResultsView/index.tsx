import classnames from "classnames";
import { uniq } from "lodash";
import type { PostHog } from "posthog-js/react";
import * as React from "react";
import {
  defineMessages,
  FormattedMessage,
  MessageDescriptor,
} from "react-intl";
import { connect } from "react-redux";

import { Answer, CounterFrequency, Question } from "@jyosuushi/interfaces";
import { State, UserAnswer, UserAnswerJudgment } from "@jyosuushi/redux";
import { ignoreLastAnswer } from "@jyosuushi/redux/actions";
import { Dispatch } from "@jyosuushi/redux/store";

import JudgmentBubble from "@jyosuushi/ui/components/JudgmentBubble";
import StandardButton from "@jyosuushi/ui/components/StandardButton";

import AnswersTable from "./AnswersTable";

import * as styles from "./index.scss";

interface ProvidedProps {
  className: string;
  currentQuestion: Question;
  onClickNextQuestion: () => void;
  posthog: PostHog;
}

interface ReduxProps {
  usersAnswer: UserAnswer;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    usersAnswer: state.userAnswers[state.userAnswers.length - 1],
  };
}

type ComponentProps = ProvidedProps & ReduxProps & { dispatch: Dispatch };

const INTL_MESSAGES = defineMessages({
  buttonIgnoreAnswer: {
    defaultMessage: "Ignore Answer",
    id: "quiz-page.results.buttonIgnoreAnswer",
  },
  buttonNextQuestion: {
    defaultMessage: "Next Question",
    id: "quiz-page.results.buttonNextQuestion",
  },
  headerCorrect: {
    defaultMessage: "Correct!",
    id: "quiz-page.results.header.correct",
  },
  headerCorrectButUncommon: {
    defaultMessage: "Correct, but...",
    id: "quiz-page.results.header.correctButUncommon",
  },
  headerIncorrect: {
    defaultMessage: "Not quite right...",
    id: "quiz-page.results.header.incorrect",
  },
  headerSkipped: {
    defaultMessage: "Skipped",
    id: "quiz-page.results.header.skipped",
  },
  resultsTableIntro: {
    defaultMessage:
      "Here are all of the possible answers based on the sets you have enabled:",
    id: "quiz-page.results.table.intro",
  },
  skippedQuestionResult: {
    defaultMessage: "Alright! You don't need to worry about this question!",
    id: "quiz-page.results.skippedQuestion",
  },
  uncommonCalloutArchaic: {
    defaultMessage:
      "That is a correct answer, but it's an archaic reading for the counter. Unless you were intending to use an archaic reading, check the table below for more modern answers.",
    id: "quiz-page.results.uncommonCallout.archaic",
  },
  uncommonCalloutUncommon: {
    defaultMessage:
      "That is a correct answer, but it's an uncommon reading for the counter. Unless you were intending to use an uncommon reading, check the table below for more common answers.",
    id: "quiz-page.results.uncommonCallout.uncommon",
  },
});

const HEADERS: {
  [judgment in UserAnswerJudgment]: MessageDescriptor;
} = {
  correct: INTL_MESSAGES.headerCorrect,
  "correct-but-uncommon": INTL_MESSAGES.headerCorrectButUncommon,
  ignored: INTL_MESSAGES.headerIncorrect, // Since you can only ignore something if you got it wrong, don't change the header
  incorrect: INTL_MESSAGES.headerIncorrect,
  skipped: INTL_MESSAGES.headerSkipped,
};

const READING_FREQUENCY_CALLOUTS: Record<
  CounterFrequency,
  MessageDescriptor | null
> = {
  [CounterFrequency.Common]: null,
  [CounterFrequency.Uncommon]: INTL_MESSAGES.uncommonCalloutUncommon,
  [CounterFrequency.Archaic]: INTL_MESSAGES.uncommonCalloutArchaic,
};

class ResultsView extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { className, currentQuestion, usersAnswer } = this.props;
    const frequencyCallout =
      usersAnswer.judgment === "correct-but-uncommon" &&
      READING_FREQUENCY_CALLOUTS[usersAnswer.readingFrequency];
    return (
      <div className={classnames(styles.resultsView, className)}>
        <div className={styles.results}>
          <JudgmentBubble
            judgment={usersAnswer.judgment}
            shape="block-circle"
          />
          <div className={styles.info}>
            <FormattedMessage {...HEADERS[usersAnswer.judgment]} tagName="h3" />
            {usersAnswer.judgment !== "skipped" ? (
              <React.Fragment>
                {frequencyCallout ? (
                  <FormattedMessage {...frequencyCallout} tagName="p" />
                ) : null}
                <FormattedMessage
                  {...INTL_MESSAGES.resultsTableIntro}
                  tagName="p"
                />
                <AnswersTable
                  currentQuestion={currentQuestion}
                  usersAnswer={usersAnswer}
                />
              </React.Fragment>
            ) : (
              <FormattedMessage
                {...INTL_MESSAGES.skippedQuestionResult}
                tagName="p"
              />
            )}
          </div>
        </div>
        <div className={styles.buttons}>
          {usersAnswer.judgment === "incorrect" && (
            <FormattedMessage {...INTL_MESSAGES.buttonIgnoreAnswer}>
              {(ignoreAnswer) => (
                <StandardButton
                  className={styles.ignoreAnswer}
                  onClick={this.onIgnoreClicked}
                >
                  {ignoreAnswer}
                </StandardButton>
              )}
            </FormattedMessage>
          )}
          <FormattedMessage {...INTL_MESSAGES.buttonNextQuestion}>
            {(nextQuestion) => (
              <StandardButton onClick={this.onClickNextQuestion}>
                {nextQuestion}
              </StandardButton>
            )}
          </FormattedMessage>
        </div>
      </div>
    );
  }

  private onIgnoreClicked = (): void => {
    const { currentQuestion, dispatch, posthog, usersAnswer } = this.props;
    const counters = uniq(
      currentQuestion.validAnswers.map(({ counterId }: Answer) => counterId),
    );

    posthog.capture("answer-ignored", {
      amount: currentQuestion.amount,
      input: usersAnswer.input?.substring(0, 64) ?? "<<<null>>>",
      itemId: currentQuestion.itemId,
    });

    dispatch(ignoreLastAnswer(counters));
  };

  private onClickNextQuestion = (event: React.MouseEvent): void => {
    const { onClickNextQuestion } = this.props;
    onClickNextQuestion();
    event.stopPropagation();
  };
}

export default connect(mapStateToProps)(ResultsView);
