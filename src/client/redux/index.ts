import {
  Counter,
  CounterCollectionDescriptor,
  PendingQuestion,
  Question,
} from "@jyosuushi/interfaces";

export enum AmountRange {
  Small = "small",
  Medium = "medium",
  Large = "large",
  Giant = "giant",
}

export interface Settings {
  amountRange: AmountRange;
  infiniteMode: boolean;
}

export interface Scorecard {
  missedCounterTallies: { [counterId: string]: number };
  mostMissedCounterId: string | null;
  numCorrectAnswers: number;
  numIncorrectAnswers: number;
  numSkippedQuestions: number;
  numIgnoredAnswers: number;
}

export interface QuizCounterDefinition {
  counterId: string;
  collections: readonly CounterCollectionDescriptor[];
}

export type DefinedQuizCounters = {
  [counterId: string]: QuizCounterDefinition;
};

export interface QuestionsState {
  currentQuestion: Question | null;
  queue: ReadonlyArray<PendingQuestion>;
  asked: ReadonlyArray<Question>;

  // All of the internal data necessary in order to restart/repopulate/begin
  // this quiz
  seed: {
    amountRange: AmountRange;
    enabledCounters: DefinedQuizCounters;
    shouldReplenishOnExhaustion: boolean;
  };
}

export interface CountersStateItem {
  studyPacks: ReadonlyArray<string>;
  counter: Counter;
}

export type UserAnswerJudgment =
  | "incorrect"
  | "correct"
  | "ignored"
  | "skipped";

export interface UserAnswer {
  input: string | null;
  judgment: UserAnswerJudgment;
}

export type QuizMode = "regular" | "infinite";

export interface QuizState {
  mode: QuizMode;
  state:
    | "not-in-quiz"
    | "waiting-for-answer"
    | "reviewing-answer"
    | "quiz-wrapup";
}

export interface User {
  lastAccessedVersion: string | null;
  numQuestionsAsked: number;
}

export interface State {
  questions: QuestionsState;
  quizState: QuizState;
  scorecard: Scorecard;
  settings: Settings;
  user: User;
  userAnswers: ReadonlyArray<UserAnswer>;
}
