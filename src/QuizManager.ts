import * as ReactGA from "react-ga";

import { STUDY_PACK_LOOKUP } from "../data/studyPacks";
import makeQuiz from "./QuizMaker";
import { StudyPack } from "./redux";
import { endQuiz, nextQuestion, restartQuiz, startQuiz } from "./redux/actions";
import { Store } from "./redux/store";

const GOOGLE_ANALYTICS_CATEGORY = "Quiz";

export default class QuizManager {
  public constructor(private readonly store: Store) {}

  public get hasNextQuestion(): boolean {
    const state = this.store.getState();
    return (
      state.questions.currentQuestion < state.questions.questions.length - 1
    );
  }

  public startNewQuiz(studyPacks: ReadonlyArray<StudyPack>) {
    if (!studyPacks.length) {
      throw new Error("Must provide one or more study packs");
    }

    const questions = makeQuiz(studyPacks);
    this.store.dispatch(startQuiz(studyPacks, questions));

    ReactGA.event({
      action: "New Quiz Began",
      category: GOOGLE_ANALYTICS_CATEGORY,
      label: `[${studyPacks
        .map(({ packId }) => packId)
        .join(", ")}] Questions: ${questions.length}`
    });
  }

  public endQuiz() {
    const { enabledPacks, scorecard } = this.store.getState();
    const numQuestionsAnswered =
      scorecard.numCorrectAnswers + scorecard.numIncorrectAnswers;
    ReactGA.event({
      action: "Quiz Finished",
      category: GOOGLE_ANALYTICS_CATEGORY,
      label: `[${enabledPacks.join(
        ", "
      )}] Answered: ${numQuestionsAnswered}, Skipped: ${
        scorecard.numSkippedQuestions
      }, Ignored: ${scorecard.numIgnoredAnswers}`
    });

    this.store.dispatch(endQuiz());
  }

  public restart() {
    const state = this.store.getState();
    const packs = state.enabledPacks.map(packId => STUDY_PACK_LOOKUP[packId]);
    const questions = makeQuiz(packs);
    this.store.dispatch(restartQuiz(questions));

    ReactGA.event({
      action: "Quiz Restarted",
      category: GOOGLE_ANALYTICS_CATEGORY,
      label: `[${packs.map(({ packId }) => packId).join(", ")}] Questions: ${
        questions.length
      }`
    });
  }

  public nextQuestion() {
    if (!this.hasNextQuestion) {
      throw new Error("No more questions in this quiz");
    }

    this.store.dispatch(nextQuestion());
  }
}
