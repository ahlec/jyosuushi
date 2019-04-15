import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import QuizManager from "./QuizManager";
import { LocalizationLanguage, Question, State } from "./redux";

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
  currentQuestion: Question | null;
  hasStudyPacksEnabled: boolean;
  language: LocalizationLanguage;
}

type ComponentProps = ProvidedProps & ReduxProps;

function mapStateToProps(state: State): ReduxProps {
  return {
    currentQuestion: state.currentQuestion,
    hasStudyPacksEnabled: !!state.enabledPacks.length,
    language: state.settings.localization
  };
}

class App extends React.PureComponent<ComponentProps> {
  public render() {
    const { currentQuestion, hasStudyPacksEnabled, language } = this.props;
    const isQuizActive = !!(currentQuestion && hasStudyPacksEnabled);
    const localization = LOCALIZATION_LOOKUP[language];
    return (
      <div className={classnames("App", isQuizActive && "quiz-active")}>
        <Header isQuizActive={isQuizActive} localization={localization} />
        {currentQuestion && hasStudyPacksEnabled
          ? this.renderQuizPage(currentQuestion)
          : this.renderIntroPage(localization)}
      </div>
    );
  }

  private renderIntroPage(localization: Localization) {
    const { quizManager } = this.props;
    return <IntroPage localization={localization} quizManager={quizManager} />;
  }

  private renderQuizPage(currentQuestion: Question) {
    const { quizManager } = this.props;

    return (
      <QuizPage currentQuestion={currentQuestion} quizManager={quizManager} />
    );
  }
}

export default connect(mapStateToProps)(App);
