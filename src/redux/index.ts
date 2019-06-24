import { Counter, Item, PendingQuestion, Question } from "../interfaces";

export type LocalizationLanguage = "english";

export interface Settings {
  localization: LocalizationLanguage;
}

export interface Scorecard {
  missedCounterTallies: { [counterId: string]: number };
  mostMissedCounterId: string | null;
  numCorrectAnswers: number;
  numIncorrectAnswers: number;
  numSkippedQuestions: number;
  numIgnoredAnswers: number;
}

export interface ItemsState {
  [itemId: string]: Item;
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

export type QuizState =
  | "not-in-quiz"
  | "waiting-for-answer"
  | "reviewing-answer"
  | "quiz-wrapup";

export interface Session {
  numQuestionsAsked: number;
}

export interface State {
  counters: CountersState;
  enabledPacks: ReadonlyArray<string>;
  items: ItemsState;
  questions: QuestionsState;
  quizState: QuizState;
  scorecard: Scorecard;
  session: Session;
  settings: Settings;
  userAnswers: ReadonlyArray<UserAnswer>;
}
