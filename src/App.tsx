import classnames from "classnames";
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

interface ComponentState {
  headerQuiz: boolean;
}

class App extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState = {
    headerQuiz: false
  };

  public render() {
    const { currentQuestion, hasStudyPacksEnabled } = this.props;
    const { headerQuiz } = this.state;
    const isQuizActive = headerQuiz; // !!(currentQuestion && hasStudyPacksEnabled);
    return (
      <div className={classnames("App", isQuizActive && "quiz-active")}>
        <Header isQuizActive={isQuizActive} />
        {currentQuestion && hasStudyPacksEnabled
          ? this.renderQuizPage(currentQuestion)
          : this.renderIntroPage()}
        <input type="checkbox" checked={headerQuiz} onChange={this.onChange} />
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

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ headerQuiz: event.target.checked });
}

export default connect(mapStateToProps)(App);
