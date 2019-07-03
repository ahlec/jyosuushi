import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { State } from "./redux";

import Header from "./ui/Header";
import MainScreen from "./ui/main-screen/MainScreen";
import QuizPage from "./ui/quiz-page";

import "./App.scss";

interface ReduxProps {
  isQuizActive: boolean;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    isQuizActive: state.quizState !== "not-in-quiz"
  };
}

interface ComponentState {
  isModalOpen: boolean;
}

class App extends React.PureComponent<ReduxProps, ComponentState> {
  public state: ComponentState = {
    isModalOpen: false
  };

  public render() {
    const { isQuizActive } = this.props;
    return (
      <div className={classnames("App", isQuizActive && "quiz-active")}>
        <Header
          isQuizActive={isQuizActive}
          onModalOpened={this.onHeaderModalOpened}
        />
        <Switch>
          <Route path="/quiz" render={this.renderQuizPage} />
          <Route render={this.renderMainScreen} />
        </Switch>
      </div>
    );
  }

  private renderMainScreen = () => {
    return <MainScreen />;
  };

  private renderQuizPage = () => {
    const { isModalOpen } = this.state;
    return <QuizPage enabled={!isModalOpen} />;
  };

  private onHeaderModalOpened = (isModalOpen: boolean) =>
    this.setState({ isModalOpen });
}

export default connect(mapStateToProps)(App);
