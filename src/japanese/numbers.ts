/* tslint:disable object-literal-sort-keys */
import { memoize, uniqBy } from "lodash";
import { permutate } from "../utils";

const OKU = Math.pow(10, 8);
const MAN = 10000;
const SEN = 1000;
const HYAKU = 100;
const JYUU = 10;

interface NumberBreakdown {
  oku: number;
  man: number;
  sen: number;
  hyaku: number;
  jyuu: number;
  solo: number;
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
    solo: remainder
  };
}

export interface JapaneseNumber {
  kana: string;
  kanji: string | null;
}

const FIRST_TEN_NUMBERS: ReadonlyArray<ReadonlyArray<JapaneseNumber>> = [
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

const OKU_NUMBER: ReadonlyArray<JapaneseNumber> = [
  {
    kana: "おく",
    kanji: "億"
  }
];

const MAN_NUMBER: ReadonlyArray<JapaneseNumber> = [
  {
    kana: "まん",
    kanji: "万"
  }
];

const SEN_NUMBER: ReadonlyArray<JapaneseNumber> = [
  {
    kana: "せん",
    kanji: "千"
  }
];

const HYAKU_NUMBER: ReadonlyArray<JapaneseNumber> = [
  {
    kana: "ひゃく",
    kanji: "百"
  }
];

const JYUU_NUMBER: ReadonlyArray<JapaneseNumber> = [
  {
    kana: "じゅう",
    kanji: "十"
  }
];

function japaneseNumberCombiner(
  first: JapaneseNumber,
  second: JapaneseNumber
): JapaneseNumber {
  return {
    kana: first.kana + second.kana,
    kanji: first.kanji && second.kanji ? first.kanji + second.kanji : null
  };
}

function japaneseNumberIteratee(num: JapaneseNumber): string {
  return num.kana + "-" + num.kanji;
}

function conjugate(amount: number): ReadonlyArray<JapaneseNumber> {
  if (amount < JYUU) {
    return FIRST_TEN_NUMBERS[amount];
  }

  const breakdown = breakDownNumber(amount);
  const chunks: Array<ReadonlyArray<JapaneseNumber>> = [];

  if (breakdown.oku) {
    if (breakdown.oku > 1) {
      chunks.push(conjugateNumber(breakdown.oku));
    }

    chunks.push(OKU_NUMBER);
  }

  if (breakdown.man) {
    if (breakdown.man > 1) {
      chunks.push(conjugateNumber(breakdown.man));
    }

    chunks.push(MAN_NUMBER);
  }

  if (breakdown.sen) {
    if (breakdown.sen > 1) {
      chunks.push(conjugateNumber(breakdown.sen));
    }

    chunks.push(SEN_NUMBER);
  }

  if (breakdown.hyaku) {
    if (breakdown.hyaku > 1) {
      chunks.push(conjugateNumber(breakdown.hyaku));
    }

    chunks.push(HYAKU_NUMBER);
  }

  if (breakdown.jyuu) {
    if (breakdown.jyuu > 1) {
      chunks.push(conjugateNumber(breakdown.jyuu));
    }

    chunks.push(JYUU_NUMBER);
  }

  if (breakdown.solo) {
    chunks.push(conjugateNumber(breakdown.solo));
  }

  return uniqBy(
    permutate(chunks, japaneseNumberCombiner),
    japaneseNumberIteratee
  );
}

export const conjugateNumber: (
  amount: number
) => ReadonlyArray<JapaneseNumber> = memoize(conjugate);
