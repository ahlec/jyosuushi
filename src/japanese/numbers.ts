import { flatten, memoize, uniqueId } from "lodash";
import { JapaneseWord, permutateWords, uniqueWords } from "./words";

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
  }
);

const FIRST_TEN_NUMBERS: ReadonlyArray<ReadonlyArray<JapaneseWord>> = [
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
      kana: "よん",
      kanji: "四"
    },
    {
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
      kana: "しち",
      kanji: "七"
    },
    {
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
      kana: "きゅう",
      kanji: "九"
    }
  ]
];

const OKU_NUMBER: ReadonlyArray<JapaneseWord> = [
  {
    kana: "おく",
    kanji: "億"
  }
];

const MAN_NUMBER: ReadonlyArray<JapaneseWord> = [
  {
    kana: "まん",
    kanji: "万"
  }
];

const SEN_NUMBER: ReadonlyArray<JapaneseWord> = [
  {
    kana: "せん",
    kanji: "千"
  }
];

const ZEN_NUMBER: ReadonlyArray<JapaneseWord> = [
  {
    kana: "ぜん",
    kanji: "千"
  }
];

const SEN_CHANGES: FinalNumberChanges = {
  1: ["omit", "trailing-small-tsu"],
  8: ["trailing-small-tsu"]
};

const HYAKU_NUMBER: ReadonlyArray<JapaneseWord> = [
  {
    kana: "ひゃく",
    kanji: "百"
  }
];

const BYAKU_NUMBER: ReadonlyArray<JapaneseWord> = [
  {
    kana: "びゃく",
    kanji: "百"
  }
];

const PYAKU_NUMBER: ReadonlyArray<JapaneseWord> = [
  {
    kana: "ぴゃく",
    kanji: "百"
  }
];

const JYUU_NUMBER: ReadonlyArray<JapaneseWord> = [
  {
    kana: "じゅう",
    kanji: "十"
  }
];

const HYAKU_CHANGES: FinalNumberChanges = {
  1: ["omit", "trailing-small-tsu"],
  6: ["trailing-small-tsu"],
  8: ["trailing-small-tsu"]
};

const OMIT_ONE: FinalNumberChanges = {
  1: ["omit"]
};

type NumberChange = "omit" | "trailing-small-tsu";

export interface FinalNumberChanges {
  [amount: number]: ReadonlyArray<NumberChange>;
}

function applySingleChange(
  words: ReadonlyArray<JapaneseWord>,
  change: NumberChange
): ReadonlyArray<JapaneseWord> {
  switch (change) {
    case "trailing-small-tsu": {
      return words.map(({ kana, kanji }) => ({
        kana: kana.slice(0, -1) + "っ",
        kanji
      }));
    }
    case "omit": {
      return [{ kana: "", kanji: null }];
    }
  }
}

function applyUniqueChanges(
  words: ReadonlyArray<JapaneseWord>,
  changes: ReadonlyArray<NumberChange> | false | undefined
): ReadonlyArray<JapaneseWord> {
  if (!changes) {
    return words;
  }

  return flatten(changes.map(change => applySingleChange(words, change)));
}

function conjugateNumberInternal(
  breakdown: NumberBreakdown,
  finalNumberChanges?: FinalNumberChanges
): ReadonlyArray<JapaneseWord> {
  const chunks: Array<ReadonlyArray<JapaneseWord>> = [];

  if (breakdown.oku) {
    chunks.push(conjugateNumber(breakdown.oku, OMIT_ONE));

    const change =
      finalNumberChanges &&
      breakdown.lowestUnit === "oku" &&
      finalNumberChanges[OKU];
    chunks.push(applyUniqueChanges(OKU_NUMBER, change));
  }

  if (breakdown.man) {
    chunks.push(conjugateNumber(breakdown.man, OMIT_ONE));

    const change =
      finalNumberChanges &&
      breakdown.lowestUnit === "man" &&
      finalNumberChanges[MAN];
    chunks.push(applyUniqueChanges(MAN_NUMBER, change));
  }

  if (breakdown.sen) {
    chunks.push(conjugateNumber(breakdown.sen, SEN_CHANGES));

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
    chunks.push(conjugateNumber(breakdown.hyaku, HYAKU_CHANGES));

    const hyakuBreakdown = breakDownNumber(breakdown.hyaku);
    const change =
      finalNumberChanges &&
      breakdown.lowestUnit === "hyaku" &&
      finalNumberChanges[HYAKU];
    let hyaku = HYAKU_NUMBER;
    if (hyakuBreakdown.lowestUnit === "solo") {
      switch (hyakuBreakdown.solo) {
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
    chunks.push(conjugateNumber(breakdown.jyuu, OMIT_ONE));

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
    chunks.push(applyUniqueChanges(FIRST_TEN_NUMBERS[breakdown.solo], change));
  }

  return uniqueWords(permutateWords(chunks));
}

const UNDEFINED_FINAL_CHANGES: FinalNumberChanges = {};
const MEMOIZE_RESOLVER = new Map<FinalNumberChanges, Map<number, string>>();

export const conjugateNumber: (
  amount: number,
  finalNumberChanges?: FinalNumberChanges
) => ReadonlyArray<JapaneseWord> = memoize(
  (amount: number, finalNumberChanges?: FinalNumberChanges) =>
    conjugateNumberInternal(breakDownNumber(amount), finalNumberChanges),
  (
    amount: number,
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

    console.log("conjugateNumber id", id);
    return id;
  }
);
