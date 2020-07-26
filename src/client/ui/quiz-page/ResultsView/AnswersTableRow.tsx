import classnames from "classnames";
import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import useLocale from "@jyosuushi/i18n/useLocale";
import {
  Answer,
  Counter,
  CountingSystem,
  StudyPack,
} from "@jyosuushi/interfaces";

import CounterDisplay from "@jyosuushi/ui/components/CounterDisplay";

import styles from "./AnswersTableRow.scss";

export interface AnswersTableRowData {
  counter: Counter;
  studyPacks: ReadonlyArray<StudyPack>;

  kanaAnswers: ReadonlyArray<Answer>;

  /**
   * An array of all of the valid kanji answers usable for this
   * counter row.
   */
  validKanji: ReadonlyArray<string>;

  /**
   * A boolean that is true iff the user's answer was correct
   * AND this row includes the answer that the user typed in.
   */
  wasUsersCorrectAnswer: boolean;
}

interface ComponentProps {
  data: AnswersTableRowData;
}

const INTL_MESSAGES = defineMessages({
  readingLabelIrregular: {
    defaultMessage: "(irregular)",
    id: "quiz-page.results.AnswersTable.readingsLabels.irregular",
  },
  readingLabelNonKango: {
    defaultMessage: "(not 漢語)",
    id: "quiz-page.results.AnswersTable.readingsLabel.nonKango",
  },
});

function AnswersTableRow({ data }: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const locale = useLocale();

  // Render the component
  return (
    <tr
      key={data.counter.counterId}
      className={classnames(
        styles.answersTableRow,
        data.wasUsersCorrectAnswer && styles.correct
      )}
    >
      <td className={styles.cellCounter}>
        <CounterDisplay counter={data.counter} />
      </td>
      <td className={styles.cellRule}>
        {locale.dataLocalizers.getCounterName(data.counter)}
      </td>
      <td className={styles.cellStudyPack}>
        {data.studyPacks.map(
          (pack: StudyPack): React.ReactNode => (
            <div key={pack.packId} className="study-pack">
              {locale.dataLocalizers.getStudyPackName(pack)}
            </div>
          )
        )}
      </td>
      <td className={styles.cellKanji}>
        {data.validKanji.length
          ? data.validKanji.map(
              (kanji: string): React.ReactNode => (
                <div key={kanji} className="kanji">
                  {kanji}
                </div>
              )
            )
          : "(none)"}
      </td>
      <td className={styles.cellHiragana}>
        {data.kanaAnswers.map(
          ({
            countingSystem,
            irregularType,
            kana,
          }: Answer): React.ReactNode => {
            const { usersAnswer } = this.props;
            return (
              <div
                key={kana}
                className={classnames(
                  styles.kana,
                  usersAnswer.judgment === "correct" &&
                    usersAnswer.input === kana &&
                    styles.correct
                )}
              >
                {kana}
                {irregularType ? (
                  <FormattedMessage {...INTL_MESSAGES.readingLabelIrregular}>
                    {(text) => <span className={styles.irregular}>{text}</span>}
                  </FormattedMessage>
                ) : countingSystem !== CountingSystem.Kango ? (
                  <FormattedMessage {...INTL_MESSAGES.readingLabelNonKango}>
                    {(text) => <span className={styles.nonKango}>{text}</span>}
                  </FormattedMessage>
                ) : null}
              </div>
            );
          }
        )}
      </td>
    </tr>
  );
}

export default AnswersTableRow;
