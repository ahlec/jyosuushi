import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import { Item } from "../../interfaces";
import Localization from "../../localization";
import { Question, State, UserAnswer } from "../../redux";

import JudgmentBubble from "../JudgmentBubble";

import "./HistoryRow.scss";

interface ProvidedProps {
  localization: Localization;
  question: Question;
  questionNo: number;
  usersAnswer: UserAnswer;
}

interface ReduxProps {
  item: Item;
}

function mapStateToProps(
  state: State,
  { question }: ProvidedProps
): ReduxProps {
  return {
    item: state.items[question.itemId]
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

class HistoryRow extends React.PureComponent<ComponentProps> {
  public render() {
    const {
      item,
      localization,
      question: { amount },
      questionNo,
      usersAnswer: { input, judgment }
    } = this.props;
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

export default connect(mapStateToProps)(HistoryRow);
