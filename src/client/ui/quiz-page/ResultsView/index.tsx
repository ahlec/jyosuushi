import classnames from "classnames";
import { uniq } from "lodash";
import * as React from "react";
import * as ReactGA from "react-ga";
import { connect } from "react-redux";

import { Answer, Question } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import {
  CountersState,
  State,
  UserAnswer,
  UserAnswerJudgment,
} from "@jyosuushi/redux";
import { ignoreLastAnswer } from "@jyosuushi/redux/actions";
import { Dispatch } from "@jyosuushi/redux/store";

import JudgmentBubble from "@jyosuushi/ui/JudgmentBubble";

import AnswersTable from "./AnswersTable";

import styles from "./index.scss";

interface ProvidedProps {
  className: string;
  currentQuestion: Question;
  localization: Localization;
  onClickNextQuestion: () => void;
}

interface ReduxProps {
  counters: CountersState;
  usersAnswer: UserAnswer;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    counters: state.counters,
    usersAnswer: state.userAnswers[state.userAnswers.length - 1],
  };
}

type ComponentProps = ProvidedProps & ReduxProps & { dispatch: Dispatch };

const HEADERS: {
  [judgment in UserAnswerJudgment]: (localization: Localization) => string;
} = {
  correct: (localization) => localization.resultCorrectHeader,
  ignored: (localization) => localization.resultIncorrectHeader,
  incorrect: (localization) => localization.resultIncorrectHeader,
  skipped: (localization) => localization.resultSkippedHeader,
};

class ResultsView extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const {
      className,
      currentQuestion,
      localization,
      usersAnswer,
    } = this.props;
    return (
      <div className={classnames(styles.resultsView, className)}>
        <div className={styles.results}>
          <JudgmentBubble
            judgment={usersAnswer.judgment}
            shape="block-circle"
          />
          <div className={styles.info}>
            <h3>{HEADERS[usersAnswer.judgment](localization)}</h3>
            {usersAnswer.judgment !== "skipped" ? (
              <React.Fragment>
                <p>{localization.resultTableIntro}</p>
                <AnswersTable
                  currentQuestion={currentQuestion}
                  localization={localization}
                  usersAnswer={usersAnswer}
                />
              </React.Fragment>
            ) : (
              <p>{localization.skippedQuestionResult}</p>
            )}
          </div>
        </div>
        <div className={styles.buttons}>
          {usersAnswer.judgment === "incorrect" && (
            <button
              className={styles.ignoreAnswer}
              onClick={this.onIgnoreClicked}
            >
              {localization.buttonIgnoreAnswer}
            </button>
          )}
          <button onClick={this.onClickNextQuestion}>
            {localization.buttonNextQuestion}
          </button>
        </div>
      </div>
    );
  }

  private onIgnoreClicked = (): void => {
    const { currentQuestion, dispatch } = this.props;
    const counters = uniq(
      currentQuestion.validAnswers.map(({ counterId }: Answer) => counterId)
    );

    ReactGA.event({
      action: "Answer Ignored",
      category: "Quiz",
      label: `${currentQuestion.amount} of '${currentQuestion.itemId}'`,
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
