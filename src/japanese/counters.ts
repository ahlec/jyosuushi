import { flatten, memoize } from "lodash";

import {
  CounterReading,
  Counter,
  Conjugation,
  CounterWagoStyle,
  CountingSystem
} from "@jyosuushi/interfaces";

import { getLeadingConsonant } from "./hepburn";
import { KangoConjugationOptions } from "./interfaces";
import { Gyou, HIRAGANA } from "./kana";
import { conjugateKangoNumber, FinalNumberChanges } from "./kango";
import { breakDownNumber, HYAKU, JYUU } from "./numbers";
import { Tag } from "./tags";
import {
  castAwayTaggable,
  permutateTaggableWords,
  TaggableJapaneseWord,
  uniqueWords
} from "./words";

/* eslint-disable sort-keys */
// JUSTIFICATION: We want to declare everything in a natural way of incrementing
const KANGO_COUNTER_K_P_CHANGES: FinalNumberChanges = {
  1: [[{ type: "trailing-small-tsu" }]],
  6: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }], [{ type: "preserve" }]],
  [JYUU]: [
    [{ type: "trailing-small-tsu" }],
    [{ type: "replace", kana: "じっ", kanji: "十" }]
  ],
  [HYAKU]: [[{ type: "trailing-small-tsu" }]]
};

const KANGO_COUNTER_S_T_CHANGES: FinalNumberChanges = {
  1: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]],
  [JYUU]: [
    [{ type: "trailing-small-tsu" }],
    [{ type: "replace", kana: "じっ", kanji: "十" }]
  ]
};

const KANGO_COUNTER_H_CHANGES: FinalNumberChanges = {
  1: [[{ type: "trailing-small-tsu" }]],
  6: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]],
  [JYUU]: [
    [{ type: "trailing-small-tsu" }],
    [{ type: "replace", kana: "じっ", kanji: "十" }]
  ],
  [HYAKU]: [[{ type: "trailing-small-tsu" }]]
};

const KANGO_COUNTER_W_CHANGES: FinalNumberChanges = {
  4: [
    [
      {
        kana: "よ",
        kanji: "四",
        type: "replace"
      },
      { type: "tag", tag: "counter-wa-4-yo" }
    ],
    [
      {
        kana: "よん",
        kanji: "四",
        type: "replace"
      }
    ]
  ],
  6: [
    [
      {
        type: "trailing-small-tsu"
      },
      { type: "tag", tag: "counter-wa-6-8-small-tsu" }
    ],
    [
      {
        kana: "ろく",
        kanji: "六",
        type: "replace"
      },
      {
        tag: "counter-wa-6-8-full-num",
        type: "tag"
      }
    ]
  ],
  8: [
    [
      { type: "trailing-small-tsu" },
      { type: "tag", tag: "counter-wa-6-8-small-tsu" }
    ],
    [
      {
        kana: "はち",
        kanji: "八",
        type: "replace"
      },
      {
        tag: "counter-wa-6-8-full-num",
        type: "tag"
      }
    ]
  ],
  [JYUU]: [[{ type: "replace", kana: "じっ", kanji: "十" }]]
};
/* eslint-enable sort-keys */

interface CounterChange {
  gyou?: Gyou;
  tag?: Tag;
}

const COUNTER_BA_GYOU: Readonly<CounterChange> = {
  gyou: "ba"
};

const COUNTER_PA_GYOU: Readonly<CounterChange> = {
  gyou: "pa"
};

function conjugateRegularWagoReading(
  amount: number,
  counterId: string,
  style: CounterWagoStyle
): ReadonlyArray<Conjugation> {
  throw new Error("TODO!");
}

