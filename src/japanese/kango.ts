import { flatten, memoize, uniqueId } from "lodash";
import { KangoConjugationOptions } from "./interfaces";
import { breakDownNumber, OKU, SEN, MAN, HYAKU, JYUU } from "./numbers";
import { Tag } from "./tags";
import {
  castToTaggable,
  JapaneseWord,
  permutateTaggableWords,
  TaggableJapaneseWord,
} from "./words";

interface FirstTenWords extends JapaneseWord {
  isValid?: (options: KangoConjugationOptions) => boolean;
  strange?: boolean;
}

const FIRST_TEN_NUMBERS: ReadonlyArray<ReadonlyArray<
  Readonly<FirstTenWords>
>> = [
  [
    {
      kana: "ゼロ",
    },
    {
      kana: "れい",
    },
  ],
  [
    {
      kana: "いち",
    },
  ],
  [
    {
      kana: "に",
    },
  ],
  [
    {
      kana: "さん",
    },
  ],
  [
    {
      isValid: (options): boolean => options.allowsYonFor4,
      kana: "よん",
    },
    {
      isValid: (options): boolean => options.allowsYoFor4,
      kana: "よ",
      strange: true,
    },
    {
      isValid: (options): boolean => options.allowsShiFor4,
      kana: "し",
      strange: true,
    },
  ],
  [
    {
      kana: "ご",
    },
  ],
  [
    {
      kana: "ろく",
    },
  ],
  [
    {
      isValid: (options): boolean => options.allowsShichiFor7,
      kana: "しち",
      strange: true,
    },
    {
      isValid: (options): boolean => options.allowsNanaFor7,
      kana: "なな",
    },
  ],
  [
    {
      kana: "はち",
    },
  ],
  [
    {
      isValid: (options): boolean => options.allowsKyuuFor9,
      kana: "きゅう",
    },
    {
      isValid: (options): boolean => options.allowsKuFor9,
      kana: "く",
      strange: true,
    },
  ],
];

const OKU_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "おく",
  },
];

const MAN_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "まん",
  },
];

const SEN_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "せん",
  },
];

const ZEN_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "ぜん",
  },
];

const SEN_CHANGES: FinalNumberChanges = {
  1: [[{ type: "omit" }], [{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]],
};

const HYAKU_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "ひゃく",
  },
];

const IPPYAKU_NUMBER: ReadonlyArray<TaggableJapaneseWord> = [
  {
    kana: "ひゃく",
    tags: new Set<Tag>(["hyaku"]),
  },
  {
    kana: "ぴゃく",
    tags: new Set<Tag>(["ippyaku"]),
  },
];

const BYAKU_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "びゃく",
  },
];

const PYAKU_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "ぴゃく",
  },
];

const JYUU_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "じゅう",
  },
];

const HYAKU_CHANGES: FinalNumberChanges = {
  1: [
    [{ type: "omit" }, { tag: "hyaku", type: "tag" }],
    [{ type: "trailing-small-tsu" }, { tag: "ippyaku", type: "tag" }],
  ],
  6: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]],
};

const OMIT_ONE: FinalNumberChanges = {
  1: [[{ type: "omit" }]],
};

type NumberChange =
  | { type: "omit" }
  | { type: "replace"; kana: string; kanji: string }
  | { type: "trailing-small-tsu" }
  | { type: "tag"; tag: Tag }
  | { type: "preserve" };

export interface FinalNumberChanges {
  [amount: number]: ReadonlyArray<ReadonlyArray<NumberChange>>;
}

function applySingleChange(
  words: ReadonlyArray<TaggableJapaneseWord>,
  change: NumberChange
): ReadonlyArray<TaggableJapaneseWord> {
  switch (change.type) {
    case "trailing-small-tsu": {
      return words.map(
        ({ kana, tags }): TaggableJapaneseWord => ({
          kana: kana.slice(0, -1) + "っ",
          tags,
        })
      );
    }
    case "omit": {
      return [{ kana: "", tags: new Set() }];
    }
    case "replace": {
      return [
        {
          kana: change.kana,
          tags: new Set(),
        },
      ];
    }
    case "tag": {
      return words.map(
        (word): TaggableJapaneseWord => ({
          ...word,
          tags: new Set(word.tags).add(change.tag),
        })
      );
    }
    case "preserve": {
      return words;
    }
  }
}

function applyUniqueChanges(
  words: ReadonlyArray<JapaneseWord | TaggableJapaneseWord>,
  changes: ReadonlyArray<ReadonlyArray<NumberChange>> | false | undefined
): ReadonlyArray<TaggableJapaneseWord> {
  if (!changes) {
    return castToTaggable(words);
  }

  const results: Array<ReadonlyArray<TaggableJapaneseWord>> = [];
  for (const changeSet of changes) {
    let currentPermutation: ReadonlyArray<TaggableJapaneseWord> = castToTaggable(
      words
    );
    for (const change of changeSet) {
      currentPermutation = applySingleChange(currentPermutation, change);
    }

    results.push(currentPermutation);
  }

  return flatten(results);
}

const TYPICAL_COUNTING_CONJUGATION_OPTIONS: KangoConjugationOptions = {
  allowsKuFor9: false,
  allowsKyuuFor9: true,
  allowsNanaFor7: true,
  allowsShiFor4: false,
  allowsShichiFor7: false,
  allowsYoFor4: false,
  allowsYonFor4: true,
};

