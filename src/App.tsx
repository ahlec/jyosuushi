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

class App extends React.PureComponent<ComponentProps> {
  public render() {
    const { isQuizActive, language } = this.props;
    const localization = LOCALIZATION_LOOKUP[language];
    return (
      <div className={classnames("App", isQuizActive && "quiz-active")}>
        <Header isQuizActive={isQuizActive} localization={localization} />
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
    return <QuizPage localization={localization} quizManager={quizManager} />;
  }
}

export default connect(mapStateToProps)(App);
