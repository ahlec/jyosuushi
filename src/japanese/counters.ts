import { flatten, memoize } from "lodash";

import {
  CounterReading,
  Counter,
  Conjugation,
  CounterWagoStyle,
  CountingSystem,
} from "@jyosuushi/interfaces";

import { getLeadingConsonant } from "./hepburn";
import { KangoConjugationOptions } from "./interfaces";
import { Gyou, HIRAGANA } from "./kana";
import { conjugateKangoNumber, FinalNumberChanges } from "./kango";
import { getKanjiForNumber } from "./kanji";
import { breakDownNumber, HYAKU, JYUU } from "./numbers";
import { Tag } from "./tags";
import { conjugateWagoNumber } from "./wago";
import {
  castAwayTaggable,
  permutateTaggableWords,
  TaggableJapaneseWord,
  uniqueWords,
} from "./words";

/* eslint-disable sort-keys */
// JUSTIFICATION: We want to declare everything in a natural way of incrementing
const KANGO_COUNTER_K_P_CHANGES: FinalNumberChanges = {
  1: [[{ type: "trailing-small-tsu" }]],
  6: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }], [{ type: "preserve" }]],
  [JYUU]: [
    [{ type: "trailing-small-tsu" }],
    [{ type: "replace", kana: "じっ", kanji: "十" }],
  ],
  [HYAKU]: [[{ type: "trailing-small-tsu" }]],
};

const KANGO_COUNTER_S_T_CHANGES: FinalNumberChanges = {
  1: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]],
  [JYUU]: [
    [{ type: "trailing-small-tsu" }],
    [{ type: "replace", kana: "じっ", kanji: "十" }],
  ],
};

const KANGO_COUNTER_H_CHANGES: FinalNumberChanges = {
  1: [[{ type: "trailing-small-tsu" }]],
  6: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]],
  [JYUU]: [
    [{ type: "trailing-small-tsu" }],
    [{ type: "replace", kana: "じっ", kanji: "十" }],
  ],
  [HYAKU]: [[{ type: "trailing-small-tsu" }]],
};

const KANGO_COUNTER_W_CHANGES: FinalNumberChanges = {
  4: [
    [
      {
        kana: "よ",
        kanji: "四",
        type: "replace",
      },
      { type: "tag", tag: "counter-wa-4-yo" },
    ],
    [
      {
        kana: "よん",
        kanji: "四",
        type: "replace",
      },
    ],
  ],
  6: [
    [
      {
        type: "trailing-small-tsu",
      },
      { type: "tag", tag: "counter-wa-6-8-small-tsu" },
    ],
    [
      {
        kana: "ろく",
        kanji: "六",
        type: "replace",
      },
      {
        tag: "counter-wa-6-8-full-num",
        type: "tag",
      },
    ],
  ],
  8: [
    [
      { type: "trailing-small-tsu" },
      { type: "tag", tag: "counter-wa-6-8-small-tsu" },
    ],
    [
      {
        kana: "はち",
        kanji: "八",
        type: "replace",
      },
      {
        tag: "counter-wa-6-8-full-num",
        type: "tag",
      },
    ],
  ],
  [JYUU]: [[{ type: "replace", kana: "じっ", kanji: "十" }]],
};
/* eslint-enable sort-keys */

interface CounterChange {
  gyou?: Gyou;
  tag?: Tag;
}

const COUNTER_BA_GYOU: Readonly<CounterChange> = {
  gyou: "ba",
};

const COUNTER_PA_GYOU: Readonly<CounterChange> = {
  gyou: "pa",
};

function conjugateRegularWagoReading(
  amount: number,
  counterId: string,
  kanji: ReadonlyArray<string> | null,
  style: CounterWagoStyle
): ReadonlyArray<Conjugation> {
  const numbers = conjugateWagoNumber(amount);
  return numbers.map(
    (numberBase): Conjugation => ({
      amount,
      counterId,
      countingSystem: CountingSystem.Wago,
      irregularType: null,
      kanji,
      reading: `${numberBase}${style.kana}`,
    })
  );
}

function conjugateRegularKangoReading(
  amount: number,
  counterId: string,
  kanji: ReadonlyArray<string> | null,
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
                { gyou: "pa", tag: "counter-wa-6-8-pa" },
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
    finalizedCounter = counterChanges.map(
      ({ gyou, tag }): TaggableJapaneseWord => ({
        kana: gyou
          ? HIRAGANA.changeGyou(firstKana, gyou) + followingKana
          : readingKana,
        tags: tag ? new Set([tag]) : new Set(),
      })
    );
  } else {
    finalizedCounter = [
      {
        kana: readingKana,
        tags: new Set(),
      },
    ];
  }

  const words = permutateTaggableWords([
    conjugateKangoNumber(amount, conjugationOptions, numberChanges),
    finalizedCounter,
  ]);

  return uniqueWords(castAwayTaggable(words)).map(({ kana }) => ({
    amount,
    counterId,
    countingSystem: CountingSystem.Kango,
    irregularType: null,
    kanji,
    reading: kana,
  }));
}

function conjugateRegularReadings(
  amount: number,
  counterId: string,
  kanji: ReadonlyArray<string> | null,
  reading: CounterReading
): ReadonlyArray<Conjugation> {
  const regularConjugations: Conjugation[] = [];

  let appendRegularKangoReadings: boolean;
  if (reading.wagoStyle && amount <= reading.wagoStyle.rangeEndInclusive) {
    regularConjugations.push(
      ...conjugateRegularWagoReading(
        amount,
        counterId,
        kanji,
        reading.wagoStyle
      )
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
        kanji,
        reading.kana,
        reading.kangoConjugationOptions
      )
    );
  }

  return regularConjugations;
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

    const results: Conjugation[] = [];
    let includeRegularReadings = true;

    const irregularDefinitions = counter.irregulars[amount];
    if (irregularDefinitions && irregularDefinitions.length) {
      for (const irregular of irregularDefinitions) {
        results.push({
          amount,
          counterId: counter.counterId,
          countingSystem: irregular.countingSystem,
          irregularType: irregular.type,
          kanji: null,
          reading: irregular.reading,
        });

        if (irregular.doesPresenceEraseRegularConjugations) {
          includeRegularReadings = false;
        }
      }
    }

    if (includeRegularReadings) {
      let kanji: ReadonlyArray<string> | null;
      if (counter.kanji) {
        const amountKanji = getKanjiForNumber(amount);

        /**
         * TODO [JSS-10]: Add ability to associate readings with particular kanji (if necessary)
         */
        kanji = [
          counter.kanji.primaryKanji,
          ...counter.kanji.additionalKanji,
        ].map((counterKanji): string => `${amountKanji}${counterKanji}`);
      } else {
        kanji = null;
      }

      results.push(
        ...flatten(
          counter.readings.map((reading) =>
            conjugateRegularReadings(amount, counter.counterId, kanji, reading)
          )
        )
      );
    }

    return results;
  },
  (amount: number, counter: Counter) => [amount, counter.counterId].join("-")
);
