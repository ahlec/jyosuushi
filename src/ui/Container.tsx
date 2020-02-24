import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import { State } from "@jyosuushi/redux";
import { getIsQuizActive } from "@jyosuushi/redux/selectors";

import Application from "./Application";
import CreditsFooter from "./CreditsFooter";

import "./Container.scss";

interface ReduxProps {
  isQuizActive: boolean;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    isQuizActive: getIsQuizActive(state)
  };
}

class Container extends React.PureComponent<ReduxProps> {
  public render(): React.ReactNode {
    const { isQuizActive } = this.props;
    return (
      <div className={classnames("Container", isQuizActive && "quiz-active")}>
        <Application />
        <CreditsFooter />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Container);