function conjugateRegularKangoReading(
  amount: number,
  counterId: string,
  readingKana: string,
  conjugationOptions: KangoConjugationOptions
): ReadonlyArray<Conjugation> {
  const counterFirstConsonant = getLeadingConsonant(readingKana);
  const amountBreakdown = breakDownNumber(amount);
  let numberChanges: FinalNumberChanges | undefined;
  let counterChanges: CounterChange[] | undefined;
  switch (counterFirstConsonant) {
    case "k":
    case "p": {
      numberChanges = KANGO_COUNTER_K_P_CHANGES;
      break;
    }
    case "s":
    case "t": {
      numberChanges = KANGO_COUNTER_S_T_CHANGES;
      break;
    }
    case "h":
    case "f": {
      numberChanges = KANGO_COUNTER_H_CHANGES;

      switch (amountBreakdown.lowestUnit) {
        case "man":
        case "sen": {
          counterChanges =
            counterFirstConsonant === "h"
              ? [COUNTER_BA_GYOU]
              : [COUNTER_PA_GYOU];
          break;
        }
        case "hyaku":
        case "jyuu": {
          counterChanges = [COUNTER_PA_GYOU];
          break;
        }
        case "solo": {
          switch (amountBreakdown.solo) {
            case 1:
            case 6:
            case 8: {
              counterChanges = [COUNTER_PA_GYOU];
              break;
            }
            case 3: {
              counterChanges =
                counterFirstConsonant === "h"
                  ? [COUNTER_BA_GYOU]
                  : [COUNTER_PA_GYOU];
              break;
            }
            case 4: {
              counterChanges = [{}, COUNTER_PA_GYOU];
              break;
            }
          }

          break;
        }
      }
      break;
    }
    case "w": {
      numberChanges = KANGO_COUNTER_W_CHANGES;

      switch (amountBreakdown.lowestUnit) {
        case "jyuu": {
          counterChanges = [COUNTER_PA_GYOU];
          break;
        }
        case "solo": {
          switch (amountBreakdown.solo) {
            case 3: {
              counterChanges = [COUNTER_BA_GYOU];
              break;
            }
            case 4: {
              counterChanges = [{}, { gyou: "ba", tag: "counter-wa-4-ba" }];
              break;
            }
            case 6:
            case 8: {
              counterChanges = [
                { tag: "counter-wa-6-8-wa" },
                { gyou: "pa", tag: "counter-wa-6-8-pa" }
              ];
              break;
            }
          }
          break;
        }
      }
      break;
    }
  }

  let finalizedCounter: TaggableJapaneseWord[];
  if (counterChanges) {
    const firstKana = readingKana[0];
    const followingKana = readingKana.slice(1);
    finalizedCounter = counterChanges.map(({ gyou, tag }) => ({
      kana: gyou
        ? HIRAGANA.changeGyou(firstKana, gyou) + followingKana
        : readingKana,
      tags: tag ? new Set([tag]) : new Set()
    }));
  } else {
    finalizedCounter = [
      {
        kana: readingKana,
        tags: new Set()
      }
    ];
  }

  const words = permutateTaggableWords([
    conjugateKangoNumber(amount, conjugationOptions, numberChanges),
    finalizedCounter
  ]);

  return uniqueWords(castAwayTaggable(words)).map(({ kana }) => ({
    amount,
    counterId,
    countingSystem: CountingSystem.Kango,
    reading: kana
  }));
}

function conjugateReading(
  amount: number,
  counterId: string,
  reading: CounterReading
): ReadonlyArray<Conjugation> {
  const regularConjugations: Conjugation[] = [];

  let appendRegularKangoReadings: boolean;
  if (reading.wagoStyle && amount <= reading.wagoStyle.rangeEndInclusive) {
    regularConjugations.push(
      ...conjugateRegularWagoReading(amount, counterId, reading.wagoStyle)
    );

    switch (amount) {
      case 1: {
        appendRegularKangoReadings = reading.wagoStyle.alsoUsesKangoIchi;
        break;
      }
      case 2: {
        appendRegularKangoReadings = reading.wagoStyle.alsoUsesKangoNi;
        break;
      }
      case 3: {
        appendRegularKangoReadings = reading.wagoStyle.alsoUsesKangoSan;
        break;
      }
      default: {
        appendRegularKangoReadings = false;
        break;
      }
    }
  } else {
    appendRegularKangoReadings = true;
  }

  if (appendRegularKangoReadings) {
    regularConjugations.push(
      ...conjugateRegularKangoReading(
        amount,
        counterId,
        reading.kana,
        reading.kangoConjugationOptions
      )
    );
  }

  if (!reading.irregulars[amount]) {
    return regularConjugations;
  }

  const results: ConjugationReading[] = [];
  for (const irregular of reading.irregulars[amount]) {
    // Because defining a single irregular means that we don't display the
    // conjugations, we need to define regular conjugations alongside irregular
    // ones in the database if there is even a single irregular. However,
    // let's not display them as irregular on the frontend.
    results.push({
      kana: irregular
    });
  }

  return results;
}

/**
 * A function which is used to calculate all of the possible conjugations of
 * the specified counter at the specified amount.
 *
 * Behind the scenes, this is memoizing; the internal mechanisms of the
 * memoization is not publicly available.
 */
export const conjugateCounter: (
  amount: number,
  counter: Counter
) => ReadonlyArray<Conjugation> = memoize(
  (amount: number, counter: Counter): ReadonlyArray<Conjugation> => {
    if (amount <= 0) {
      throw new Error("Negative numbers and zero are not implemented (yet?)");
    }

    return flatten(
      counter.readings.map(reading =>
        conjugateReading(amount, counter.counterId, reading)
      )
    );
  },
  (amount: number, counter: Counter) => [amount, counter.counterId].join("-")
);
