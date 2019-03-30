/* tslint:disable object-literal-sort-keys */
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
  kanji: string;
}

export function conjugate(amount: number): ReadonlyArray<JapaneseNumber> {
  return [];
}
