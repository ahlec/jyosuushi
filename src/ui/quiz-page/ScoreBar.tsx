import * as React from "react";
import { connect } from "react-redux";
import { Scorecard, State } from "../../redux";

import "./ScoreBar.scss";

function mapStateToProps(state: State): Scorecard {
  return state.scorecard;
}

class ScoreBar extends React.PureComponent<Scorecard> {
  public render() {
    const { numQuestionsAsked } = this.props;
    return <div className="ScoreBar">{numQuestionsAsked} asked</div>;
  }
}

export default connect(mapStateToProps)(ScoreBar);
