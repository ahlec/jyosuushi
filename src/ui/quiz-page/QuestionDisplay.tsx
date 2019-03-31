import * as React from "react";
import { connect } from "react-redux";

import { Item, Question, State } from "../../redux";

import "./QuestionDisplay.scss";

interface ProvidedProps {
  currentQuestion: Question;
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
    const { item, currentQuestion } = this.props;
    const name = currentQuestion.amount === 1 ? item.singular : item.plural;
    return (
      <div className="QuestionDisplay">
        {currentQuestion.amount} {name}
      </div>
    );
  }
}

export default connect(mapStateToProps)(QuestionPanel);
