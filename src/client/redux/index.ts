import { Counter, PendingQuestion, Question } from "@jyosuushi/interfaces";

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

export interface QuestionsState {
  currentQuestion: Question | null;
  queue: ReadonlyArray<PendingQuestion>;
  asked: ReadonlyArray<Question>;
  enabledCounters: ReadonlyArray<string>;
}

export interface CountersStateItem {
  studyPacks: ReadonlyArray<string>;
  counter: Counter;
}

export interface CountersState {
  [counterId: string]: CountersStateItem;
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

export interface QuizState {
  isInfinite: boolean;
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
  counters: CountersState;
  enabledPacks: ReadonlyArray<string>;
  questions: QuestionsState;
  quizState: QuizState;
  scorecard: Scorecard;
  settings: Settings;
  user: User;
  userAnswers: ReadonlyArray<UserAnswer>;
}
