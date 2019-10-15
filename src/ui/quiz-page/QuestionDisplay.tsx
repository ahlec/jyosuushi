import * as React from "react";

import { ITEMS_LOOKUP } from "@data/items";
import { Question } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";

import "./QuestionDisplay.scss";

interface ComponentProps {
  currentQuestion: Question;
  localization: Localization;
}

export default class QuestionPanel extends React.PureComponent<ComponentProps> {
  public render() {
    const { localization, currentQuestion } = this.props;
    const item = ITEMS_LOOKUP[currentQuestion.itemId];
    const name =
      currentQuestion.amount === 1
        ? localization.itemSingular(item)
        : localization.itemPlural(item);
    return (
      <div className="QuestionDisplay">
        {currentQuestion.amount} {name}
      </div>
    );
  }
}
