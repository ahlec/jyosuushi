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
