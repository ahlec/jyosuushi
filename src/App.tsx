import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import QuizManager from "./QuizManager";
import { State } from "./redux";

import Header from "./ui/Header";
import MainScreen from "./ui/main-screen/MainScreen";
import QuizPage from "./ui/quiz-page";
import ReleaseNotesModal from "./ui/ReleaseNotesModal";

import "./App.scss";

interface ProvidedProps {
  quizManager: QuizManager;
}

interface ReduxProps {
  isQuizActive: boolean;
  lastAccessedVersion: string | null;
}

type ComponentProps = ProvidedProps & ReduxProps;

function mapStateToProps(state: State): ReduxProps {
  return {
    isQuizActive: state.quizState !== "not-in-quiz",
    lastAccessedVersion: state.user.lastAccessedVersion
  };
}

interface ComponentState {
  isModalOpen: boolean;
  isReleaseNotesModalOpen: boolean;
}

class App extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState;

  public constructor(props: ComponentProps) {
    super(props);

    const isReleaseNotesModalOpen =
      !!props.lastAccessedVersion &&
      props.lastAccessedVersion !== JYOSUUSHI_CURRENT_SEMVER;
    this.state = {
      isModalOpen: isReleaseNotesModalOpen,
      isReleaseNotesModalOpen
    };
  }

  public render() {
    const { isQuizActive } = this.props;
    const { isReleaseNotesModalOpen } = this.state;
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
        {isReleaseNotesModalOpen && (
          <ReleaseNotesModal onRequestClose={this.onReleaseNotesClosed} />
        )}
      </div>
    );
  }

  private renderMainScreen = () => {
    return <MainScreen />;
  };

  private renderQuizPage = () => {
    const { quizManager } = this.props;
    const { isModalOpen } = this.state;
    return <QuizPage enabled={!isModalOpen} quizManager={quizManager} />;
  };

  private onHeaderModalOpened = (isModalOpen: boolean) =>
    this.setState({ isModalOpen });

  private onReleaseNotesClosed = () =>
    this.setState({ isModalOpen: false, isReleaseNotesModalOpen: false });
}

export default connect(mapStateToProps)(App);
