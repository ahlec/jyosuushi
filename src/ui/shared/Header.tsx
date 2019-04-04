import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import { Scorecard, State } from "../../redux";

import "./Header.scss";

interface ProvidedProps {
  isQuizActive: boolean;
}

interface ReduxProps {
  scorecard: Scorecard;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    scorecard: state.scorecard
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

class Header extends React.PureComponent<ComponentProps> {
  public render() {
    const { isQuizActive } = this.props;
    return (
      <div className={classnames("Header", isQuizActive && "quiz-active")}>
        <ruby>
          助数詞<rt>じょすうし</rt>
        </ruby>
        を
        <ruby>
          練習<rt>れんしゅう</rt>
        </ruby>
        <div className="subheader">Let's review Japanese counters!</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
