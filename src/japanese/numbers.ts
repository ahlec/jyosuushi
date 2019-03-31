import { memoize, uniqueId } from "lodash";
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

export function breakDownNumber(value: number): NumberBreakdown {
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

const ZEN_NUMBER: ReadonlyArray<JapaneseWord> = [
  {
    kana: "ぜん",
    kanji: "千"
  }
];

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

export interface FinalNumberOverrides {
  [amount: number]: ReadonlyArray<JapaneseWord>;
}

const HYAKU_OVERRIDES: FinalNumberOverrides = {
  1: [
    {
      kana: "",
      kanji: null
    },
    {
      kana: "いっ",
      kanji: "一"
    }
  ],
  6: [
    {
      kana: "ろっ",
      kanji: "六"
    }
  ],
  8: [
    {
      kana: "はっ",
      kanji: "八"
    }
  ]
};

export function conjugateNumberInternal(
  breakdown: NumberBreakdown,
  finalNumberOverrides?: FinalNumberOverrides
): ReadonlyArray<JapaneseWord> {
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
    const senBreakdown = breakDownNumber(breakdown.sen);
    if (breakdown.sen > 1) {
      chunks.push(conjugateNumberInternal(senBreakdown));
    }

    if (
      finalNumberOverrides &&
      breakdown.lowestUnit === "sen" &&
      finalNumberOverrides[SEN]
    ) {
      chunks.push(finalNumberOverrides[SEN]);
    } else {
      let sen = SEN_NUMBER;
      if (senBreakdown.lowestUnit === "solo" && senBreakdown.solo === 3) {
        sen = ZEN_NUMBER;
      }

      chunks.push(sen);
    }
  }

  if (breakdown.hyaku) {
    const hyakuBreakdown = breakDownNumber(breakdown.hyaku);
    if (breakdown.hyaku > 1) {
      chunks.push(conjugateNumberInternal(hyakuBreakdown, HYAKU_OVERRIDES));
    }

    if (
      finalNumberOverrides &&
      breakdown.lowestUnit === "hyaku" &&
      finalNumberOverrides[HYAKU]
    ) {
      chunks.push(finalNumberOverrides[HYAKU]);
    } else {
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

      chunks.push(hyaku);
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
      chunks.push(FIRST_TEN_NUMBERS[breakdown.solo]);
    }
  }

  return uniqueWords(permutateWords(chunks));
}

const UNDEFINED_FINAL_OVERRIDES: FinalNumberOverrides = {};
const MEMOIZE_RESOLVER = new Map<FinalNumberOverrides, Map<number, string>>();

export const conjugateNumber: (
  amount: number,
  finalNumberOverrides?: FinalNumberOverrides
) => ReadonlyArray<JapaneseWord> = memoize(
  (amount: number, finalNumberOverrides?: FinalNumberOverrides) =>
    conjugateNumberInternal(breakDownNumber(amount), finalNumberOverrides),
  (
    amount: number,
    finalNumberOverrides:
      | FinalNumberOverrides
      | undefined = UNDEFINED_FINAL_OVERRIDES
  ) => {
    let fnoMap = MEMOIZE_RESOLVER.get(finalNumberOverrides);
    if (!fnoMap) {
      fnoMap = new Map();
      MEMOIZE_RESOLVER.set(finalNumberOverrides, fnoMap);
    }

    let id = fnoMap.get(amount);
    if (!id) {
      id = uniqueId();
      fnoMap.set(amount, id);
    }

    console.log("conjugateNumber id", id);
    return id;
  }
);
