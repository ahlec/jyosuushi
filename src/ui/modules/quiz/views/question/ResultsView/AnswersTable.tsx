import { flatten, groupBy, uniq } from "lodash";
import React, { useMemo } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { COUNTERS_LOOKUP } from "@data/counters";
import { Question } from "@jyosuushi/interfaces";
import { UserAnswer } from "@jyosuushi/redux";

import AnswersTableRow, { AnswersTableRowData } from "./AnswersTableRow";
import * as styles from "./AnswersTable.scss";

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
  // Determine the rows that should appear in the table
  const rows = useMemo((): readonly AnswersTableRowData[] => {
    const answersByCounterId = groupBy(
      currentQuestion.validAnswers,
      (answer) => answer.counterId
    );

    return Object.keys(answersByCounterId).map(
      (counterId): AnswersTableRowData => {
        const answers = answersByCounterId[counterId];
        return {
          collections: answers[0].collections, // TODO
          counter: COUNTERS_LOOKUP[counterId],
          kanaAnswers: answers,
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
  }, [currentQuestion, usersAnswer.input, usersAnswer.judgment]);

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