function conjugateKangoNumberInternal(
  amount: number,
  options: KangoConjugationOptions,
  finalNumberChanges?: FinalNumberChanges
): ReadonlyArray<TaggableJapaneseWord> {
  const chunks: Array<ReadonlyArray<TaggableJapaneseWord>> = [];
  const breakdown = breakDownNumber(amount);

  if (breakdown.oku) {
    chunks.push(
      conjugateKangoNumberInternal(
        breakdown.oku,
        TYPICAL_COUNTING_CONJUGATION_OPTIONS,
        OMIT_ONE
      )
    );

    const change =
      finalNumberChanges &&
      breakdown.lowestUnit === "oku" &&
      finalNumberChanges[OKU];
    chunks.push(applyUniqueChanges(OKU_NUMBER, change));
  }

  if (breakdown.man) {
    chunks.push(
      conjugateKangoNumberInternal(
        breakdown.man,
        TYPICAL_COUNTING_CONJUGATION_OPTIONS,
        OMIT_ONE
      )
    );

    const change =
      finalNumberChanges &&
      breakdown.lowestUnit === "man" &&
      finalNumberChanges[MAN];
    chunks.push(applyUniqueChanges(MAN_NUMBER, change));
  }

  if (breakdown.sen) {
    chunks.push(
      conjugateKangoNumberInternal(
        breakdown.sen,
        TYPICAL_COUNTING_CONJUGATION_OPTIONS,
        SEN_CHANGES
      )
    );

    const senBreakdown = breakDownNumber(breakdown.sen);
    const change =
      finalNumberChanges &&
      breakdown.lowestUnit === "sen" &&
      finalNumberChanges[SEN];
    let sen = SEN_NUMBER;
    if (senBreakdown.lowestUnit === "solo" && senBreakdown.solo === 3) {
      sen = ZEN_NUMBER;
    }

    chunks.push(applyUniqueChanges(sen, change));
  }

  if (breakdown.hyaku) {
    chunks.push(
      conjugateKangoNumberInternal(
        breakdown.hyaku,
        TYPICAL_COUNTING_CONJUGATION_OPTIONS,
        HYAKU_CHANGES
      )
    );

    const hyakuBreakdown = breakDownNumber(breakdown.hyaku);
    const change =
      finalNumberChanges &&
      breakdown.lowestUnit === "hyaku" &&
      finalNumberChanges[HYAKU];
    let hyaku = HYAKU_NUMBER;
    if (hyakuBreakdown.lowestUnit === "solo") {
      switch (hyakuBreakdown.solo) {
        case 1: {
          hyaku = IPPYAKU_NUMBER;
          break;
        }
        case 3: {
          hyaku = BYAKU_NUMBER;
          break;
        }
        case 6:
        case 8: {
          hyaku = PYAKU_NUMBER;
          break;
        }
      }
    }

    chunks.push(applyUniqueChanges(hyaku, change));
  }

  if (breakdown.jyuu) {
    chunks.push(
      conjugateKangoNumberInternal(
        breakdown.jyuu,
        TYPICAL_COUNTING_CONJUGATION_OPTIONS,
        OMIT_ONE
      )
    );

    const change =
      finalNumberChanges &&
      breakdown.lowestUnit === "jyuu" &&
      finalNumberChanges[JYUU];
    chunks.push(applyUniqueChanges(JYUU_NUMBER, change));
  }

  if (breakdown.solo) {
    const change =
      finalNumberChanges &&
      breakdown.lowestUnit === "solo" &&
      finalNumberChanges[breakdown.solo];
    chunks.push(
      applyUniqueChanges(
        FIRST_TEN_NUMBERS[breakdown.solo]
          .filter((word) => !word.isValid || word.isValid(options))
          .map(
            (word: Readonly<FirstTenWords>): TaggableJapaneseWord => ({
              kana: word.kana,
              tags: word.strange ? new Set<Tag>(["strange"]) : new Set(),
            })
          ),
        change
      )
    );
  }

  return permutateTaggableWords(chunks);
}

const UNDEFINED_FINAL_CHANGES: FinalNumberChanges = {};
const MEMOIZE_RESOLVER = new Map<FinalNumberChanges, Map<number, string>>();

export const conjugateKangoNumber: (
  amount: number,
  options: KangoConjugationOptions,
  finalNumberChanges?: FinalNumberChanges
) => ReadonlyArray<TaggableJapaneseWord> = memoize(
  conjugateKangoNumberInternal,
  (
    amount: number,
    options: KangoConjugationOptions,
    finalNumberChanges: FinalNumberChanges | undefined = UNDEFINED_FINAL_CHANGES
  ) => {
    let fncMap = MEMOIZE_RESOLVER.get(finalNumberChanges);
    if (!fncMap) {
      fncMap = new Map();
      MEMOIZE_RESOLVER.set(finalNumberChanges, fncMap);
    }

    let id = fncMap.get(amount);
    if (!id) {
      id = uniqueId();
      fncMap.set(amount, id);
    }

    id += `-${[
      Number(options.allowsYonFor4),
      Number(options.allowsYoFor4),
      Number(options.allowsShiFor4),
      Number(options.allowsNanaFor7),
      Number(options.allowsShichiFor7),
      Number(options.allowsKyuuFor9),
      Number(options.allowsKuFor9),
    ].join()}`;

    return id;
  }
);
