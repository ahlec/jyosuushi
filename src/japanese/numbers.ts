import { memoize } from "lodash";

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

    /* eslint-disable sort-keys */
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
                  : "solo",
    };
    /* eslint-enable sort-keys */
  },
);
