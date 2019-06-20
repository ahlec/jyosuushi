import { flatten, memoize, uniqueId } from "lodash";
import { NumericConjugationOptions } from "./interfaces";
import { Tag } from "./tags";
import {
  castToTaggable,
  JapaneseWord,
  permutateTaggableWords,
  TaggableJapaneseWord
} from "./words";

export const OKU = Math.pow(10, 8);
export const MAN = 10000;
export const SEN = 1000;
export const HYAKU = 100;
export const JYUU = 10;

type Unit = "oku" | "man" | "sen" | "hyaku" | "jyuu" | "solo";

export interface NumberBreakdown {
  oku: number;
  man: number;
  sen: number;
  hyaku: number;
  jyuu: number;
  solo: number;
  lowestUnit: Unit;
}

export const breakDownNumber: (value: number) => NumberBreakdown = memoize(
  (value: number): NumberBreakdown => {
    let remainder = value;
    const oku = Math.floor(remainder / OKU);
    remainder -= oku * OKU;

    const man = Math.floor(remainder / MAN);
    remainder -= man * MAN;

    const sen = Math.floor(remainder / SEN);
    remainder -= sen * SEN;

    const hyaku = Math.floor(remainder / HYAKU);
    remainder -= hyaku * HYAKU;

    const jyuu = Math.floor(remainder / JYUU);
    remainder -= jyuu * JYUU;

    /* tslint:disable:object-literal-sort-keys */
    // JUSTIFICATION: It's much easier to reason about this in numeric descending order.
    return {
      oku,
      man,
      sen,
      hyaku,
      jyuu,
      solo: remainder,
      lowestUnit: remainder
        ? "solo"
        : jyuu
        ? "jyuu"
        : hyaku
        ? "hyaku"
        : sen
        ? "sen"
        : man
        ? "man"
        : oku
        ? "oku"
        : "solo"
    };
    /* tslint:enable:object-literal-sort-keys */
  }
);

interface FirstTenWords extends JapaneseWord {
  isValid?: (options: NumericConjugationOptions) => boolean;
}

const FIRST_TEN_NUMBERS: ReadonlyArray<
  ReadonlyArray<Readonly<FirstTenWords>>
> = [
  [
    {
      kana: "ゼロ",
      kanji: null
    },
    {
      kana: "れい",
      kanji: null
    }
  ],
  [
    {
      kana: "いち",
      kanji: "一"
    }
  ],
  [
    {
      kana: "に",
      kanji: "二"
    }
  ],
  [
    {
      kana: "さん",
      kanji: "三"
    }
  ],
  [
    {
      isValid: options => options.allowsYonFor4,
      kana: "よん",
      kanji: "四"
    },
    {
      isValid: options => options.allowsShiFor4,
      kana: "し",
      kanji: "四"
    }
  ],
  [
    {
      kana: "ご",
      kanji: "五"
    }
  ],
  [
    {
      kana: "ろく",
      kanji: "六"
    }
  ],
  [
    {
      isValid: options => options.allowsShichiFor7,
      kana: "しち",
      kanji: "七"
    },
    {
      isValid: options => options.allowsNanaFor7,
      kana: "なな",
      kanji: "七"
    }
  ],
  [
    {
      kana: "はち",
      kanji: "八"
    }
  ],
  [
    {
      isValid: options => options.allowsKyuuFor9,
      kana: "きゅう",
      kanji: "九"
    },
    {
      isValid: options => options.allowsKuFor9,
      kana: "く",
      kanji: "九"
    }
  ]
];

const OKU_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "おく",
    kanji: "億"
  }
];

const MAN_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "まん",
    kanji: "万"
  }
];

const SEN_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "せん",
    kanji: "千"
  }
];

const ZEN_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "ぜん",
    kanji: "千"
  }
];

const SEN_CHANGES: FinalNumberChanges = {
  1: [[{ type: "omit" }], [{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]]
};

const HYAKU_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "ひゃく",
    kanji: "百"
  }
];

const IPPYAKU_NUMBER: ReadonlyArray<TaggableJapaneseWord> = [
  {
    kana: "ひゃく",
    kanji: "百",
    tags: new Set<Tag>(["hyaku"])
  },
  {
    kana: "ぴゃく",
    kanji: "百",
    tags: new Set<Tag>(["ippyaku"])
  }
];

const BYAKU_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "びゃく",
    kanji: "百"
  }
];

const PYAKU_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "ぴゃく",
    kanji: "百"
  }
];

