import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import QuizManager from "./QuizManager";
import { LocalizationLanguage, State } from "./redux";

import Localization from "./localization";
import ENGLISH from "./localization/english";

import Header from "./ui/Header";
import IntroPage from "./ui/intro-page";
import QuizPage from "./ui/quiz-page";

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
}

type ComponentProps = ProvidedProps & ReduxProps;

function mapStateToProps(state: State): ReduxProps {
  return {
    isQuizActive: state.quizState !== "not-in-quiz",
    language: state.settings.localization
  };
}

interface ComponentState {
  isModalOpen: boolean;
}

class App extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState = {
    isModalOpen: false
  };

  public render() {
    const { isQuizActive, language } = this.props;
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
          : this.renderIntroPage(localization)}
      </div>
    );
  }

  private renderIntroPage(localization: Localization) {
    const { quizManager } = this.props;
    return <IntroPage localization={localization} quizManager={quizManager} />;
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
}

export default connect(mapStateToProps)(App);
