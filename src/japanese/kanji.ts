import { memoize } from "lodash";
import { breakDownNumber } from "./numbers";

const FIRST_TEN_NUMBER_KANJI: ReadonlyArray<string | null> = [
  null,
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九"
];

export const getKanjiForNumber: (amount: number) => string = memoize(
  (amount): string => {
    const piecesToConcatenate: string[] = [];
    const breakdown = breakDownNumber(amount);

    if (breakdown.oku) {
      piecesToConcatenate.push(getKanjiForNumber(breakdown.oku));
      piecesToConcatenate.push("億");
    }

    if (breakdown.man) {
      piecesToConcatenate.push(getKanjiForNumber(breakdown.man));
      piecesToConcatenate.push("万");
    }

    if (breakdown.sen) {
      piecesToConcatenate.push(getKanjiForNumber(breakdown.sen));
      piecesToConcatenate.push("千");
    }

    if (breakdown.hyaku) {
      piecesToConcatenate.push(getKanjiForNumber(breakdown.hyaku));
      piecesToConcatenate.push("百");
    }

    if (breakdown.jyuu) {
      piecesToConcatenate.push(getKanjiForNumber(breakdown.jyuu));
      piecesToConcatenate.push("十");
    }

    if (breakdown.solo) {
      piecesToConcatenate.push(FIRST_TEN_NUMBER_KANJI[breakdown.solo] || "");
    }

    return piecesToConcatenate.join("");
  }
);
