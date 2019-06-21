import * as React from "react";
import { connect } from "react-redux";

import Localization from "../../localization";
import { Item, Question, State } from "../../redux";

import "./QuestionDisplay.scss";

interface ProvidedProps {
  currentQuestion: Question;
  localization: Localization;
}

interface ReduxProps {
  item: Item;
}

function mapStateToProps(
  state: State,
  { currentQuestion }: ProvidedProps
): ReduxProps {
  return {
    item: state.items[currentQuestion.itemId]
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

class QuestionPanel extends React.PureComponent<ComponentProps> {
  public render() {
    const { item, localization, currentQuestion } = this.props;
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

export default connect(mapStateToProps)(QuestionPanel);
