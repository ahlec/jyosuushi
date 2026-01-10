import classnames from "classnames";
import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import useLocale from "@jyosuushi/i18n/useLocale";
import {
  Answer,
  Counter,
  CountingSystem,
  CounterCollectionDescriptor,
} from "@jyosuushi/interfaces";

import useCounterDisplay from "@jyosuushi/hooks/useCounterDisplay";
import { CounterReading } from "@jyosuushi/ui/components/CounterReading";
import Furigana from "@jyosuushi/ui/components/Furigana";

import * as styles from "./AnswersTableRow.scss";

export interface AnswersTableRowData {
  counter: Counter;
  collections: readonly CounterCollectionDescriptor[];

  kanaAnswers: ReadonlyArray<Answer>;

  /**
   * An array of all of the valid kanji answers usable for this
   * counter row.
   */
  validKanji: ReadonlyArray<string>;

  /**
   * A string which, if provided, was the user's correct input and the
   * hiragana/katakana answer that got them the question.
   *
   * If the user did not get this question correct, then this should be
   * null.
   */
  usersCorrectKana: string | null;

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
  noKanjiForCounter: {
    defaultMessage: "(none)",
    id: "quiz-page.results.AnswersTable.kanji.noKanjiForCounter",
  },
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

  // Determine how this counter is displayed
  const counterDisplay = useCounterDisplay(data.counter);

  // Render the component
  return (
    <tr
      key={data.counter.counterId}
      className={classnames(
        styles.answersTableRow,
        data.wasUsersCorrectAnswer && styles.correct,
      )}
    >
      <td className={styles.cellCounter}>
        <Furigana
          furigana={counterDisplay.furigana}
          text={counterDisplay.writing}
        />
      </td>
      <td className={styles.cellRule}>
        {locale.dataLocalizers.getCounterName(data.counter)}
      </td>
      <td className={styles.cellStudyPack}>
        {data.collections.map(
          (collection): React.ReactElement => (
            <div key={collection.id} className="study-pack">
              {collection.name}
            </div>
          ),
        )}
      </td>
      <td className={styles.cellKanji}>
        {data.validKanji.length ? (
          data.validKanji.map(
            (kanji: string): React.ReactNode => (
              <div key={kanji} className="kanji">
                {kanji}
              </div>
            ),
          )
        ) : (
          <FormattedMessage {...INTL_MESSAGES.noKanjiForCounter} />
        )}
      </td>
      <td className={styles.cellHiragana}>
        {data.kanaAnswers.map(
          ({
            countingSystem,
            frequency,
            irregularType,
            kana,
          }: Answer): React.ReactNode => {
            return (
              <div
                key={kana}
                className={classnames(
                  styles.kana,
                  data.usersCorrectKana === kana && styles.correct,
                )}
              >
                <CounterReading
                  countingSystem={countingSystem}
                  frequency={frequency}
                  irregularType={irregularType}
                  kana={kana}
                  showColor={false}
                />
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
          },
        )}
      </td>
    </tr>
  );
}

export default AnswersTableRow;
