import * as ReactGA from "react-ga";

import { STUDY_PACK_LOOKUP } from "@data/studyPacks";

import { AmountRange } from "@jyosuushi/redux";
import {
  endQuiz,
  nextQuestion,
  replenishInfiniteQuiz,
  restartQuiz,
  startQuiz
} from "@jyosuushi/redux/actions";
import { Store } from "@jyosuushi/redux/store";
import makeQuiz from "./QuizMaker";

const GOOGLE_ANALYTICS_CATEGORY = "Quiz";

export default class QuizManager {
  public constructor(private readonly store: Store) {}

  public get hasNextQuestion(): boolean {
    const state = this.store.getState();
    if (state.quizState.state === "not-in-quiz") {
      return false;
    }

    if (state.quizState.isInfinite) {
      return true;
    }

    return !!state.questions.queue.length;
  }

  private get amountRange(): AmountRange {
    const state = this.store.getState();
    return state.settings.amountRange;
  }

  public startNewQuiz() {
    const state = this.store.getState();
    const studyPacks = state.enabledPacks.map(
      packId => STUDY_PACK_LOOKUP[packId]
    );

    if (!studyPacks.length) {
      throw new Error("Must provide one or more study packs");
    }

    const questions = makeQuiz(studyPacks, this.amountRange);
    const isInfinite = state.settings.infiniteMode;
    this.store.dispatch(startQuiz(questions, isInfinite));

    ReactGA.event({
      action: "New Quiz Began",
      category: GOOGLE_ANALYTICS_CATEGORY,
      label: `[${studyPacks.map(({ packId }) => packId).join(", ")}] ${
        isInfinite ? "infinite mode" : `Questions: ${questions.length}`
      }`
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
    const questions = makeQuiz(packs, this.amountRange);
    const isInfinite = state.settings.infiniteMode;
    this.store.dispatch(restartQuiz(questions));

    ReactGA.event({
      action: "Quiz Restarted",
      category: GOOGLE_ANALYTICS_CATEGORY,
      label: `[${packs.map(({ packId }) => packId).join(", ")}] ${
        isInfinite ? "infinite mode" : `Questions: ${questions.length}`
      }`
    });
  }

  public nextQuestion() {
    if (!this.hasNextQuestion) {
      throw new Error("No more questions in this quiz");
    }

    const state = this.store.getState();
    if (state.quizState.isInfinite && !state.questions.queue.length) {
      const packs = state.enabledPacks.map(packId => STUDY_PACK_LOOKUP[packId]);
      const questions = makeQuiz(packs, this.amountRange);
      this.store.dispatch(replenishInfiniteQuiz(questions));
    }

    this.store.dispatch(nextQuestion());
  }
}
