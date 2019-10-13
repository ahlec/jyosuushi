import { NumericConjugationOptions } from "./japanese/interfaces";

export interface ExternalLink {
  url: string;
  displayText: string;
  additionalDescription: string | null;
  siteName: string;
}

export interface CounterDisambiguation {
  counter1Id: string;
  counter2Id: string;
  disambiguation: string;
}

export interface Counter {
  counterId: string;
  englishName: string;
  kana: string;
  kanji: string | null;
  conjugationOptions: NumericConjugationOptions;
  irregulars: { [amount: number]: ReadonlyArray<string> };
  notes: string | null;
  externalLinks: ReadonlyArray<ExternalLink>;
  disambiguations: { [counterId: string]: CounterDisambiguation | undefined };
}

export enum CounterItemRelevance {
  Unknown,
  RarelyUsed,
  Situational,
  Common,
  Best
}

export interface ItemCounter {
  counterId: string;
  relevance: CounterItemRelevance;
}

export interface Item {
  itemId: string;
  counters: ReadonlyArray<ItemCounter>;
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
