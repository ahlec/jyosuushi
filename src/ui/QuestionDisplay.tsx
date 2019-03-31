import * as React from "react";
import { connect } from "react-redux";

import { Item, Question, State } from "../redux";

interface ComponentProps {
  item: Item;
  currentQuestion: Question;
}

function mapStateToProps(state: State): ComponentProps {
  const currentQuestion = state.currentQuestion!;
  return {
    item: state.items[currentQuestion.itemId],
    currentQuestion
  };
}

class QuestionPanel extends React.PureComponent<ComponentProps> {
  public render() {
    const { item, currentQuestion } = this.props;
    const name = currentQuestion.amount === 1 ? item.singular : item.plural;
    return (
      <div className="QuestionPanel">
        {currentQuestion.amount} {name}
      </div>
    );
  }
}

export default connect(mapStateToProps)(QuestionPanel);
