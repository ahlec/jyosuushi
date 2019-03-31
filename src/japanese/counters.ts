import { memoize } from "lodash";
import { getLeadingConsonant } from "./hepburn";
import {
  conjugateNumberInternal,
  FinalNumberOverrides,
  HYAKU,
  JYUU
} from "./numbers";
import { JapaneseWord, permutateWords } from "./words";

const I_SMALLTSU: ReadonlyArray<JapaneseWord> = [
  {
    kana: "いっ",
    kanji: "一"
  }
];

const RO_SMALLTSU: ReadonlyArray<JapaneseWord> = [
  {
    kana: "ろっ",
    kanji: "六"
  }
];

const HA_SMALLTSU: ReadonlyArray<JapaneseWord> = [
  { kana: "はっ", kanji: "八" }
];

const JI_SMALLTSU: ReadonlyArray<JapaneseWord> = [
  {
    kana: "じっ",
    kanji: "十"
  }
];

const JYU_SMALLTSU: ReadonlyArray<JapaneseWord> = [
  {
    kana: "じゅっ",
    kanji: "十"
  }
];

const HYA_SMALLTSU: ReadonlyArray<JapaneseWord> = [
  {
    kana: "ひゃっ",
    kanji: "百"
  }
];

const JI_JYU_SMALLTSU: ReadonlyArray<JapaneseWord> = [
  ...JI_SMALLTSU,
  ...JYU_SMALLTSU
];

const COUNTER_K_OVERRIDES: FinalNumberOverrides = {
  1: I_SMALLTSU,
  6: RO_SMALLTSU,
  8: HA_SMALLTSU,
  [JYUU]: JI_JYU_SMALLTSU,
  [HYAKU]: HYA_SMALLTSU
};

const COUNTER_H_OVERRIDES: FinalNumberOverrides = {
  1: I_SMALLTSU,
  6: RO_SMALLTSU,
  8: HA_SMALLTSU,
  [JYUU]: JI_JYU_SMALLTSU,
  [HYAKU]: HYA_SMALLTSU
};

function conjugateNumberAndCounterInternal(
  amount: number,
  counter: JapaneseWord
): ReadonlyArray<JapaneseWord> {
  const counterFirstConsonant = getLeadingConsonant(counter.kana);
  let overrides: FinalNumberOverrides | undefined;
  switch (counterFirstConsonant) {
    case "k": {
      overrides = COUNTER_K_OVERRIDES;
      break;
    }
    case "h":
    case "f": {
      overrides = COUNTER_H_OVERRIDES;
      break;
    }
  }

  return permutateWords([
    conjugateNumberInternal(amount, overrides),
    [counter]
  ]);
}

export const conjugateNumberAndCounter: (
  amount: number,
  counter: JapaneseWord
) => ReadonlyArray<JapaneseWord> = memoize(conjugateNumberAndCounterInternal);
