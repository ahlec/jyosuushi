export type LocalizationLanguage = "english";

export interface Settings {
  localization: LocalizationLanguage;
}

export interface Scorecard {
  numQuestionsAsked: number;
  numCorrectAnswers: number;
}

export interface Counter {
  counterId: string;
}

export interface Item {
  itemId: string;
  singular: string;
  plural: string;
}

export interface Question {
  amount: number;
  counterId: string;
  itemId: string;
}

export interface State {
  counters: { [counterId: string]: Counter };
  currentQuestion: Question | null;
  items: { [itemId: string]: Item };
  scorecard: Scorecard;
  settings: Settings;
}
