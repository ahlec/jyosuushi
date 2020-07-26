import classnames from "classnames";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { ITEMS_LOOKUP } from "@data/items";

import useLocale from "@jyosuushi/i18n/useLocale";

import { Question } from "@jyosuushi/interfaces";
import { UserAnswer } from "@jyosuushi/redux";

import JudgmentBubble from "@jyosuushi/ui/JudgmentBubble";

import styles from "./HistoryRow.scss";

interface ComponentProps {
  className: string;
  question: Question;
  questionNo: number;
  usersAnswer: UserAnswer;
}

function HistoryRow({
  className,
  question: { amount, itemId },
  questionNo,
  usersAnswer: { input, judgment },
}: ComponentProps): React.ReactElement {
  const item = ITEMS_LOOKUP[itemId];

  // Connect to the rest of the app
  const locale = useLocale();

  // Render the component
  return (
    <tr className={classnames(styles.historyRow, judgment, className)}>
      <td className={styles.number}>
        <span className={styles.pound}>#</span>
        {questionNo}
      </td>
      <td className={styles.judgment}>
        <JudgmentBubble
          className={styles.judgmentBubble}
          judgment={judgment}
          shape="inline"
        />
      </td>
      <td className={styles.details}>
        <div className={styles.question}>
          {amount} {locale.dataLocalizers.getItemName(item, amount)}
        </div>
        {input && (
          <div>
            <FormattedMessage
              id="QuizHistory.historyRow.submittedLabel"
              defaultMessage="Submitted:"
            />{" "}
            『{input}』
          </div>
        )}
      </td>
    </tr>
  );
}

export default HistoryRow;
