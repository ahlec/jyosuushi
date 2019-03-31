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
  name: string;
  kana: string;
  kanji: string | null;
  irregulars: { [amount: number]: string };
}

export interface Item {
  itemId: string;
  counters: ReadonlyArray<string>;
  singular: string;
  plural: string;
  minQuantity: number;
  maxQuantity: number;
}

export interface ItemsState {
  [itemId: string]: Item;
}

export interface Answer {
  counterId: string;
  isIrregular: boolean;
  kana: string;
  kanji: string | null;
}

export interface Question {
  amount: number;
  itemId: string;
  validAnswers: ReadonlyArray<Answer>;
}

export interface CountersStateItem {
  studyPacks: ReadonlyArray<string>;
  counter: Counter;
}

export interface CountersState {
  [counterId: string]: CountersStateItem;
}

export interface State {
  counters: CountersState;
  currentQuestion: Question | null;
  enabledPacks: ReadonlyArray<string>;
  items: ItemsState;
  scorecard: Scorecard;
  settings: Settings;
}
