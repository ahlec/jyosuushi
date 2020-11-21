import { flatten, groupBy, uniq } from "lodash";
import React, { useMemo } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

import { STUDY_PACK_LOOKUP } from "@data/studyPacks";
import { Question } from "@jyosuushi/interfaces";
import { State, UserAnswer } from "@jyosuushi/redux";

import AnswersTableRow, { AnswersTableRowData } from "./AnswersTableRow";
import styles from "./AnswersTable.scss";

interface ComponentProps {
  currentQuestion: Question;
  usersAnswer: UserAnswer;
}

const INTL_MESSAGES = defineMessages({
  headerCounter: {
    defaultMessage: "Counter",
    id: "quiz-page.results.AnswersTable.columnHeaders.counter",
  },
  headerHiragana: {
    defaultMessage: "Hiragana",
    id: "quiz-page.results.AnswersTable.columnHeaders.hiragana",
  },
  headerKanji: {
    defaultMessage: "Kanji",
    id: "quiz-page.results.AnswersTable.columnHeaders.kanji",
  },
  headerRule: {
    defaultMessage: "Rule",
    id: "quiz-page.results.AnswersTable.columnHeaders.rule",
  },
  headerStudyPack: {
    defaultMessage: "Study Pack",
    id: "quiz-page.results.AnswersTable.columnHeaders.studyPack",
  },
});

function AnswersTable({
  currentQuestion,
  usersAnswer,
}: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const counters = useSelector((state: State) => state.counters);

  // Determine the rows that should appear in the table
  const rows = useMemo((): readonly AnswersTableRowData[] => {
    const answersByCounterId = groupBy(
      currentQuestion.validAnswers,
      (answer) => answer.counterId
    );

    return Object.keys(answersByCounterId).map(
      (counterId): AnswersTableRowData => {
        const { counter, studyPacks } = counters[counterId];
        const answers = answersByCounterId[counterId];
        return {
          counter,
          kanaAnswers: answers,
          studyPacks: studyPacks.map((packId) => STUDY_PACK_LOOKUP[packId]),
          usersCorrectKana:
            usersAnswer.judgment === "correct" ? usersAnswer.input : null,
          validKanji: uniq(
            flatten(
              answers.map(
                ({ kanji }): ReadonlyArray<string> =>
                  kanji === null ? [] : kanji
              )
            )
          ),
          wasUsersCorrectAnswer:
            usersAnswer.judgment === "correct" &&
            !!answers.find((answer) => answer.kana === usersAnswer.input),
        };
      }
    );
  }, [counters, currentQuestion, usersAnswer.input, usersAnswer.judgment]);

  // Render the component
  return (
    <table className={styles.answersTable}>
      <tbody>
        <tr>
          <FormattedMessage {...INTL_MESSAGES.headerCounter} tagName="th" />
          <FormattedMessage {...INTL_MESSAGES.headerRule} tagName="th" />
          <FormattedMessage {...INTL_MESSAGES.headerStudyPack} tagName="th" />
          <FormattedMessage {...INTL_MESSAGES.headerKanji} tagName="th" />
          <FormattedMessage {...INTL_MESSAGES.headerHiragana} tagName="th" />
        </tr>
        {rows.map(
          (data): React.ReactElement => (
            <AnswersTableRow key={data.counter.counterId} data={data} />
          )
        )}
      </tbody>
    </table>
  );
}

export default AnswersTable;
