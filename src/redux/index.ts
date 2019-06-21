import { NumericConjugationOptions } from "../japanese/interfaces";

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

export interface StudyPack {
  packId: string;
  englishName: string;
  counters: ReadonlyArray<Counter>;
}

export interface Counter {
  counterId: string;
  englishName: string;
  kana: string;
  kanji: string | null;
  conjugationOptions: NumericConjugationOptions;
  irregulars: { [amount: number]: ReadonlyArray<string> };
}

export interface Item {
  itemId: string;
  counters: ReadonlyArray<string>;
  englishSingular: string;
  englishPlural: string;
  minQuantity: number;
  maxQuantity: number;
}

export interface ItemsState {
  [itemId: string]: Item;
}

export enum ConjugationCategory {
  Regular,
  Strange,
  Irregular
}

export interface Answer {
  counterId: string;
  category: ConjugationCategory;
  kana: string;
  kanji: string | null;
}

export interface Question {
  amount: number;
  itemId: string;
  validAnswers: ReadonlyArray<Answer>;
}

export interface QuestionsState {
  currentQuestion: number;
  questions: ReadonlyArray<Question>;
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
