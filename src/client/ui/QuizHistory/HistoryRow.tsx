import classnames from "classnames";
import * as React from "react";

import { ITEMS_LOOKUP } from "@data/items";

import { Question } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { UserAnswer } from "@jyosuushi/redux";

import JudgmentBubble from "@jyosuushi/ui/JudgmentBubble";

import styles from "./HistoryRow.scss";

interface ComponentProps {
  className: string;
  localization: Localization;
  question: Question;
  questionNo: number;
  usersAnswer: UserAnswer;
}

export default class HistoryRow extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const {
      className,
      localization,
      question: { amount, itemId },
      questionNo,
      usersAnswer: { input, judgment },
    } = this.props;
    const item = ITEMS_LOOKUP[itemId];
    const itemName =
      amount === 1
        ? localization.itemSingular(item)
        : localization.itemPlural(item);
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
            {amount} {itemName}
          </div>
          {input && (
            <div>
              <span>{localization.submittedLabel}</span> 『{input}』
            </div>
          )}
        </td>
      </tr>
    );
  }
}
