import { NumericConjugationOptions } from "./japanese/interfaces";

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

export interface StudyPack {
  packId: string;
  englishName: string;
  counters: ReadonlyArray<Counter>;
}

export interface PendingQuestion {
  itemId: string;
  possibleAmounts: ReadonlyArray<number>;
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
  possibleAmounts: ReadonlyArray<number>;
  validAnswers: ReadonlyArray<Answer>;
}
