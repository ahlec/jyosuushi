import { memoize } from "lodash";
import { getLeadingConsonant } from "./hepburn";
import { Gyou, HIRAGANA } from "./kana";
import {
  breakDownNumber,
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

const COUNTER_K_P_OVERRIDES: FinalNumberOverrides = {
  1: I_SMALLTSU,
  6: RO_SMALLTSU,
  8: HA_SMALLTSU,
  [JYUU]: JI_JYU_SMALLTSU,
  [HYAKU]: HYA_SMALLTSU
};

const COUNTER_S_T_OVERRIDES: FinalNumberOverrides = {
  1: I_SMALLTSU,
  8: HA_SMALLTSU,
  [JYUU]: JI_JYU_SMALLTSU
};

const COUNTER_H_OVERRIDES: FinalNumberOverrides = {
  1: I_SMALLTSU,
  6: RO_SMALLTSU,
  8: HA_SMALLTSU,
  [JYUU]: JI_JYU_SMALLTSU,
  [HYAKU]: HYA_SMALLTSU
};

const COUNTER_W_OVERRIDES: FinalNumberOverrides = {
  4: [
    {
      kana: "よ",
      kanji: "四"
    },
    {
      kana: "よん",
      kanji: "四"
    }
  ],
  6: [
    ...RO_SMALLTSU,
    {
      kana: "ろく",
      kanji: "六"
    }
  ],
  8: [
    ...HA_SMALLTSU,
    {
      kana: "はち",
      kanji: "八"
    }
  ],
  10: JI_SMALLTSU
};

function conjugateNumberAndCounterInternal(
  amount: number,
  counter: JapaneseWord
): ReadonlyArray<JapaneseWord> {
  const counterFirstConsonant = getLeadingConsonant(counter.kana);
  const amountBreakdown = breakDownNumber(amount);
  let overrides: FinalNumberOverrides | undefined;
  let changedCounterGyou: Gyou[] | undefined;
  switch (counterFirstConsonant) {
    case "k":
    case "p": {
      overrides = COUNTER_K_P_OVERRIDES;
      break;
    }
    case "s":
    case "t": {
      overrides = COUNTER_S_T_OVERRIDES;
      break;
    }
    case "h":
    case "f": {
      overrides = COUNTER_H_OVERRIDES;

      switch (amountBreakdown.lowestUnit) {
        case "man":
        case "sen": {
          changedCounterGyou = counterFirstConsonant === "h" ? ["ba"] : ["pa"];
          break;
        }
        case "hyaku":
        case "jyuu": {
          changedCounterGyou = ["pa"];
          break;
        }
        case "solo": {
          switch (amountBreakdown.solo) {
            case 1:
            case 6:
            case 8: {
              changedCounterGyou = ["pa"];
              break;
            }
            case 3: {
              changedCounterGyou =
                counterFirstConsonant === "h" ? ["ba"] : ["pa"];
              break;
            }
            case 4: {
              changedCounterGyou = ["ha", "pa"];
              break;
            }
          }

          break;
        }
      }
      break;
    }
    case "w": {
      overrides = COUNTER_W_OVERRIDES;

      switch (amountBreakdown.lowestUnit) {
        case "jyuu": {
          changedCounterGyou = ["pa"];
          break;
        }
        case "solo": {
          switch (amountBreakdown.solo) {
            case 3: {
              changedCounterGyou = ["ba"];
              break;
            }
            // TODO: Special cases for 4, 6, 8
          }
          break;
        }
      }
      break;
    }
  }

  let finalizedCounter: JapaneseWord[];
  if (changedCounterGyou) {
    const firstKana = counter.kana[0];
    const followingKana = counter.kana.slice(1);
    finalizedCounter = changedCounterGyou.map(gyou => ({
      kana: HIRAGANA.changeGyou(firstKana, gyou) + followingKana,
      kanji: counter.kanji
    }));
  } else {
    finalizedCounter = [counter];
  }

  return permutateWords([
    conjugateNumberInternal(amountBreakdown, overrides),
    finalizedCounter
  ]);
}

export const conjugateNumberAndCounter: (
  amount: number,
  counter: JapaneseWord
) => ReadonlyArray<JapaneseWord> = memoize(conjugateNumberAndCounterInternal);
