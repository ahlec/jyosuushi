import * as React from "react";
import { connect } from "react-redux";

import { AskNewQuestion } from "./QuestionManager";
import { Question, State } from "./redux";

import IntroPage from "./ui/intro-page";
import QuizPage from "./ui/quiz-page";
import Header from "./ui/shared/Header";

import "./App.scss";

interface ProvidedProps {
  askNewQuestion: AskNewQuestion;
}

interface ReduxProps {
  currentQuestion: Question | null;
  hasStudyPacksEnabled: boolean;
}

type ComponentProps = ProvidedProps & ReduxProps;

function mapStateToProps(state: State): ReduxProps {
  return {
    currentQuestion: state.currentQuestion,
    hasStudyPacksEnabled: !!state.enabledPacks.length
  };
}

class App extends React.PureComponent<ComponentProps> {
  public render() {
    const { currentQuestion, hasStudyPacksEnabled } = this.props;
    return (
      <div className="App">
        <Header />
        {currentQuestion && hasStudyPacksEnabled
          ? this.renderQuizPage(currentQuestion)
          : this.renderIntroPage()}
      </div>
    );
  }

  private renderIntroPage() {
    return <IntroPage />;
  }

  private renderQuizPage(currentQuestion: Question) {
    const { askNewQuestion } = this.props;

    return (
      <QuizPage
        askNewQuestion={askNewQuestion}
        currentQuestion={currentQuestion}
      />
    );
  }
}

export default connect(mapStateToProps)(App);
