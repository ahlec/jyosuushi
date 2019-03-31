import { memoize } from "lodash";
import { getLeadingConsonant } from "./hepburn";
import { Gyou, HIRAGANA } from "./kana";
import {
  breakDownNumber,
  conjugateNumber,
  FinalNumberChanges,
  HYAKU
} from "./numbers";
import { JapaneseWord, permutateWords } from "./words";

const COUNTER_K_P_CHANGES: FinalNumberChanges = {
  1: ["trailing-small-tsu"],
  6: ["trailing-small-tsu"],
  8: ["trailing-small-tsu"],
  // [JYUU]: JI_JYU_SMALLTSU,
  [HYAKU]: ["trailing-small-tsu"]
};

const COUNTER_S_T_CHANGES: FinalNumberChanges = {
  1: ["trailing-small-tsu"],
  8: ["trailing-small-tsu"]
  // [JYUU]: JI_JYU_SMALLTSU
};

const COUNTER_H_CHANGES: FinalNumberChanges = {
  1: ["trailing-small-tsu"],
  6: ["trailing-small-tsu"],
  8: ["trailing-small-tsu"],
  // [JYUU]: JI_JYU_SMALLTSU,
  [HYAKU]: ["trailing-small-tsu"]
};

// const COUNTER_W_OVERRIDES: FinalNumberOverrides = {
//   4: [
//     {
//       kana: "よ",
//       kanji: "四"
//     },
//     {
//       kana: "よん",
//       kanji: "四"
//     }
//   ],
//   6: [
//     ...RO_SMALLTSU,
//     {
//       kana: "ろく",
//       kanji: "六"
//     }
//   ],
//   8: [
//     ...HA_SMALLTSU,
//     {
//       kana: "はち",
//       kanji: "八"
//     }
//   ],
//   10: JI_SMALLTSU
// };

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
    // case "w": {
    //   overrides = COUNTER_W_OVERRIDES;
    //
    //   switch (amountBreakdown.lowestUnit) {
    //     case "jyuu": {
    //       changedCounterGyou = ["pa"];
    //       break;
    //     }
    //     case "solo": {
    //       switch (amountBreakdown.solo) {
    //         case 3: {
    //           changedCounterGyou = ["ba"];
    //           break;
    //         }
    //         // TODO: Special cases for 4, 6, 8
    //       }
    //       break;
    //     }
    //   }
    //   break;
    // }
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
    conjugateNumber(amount, numberChanges),
    finalizedCounter
  ]);
}

export const conjugateNumberAndCounter: (
  amount: number,
  counter: JapaneseWord
) => ReadonlyArray<JapaneseWord> = memoize(conjugateNumberAndCounterInternal);
