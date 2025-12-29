import { usePostHog } from "posthog-js/react";
import * as React from "react";
import { connect } from "react-redux";

import { Question } from "@jyosuushi/interfaces";
import { QuizState, State } from "@jyosuushi/redux";

import { useQuizManager } from "./state/context";
import QuestionView from "./views/question/QuestionView";
import QuizWrapup from "./views/wrapup/QuizWrapup";

interface ProvidedProps {
  enabled: boolean;
}

interface ReduxProps {
  currentQuestion: Question | null;
  quizState: QuizState;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    currentQuestion: state.questions.currentQuestion,
    quizState: state.quizState,
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

function QuizPage({
  currentQuestion,
  enabled,
  quizState,
}: ComponentProps): React.ReactElement | null {
  const posthog = usePostHog();
  const quizManager = useQuizManager();

  if (quizState.state === "not-in-quiz") {
    return null;
  }

  if (quizState.state === "quiz-wrapup") {
    return <QuizWrapup quizManager={quizManager} />;
  }

  if (!currentQuestion) {
    throw new Error("Cannot render quiz page without question");
  }

  return (
    <QuestionView
      currentQuestion={currentQuestion}
      enabled={enabled}
      posthog={posthog}
      quizManager={quizManager}
      quizState={quizState}
    />
  );
}

export default connect(mapStateToProps)(QuizPage);
