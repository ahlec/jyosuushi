import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import QuizManager from "./QuizManager";
import { LocalizationLanguage, State } from "./redux";

import Localization from "./localization";
import ENGLISH from "./localization/english";

import Header from "./ui/Header";
import MainScreen from "./ui/main-screen/MainScreen";
import QuizPage from "./ui/quiz-page";
import ReleaseNotesModal from "./ui/ReleaseNotesModal";

import "./App.scss";

const LOCALIZATION_LOOKUP: {
  [language in LocalizationLanguage]: Localization
} = {
  english: ENGLISH
};

interface ProvidedProps {
  quizManager: QuizManager;
}

interface ReduxProps {
  isQuizActive: boolean;
  language: LocalizationLanguage;
  lastAccessedVersion: string | null;
}

type ComponentProps = ProvidedProps & ReduxProps;

function mapStateToProps(state: State): ReduxProps {
  return {
    isQuizActive: state.quizState !== "not-in-quiz",
    language: state.settings.localization,
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
    const { isQuizActive, language } = this.props;
    const { isReleaseNotesModalOpen } = this.state;
    const localization = LOCALIZATION_LOOKUP[language];
    return (
      <div className={classnames("App", isQuizActive && "quiz-active")}>
        <Header
          isQuizActive={isQuizActive}
          localization={localization}
          onModalOpened={this.onHeaderModalOpened}
        />
        {isQuizActive
          ? this.renderQuizPage(localization)
          : this.renderMainScreen(localization)}
        {isReleaseNotesModalOpen && (
          <ReleaseNotesModal
            localization={localization}
            onRequestClose={this.onReleaseNotesClosed}
          />
        )}
      </div>
    );
  }

  private renderMainScreen(localization: Localization) {
    const { quizManager } = this.props;
    return <MainScreen localization={localization} quizManager={quizManager} />;
  }

  private renderQuizPage(localization: Localization) {
    const { quizManager } = this.props;
    const { isModalOpen } = this.state;
    return (
      <QuizPage
        enabled={!isModalOpen}
        localization={localization}
        quizManager={quizManager}
      />
    );
  }

  private onHeaderModalOpened = (isModalOpen: boolean) =>
    this.setState({ isModalOpen });

  private onReleaseNotesClosed = () =>
    this.setState({ isModalOpen: false, isReleaseNotesModalOpen: false });
}

export default connect(mapStateToProps)(App);
