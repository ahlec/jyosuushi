import { memoize } from "lodash";
import { JapaneseWord, permutateWords, uniqueWords } from "./words";

export const OKU = Math.pow(10, 8);
export const MAN = 10000;
export const SEN = 1000;
export const HYAKU = 100;
export const JYUU = 10;

type Unit = "oku" | "man" | "sen" | "hyaku" | "jyuu" | "solo";

interface NumberBreakdown {
  oku: number;
  man: number;
  sen: number;
  hyaku: number;
  jyuu: number;
  solo: number;
  lowestUnit: Unit;
}

function breakDownNumber(value: number): NumberBreakdown {
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

const HYAKU_NUMBER: ReadonlyArray<JapaneseWord> = [
  {
    kana: "ひゃく",
    kanji: "百"
  }
];

const JYUU_NUMBER: ReadonlyArray<JapaneseWord> = [
  {
    kana: "じゅう",
    kanji: "十"
  }
];

export interface FinalNumberOverrides {
  [amount: number]: ReadonlyArray<JapaneseWord>;
}

export function conjugateNumberInternal(
  amount: number,
  finalNumberOverrides?: FinalNumberOverrides
): ReadonlyArray<JapaneseWord> {
  if (amount < JYUU) {
    return FIRST_TEN_NUMBERS[amount];
  }

  const breakdown = breakDownNumber(amount);
  const chunks: Array<ReadonlyArray<JapaneseWord>> = [];

  if (breakdown.oku) {
    if (breakdown.oku > 1) {
      chunks.push(conjugateNumber(breakdown.oku));
    }

    if (
      finalNumberOverrides &&
      breakdown.lowestUnit === "oku" &&
      finalNumberOverrides[OKU]
    ) {
      chunks.push(finalNumberOverrides[OKU]);
    } else {
      chunks.push(OKU_NUMBER);
    }
  }

  if (breakdown.man) {
    if (breakdown.man > 1) {
      chunks.push(conjugateNumber(breakdown.man));
    }

    if (
      finalNumberOverrides &&
      breakdown.lowestUnit === "man" &&
      finalNumberOverrides[MAN]
    ) {
      chunks.push(finalNumberOverrides[MAN]);
    } else {
      chunks.push(MAN_NUMBER);
    }
  }

  if (breakdown.sen) {
    if (breakdown.sen > 1) {
      chunks.push(conjugateNumber(breakdown.sen));
    }

    if (
      finalNumberOverrides &&
      breakdown.lowestUnit === "sen" &&
      finalNumberOverrides[SEN]
    ) {
      chunks.push(finalNumberOverrides[SEN]);
    } else {
      chunks.push(SEN_NUMBER);
    }
  }

  if (breakdown.hyaku) {
    if (breakdown.hyaku > 1) {
      chunks.push(conjugateNumber(breakdown.hyaku));
    }

    if (
      finalNumberOverrides &&
      breakdown.lowestUnit === "hyaku" &&
      finalNumberOverrides[HYAKU]
    ) {
      chunks.push(finalNumberOverrides[HYAKU]);
    } else {
      chunks.push(HYAKU_NUMBER);
    }
  }

  if (breakdown.jyuu) {
    if (breakdown.jyuu > 1) {
      chunks.push(conjugateNumber(breakdown.jyuu));
    }

    if (
      finalNumberOverrides &&
      breakdown.lowestUnit === "jyuu" &&
      finalNumberOverrides[JYUU]
    ) {
      chunks.push(finalNumberOverrides[JYUU]);
    } else {
      chunks.push(JYUU_NUMBER);
    }
  }

  if (breakdown.solo) {
    if (
      finalNumberOverrides &&
      breakdown.lowestUnit === "solo" &&
      finalNumberOverrides[breakdown.solo]
    ) {
      chunks.push(finalNumberOverrides[breakdown.solo]);
    } else {
      chunks.push(conjugateNumber(breakdown.solo));
    }
  }

  return uniqueWords(permutateWords(chunks));
}

export const conjugateNumber: (
  amount: number
) => ReadonlyArray<JapaneseWord> = memoize(conjugateNumberInternal);
