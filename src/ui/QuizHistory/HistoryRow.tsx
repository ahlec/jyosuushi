import classnames from "classnames";
import * as React from "react";

import { ITEMS_LOOKUP } from "@data/items";

import { Question } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { UserAnswer } from "@jyosuushi/redux";

import JudgmentBubble from "@jyosuushi/ui/JudgmentBubble";

import "./HistoryRow.scss";

interface ComponentProps {
  localization: Localization;
  question: Question;
  questionNo: number;
  usersAnswer: UserAnswer;
}

export default class HistoryRow extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const {
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
      <tr className={classnames("HistoryRow", judgment)}>
        <td className="number">
          <span className="pound">#</span>
          {questionNo}
        </td>
        <td className="judgment">
          <JudgmentBubble judgment={judgment} shape="inline" />
        </td>
        <td className="details">
          <div className="question">
            {amount} {itemName}
          </div>
          {input && (
            <div className="users-answer">
              <span className="label">{localization.submittedLabel}</span> 『
              {input}』
            </div>
          )}
        </td>
      </tr>
    );
  }
}
