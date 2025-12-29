import type { PostHog } from "posthog-js/react";
import { CounterCollection } from "@jyosuushi/interfaces";

import { AmountRange } from "@jyosuushi/redux";
import {
  endQuiz,
  nextQuestion,
  restartQuiz,
  startQuiz,
} from "@jyosuushi/redux/actions";
import { Store } from "@jyosuushi/redux/store";
import { isUserCollection } from "@jyosuushi/utils/typeguards";

export type QuizMode = "regular" | "infinite";

class QuizManager {
  public constructor(
    private readonly store: Store,
    private readonly posthog: PostHog,
  ) {}

  public get hasNextQuestion(): boolean {
    const state = this.store.getState();
    if (state.quizState.state === "not-in-quiz") {
      return false;
    }

    switch (state.quizState.mode) {
      case "regular": {
        return !!state.questions.queue.length;
      }
      case "infinite": {
        return true;
      }
    }
  }

  private get amountRange(): AmountRange {
    const state = this.store.getState();
    return state.settings.amountRange;
  }

  public startNewQuiz(
    collections: readonly CounterCollection[],
    mode: QuizMode,
  ): void {
    if (!collections.length) {
      throw new Error("Must provide at least one collection to quiz over.");
    }

    const amountRange = this.amountRange;
    this.store.dispatch(startQuiz(collections, mode, amountRange));

    this.posthog.capture("quiz-started", {
      amountRange,
      mode,
      numCollections: collections.length,
    });

    collections.forEach((collection): void => {
      this.posthog.capture("collection-used-in-quiz", {
        id: collection.id,
        kind: isUserCollection(collection) ? "user" : "standard",
      });
    });
  }

  public endQuiz(): void {
    const { scorecard } = this.store.getState();

    this.posthog.capture("quiz-completed", {
      numCorrectAnswers: scorecard.numCorrectAnswers,
      numIgnoredAnswers: scorecard.numIgnoredAnswers,
      numSkippedQuestions: scorecard.numSkippedQuestions,
      numWrongAnswers: scorecard.numIncorrectAnswers,
    });

    this.store.dispatch(endQuiz());
  }

  public restart(): void {
    this.store.dispatch(restartQuiz());
    this.posthog.capture("quiz-restarted");
  }

  public nextQuestion(): void {
    if (!this.hasNextQuestion) {
      throw new Error("No more questions in this quiz");
    }

    this.store.dispatch(nextQuestion());
  }
}

export default QuizManager;