const JYUU_NUMBER: ReadonlyArray<Readonly<JapaneseWord>> = [
  {
    kana: "じゅう",
    kanji: "十"
  }
];

const HYAKU_CHANGES: FinalNumberChanges = {
  1: [
    [{ type: "omit" }, { type: "tag", tag: "hyaku" }],
    [{ type: "trailing-small-tsu" }, { type: "tag", tag: "ippyaku" }]
  ],
  6: [[{ type: "trailing-small-tsu" }]],
  8: [[{ type: "trailing-small-tsu" }]]
};

const OMIT_ONE: FinalNumberChanges = {
  1: [[{ type: "omit" }]]
};

type NumberChange =
  | { type: "omit" }
  | { type: "replace"; kana: string; kanji: string }
  | { type: "trailing-small-tsu" }
  | { type: "tag"; tag: Tag };

export interface FinalNumberChanges {
  [amount: number]: ReadonlyArray<ReadonlyArray<NumberChange>>;
}

function applySingleChange(
  words: ReadonlyArray<TaggableJapaneseWord>,
  change: NumberChange
): ReadonlyArray<TaggableJapaneseWord> {
  switch (change.type) {
    case "trailing-small-tsu": {
      return words.map(({ kana, kanji, tags }) => ({
        kana: kana.slice(0, -1) + "っ",
        kanji,
        tags
      }));
    }
    case "omit": {
      return [{ kana: "", kanji: "", tags: new Set() }];
    }
    case "replace": {
      return [
        {
          kana: change.kana,
          kanji: change.kanji,
          tags: new Set()
        }
      ];
    }
    case "tag": {
      return words.map(word => ({
        ...word,
        tags: new Set(word.tags).add(change.tag)
      }));
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
    let currentPermutation: ReadonlyArray<
      TaggableJapaneseWord
    > = castToTaggable(words);
    for (const change of changeSet) {
      currentPermutation = applySingleChange(currentPermutation, change);
    }

    results.push(currentPermutation);
  }

  return flatten(results);
}

function conjugateNumberInternal(
  breakdown: NumberBreakdown,
  options: NumericConjugationOptions,
  finalNumberChanges?: FinalNumberChanges
): ReadonlyArray<TaggableJapaneseWord> {
  const chunks: Array<ReadonlyArray<TaggableJapaneseWord>> = [];

  if (breakdown.oku) {
    chunks.push(conjugateNumber(breakdown.oku, options, OMIT_ONE));

    const change =
      finalNumberChanges &&
      breakdown.lowestUnit === "oku" &&
      finalNumberChanges[OKU];
    chunks.push(applyUniqueChanges(OKU_NUMBER, change));
  }

  if (breakdown.man) {
    chunks.push(conjugateNumber(breakdown.man, options, OMIT_ONE));

    const change =
      finalNumberChanges &&
      breakdown.lowestUnit === "man" &&
      finalNumberChanges[MAN];
    chunks.push(applyUniqueChanges(MAN_NUMBER, change));
  }

  if (breakdown.sen) {
    chunks.push(conjugateNumber(breakdown.sen, options, SEN_CHANGES));

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
    chunks.push(conjugateNumber(breakdown.hyaku, options, HYAKU_CHANGES));

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
    chunks.push(conjugateNumber(breakdown.jyuu, options, OMIT_ONE));

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
        FIRST_TEN_NUMBERS[breakdown.solo].filter(
          word => !word.isValid || word.isValid(options)
        ),
        change
      )
    );
  }

  return permutateTaggableWords(chunks);
}

const UNDEFINED_FINAL_CHANGES: FinalNumberChanges = {};
const MEMOIZE_RESOLVER = new Map<FinalNumberChanges, Map<number, string>>();

export const conjugateNumber: (
  amount: number,
  options: NumericConjugationOptions,
  finalNumberChanges?: FinalNumberChanges
) => ReadonlyArray<TaggableJapaneseWord> = memoize(
  (
    amount: number,
    options: NumericConjugationOptions,
    finalNumberChanges?: FinalNumberChanges
  ) =>
    conjugateNumberInternal(
      breakDownNumber(amount),
      options,
      finalNumberChanges
    ),
  (
    amount: number,
    options: NumericConjugationOptions,
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
      Number(options.allowsShiFor4),
      Number(options.allowsNanaFor7),
      Number(options.allowsShichiFor7),
      Number(options.allowsKyuuFor9),
      Number(options.allowsKuFor9)
    ].join()}`;

    console.log("<conj>", id); /* tslint:disable-line no-console */
    return id;
  }
);
