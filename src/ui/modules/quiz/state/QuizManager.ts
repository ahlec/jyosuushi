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

    this.store.dispatch(startQuiz(collections, mode, this.amountRange));

    const GOOGLE_ANALYTICS_CATEGORY = "Quiz Started";

    this.posthog.capture("quiz-started", {
      category: GOOGLE_ANALYTICS_CATEGORY,
      label: `Mode: ${mode}`,
    });

    let numUserCollections = 0;
    collections.forEach((collection): void => {
      if ("dateCreated" in collection) {
        ++numUserCollections;
        return;
      }

      this.posthog.capture("standard-collection-selected", {
        category: GOOGLE_ANALYTICS_CATEGORY,
        label: `${collection.name} (ID: ${collection.id})`,
      });
    });

    if (numUserCollections) {
      this.posthog.capture("user-collection-selected", {
        category: GOOGLE_ANALYTICS_CATEGORY,
        value: numUserCollections,
      });
    }
  }

  public endQuiz(): void {
    const { scorecard } = this.store.getState();
    const numQuestionsAnswered =
      scorecard.numCorrectAnswers + scorecard.numIncorrectAnswers;

    const GOOGLE_ANALYTICS_CATEGORY = "Quiz Finished";

    this.posthog.capture("questions-answered", {
      category: GOOGLE_ANALYTICS_CATEGORY,
      value: numQuestionsAnswered,
    });

    if (scorecard.numSkippedQuestions) {
      this.posthog.capture("finished-with-skipped-questions", {
        category: GOOGLE_ANALYTICS_CATEGORY,
        value: scorecard.numSkippedQuestions,
      });
    }

    if (scorecard.numIgnoredAnswers) {
      this.posthog.capture("finished-with-ignored-answers", {
        category: GOOGLE_ANALYTICS_CATEGORY,
        value: scorecard.numIgnoredAnswers,
      });
    }

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
