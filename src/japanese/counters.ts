import { memoize } from "lodash";
import { getLeadingConsonant } from "./hepburn";
import { Gyou, HIRAGANA } from "./kana";
import {
  breakDownNumber,
  conjugateNumber,
  FinalNumberChanges,
  HYAKU,
  JYUU
} from "./numbers";
import {
  castAwayTaggable,
  JapaneseWord,
  permutateTaggableWords,
  TaggableJapaneseWord,
  uniqueWords
} from "./words";

const COUNTER_K_P_CHANGES: FinalNumberChanges = {
  1: [[{ type: "trailing-small-tsu" }]],
  6: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]],
  [JYUU]: [
    [{ type: "trailing-small-tsu" }],
    [{ type: "replace", kana: "じっ", kanji: "十" }]
  ],
  [HYAKU]: [[{ type: "trailing-small-tsu" }]]
};

const COUNTER_S_T_CHANGES: FinalNumberChanges = {
  1: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]],
  [JYUU]: [
    [{ type: "trailing-small-tsu" }],
    [{ type: "replace", kana: "じっ", kanji: "十" }]
  ]
};

const COUNTER_H_CHANGES: FinalNumberChanges = {
  1: [[{ type: "trailing-small-tsu" }]],
  6: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]],
  [JYUU]: [
    [{ type: "trailing-small-tsu" }],
    [{ type: "replace", kana: "じっ", kanji: "十" }]
  ],
  [HYAKU]: [[{ type: "trailing-small-tsu" }]]
};

const COUNTER_W_CHANGES: FinalNumberChanges = {
  // 4: [
  //   {
  //     kana: "よ",
  //     kanji: "四"
  //   },
  //   {
  //     kana: "よん",
  //     kanji: "四"
  //   }
  // ],
  6: [
    [
      {
        type: "trailing-small-tsu"
      }
    ],
    [
      {
        type: "replace",
        kana: "ろく",
        kanji: "六"
      }
    ]
  ],
  8: [
    [{ type: "trailing-small-tsu" }],
    [
      {
        type: "replace",
        kana: "はち",
        kanji: "八"
      }
    ]
  ],
  [JYUU]: [[{ type: "replace", kana: "じっ", kanji: "十" }]]
};

function conjugateNumberAndCounterInternal(
  amount: number,
  counter: JapaneseWord
): ReadonlyArray<JapaneseWord> {
  const counterFirstConsonant = getLeadingConsonant(counter.kana);
  const amountBreakdown = breakDownNumber(amount);
  let numberChanges: FinalNumberChanges | undefined;
  let changedCounterGyou: Gyou[] | undefined;
  switch (counterFirstConsonant) {
    case "k":
    case "p": {
      numberChanges = COUNTER_K_P_CHANGES;
      break;
    }
    case "s":
    case "t": {
      numberChanges = COUNTER_S_T_CHANGES;
      break;
    }
    case "h":
    case "f": {
      numberChanges = COUNTER_H_CHANGES;

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
      numberChanges = COUNTER_W_CHANGES;

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

  let finalizedCounter: TaggableJapaneseWord[];
  if (changedCounterGyou) {
    const firstKana = counter.kana[0];
    const followingKana = counter.kana.slice(1);
    finalizedCounter = changedCounterGyou.map(gyou => ({
      kana: HIRAGANA.changeGyou(firstKana, gyou) + followingKana,
      kanji: counter.kanji,
      tags: new Set()
    }));
  } else {
    finalizedCounter = [{ ...counter, tags: new Set() }];
  }

  const words = permutateTaggableWords([
    conjugateNumber(amount, numberChanges),
    finalizedCounter
  ]);
  return uniqueWords(castAwayTaggable(words));
}

export const conjugateNumberAndCounter: (
  amount: number,
  counter: JapaneseWord
) => ReadonlyArray<JapaneseWord> = memoize(conjugateNumberAndCounterInternal);
