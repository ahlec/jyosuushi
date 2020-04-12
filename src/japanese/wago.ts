import { breakDownNumber } from "./numbers";
import { interleave, permutate } from "@jyosuushi/utils";

const BASE_TEN: ReadonlyArray<ReadonlyArray<string>> = [
  ["なし"],
  ["ひと"],
  ["ふた"],
  ["み"],
  ["よ"],
  ["い"],
  ["む"],
  ["なな"],
  ["や"],
  ["ここの"]
];

function createRank(
  amount: number,
  readingForOne: string,
  validEndingsForEverythingElse: ReadonlyArray<string>
): ReadonlyArray<string> {
  if (amount <= 0 || amount >= BASE_TEN.length) {
    throw new Error();
  }

  if (amount === 1) {
    return [readingForOne];
  }

  return validEndingsForEverythingElse.map(
    ending => `${BASE_TEN[amount]}${ending}`
  );
}

function combineWagoPieces(
  pieces: ReadonlyArray<ReadonlyArray<string>>
): ReadonlyArray<string> {
  return permutate(interleave(pieces, ["あまり"]), (a, b) => `${a}${b}`);
}

export function conjugateWagoNumber(amount: number): ReadonlyArray<string> {
  const breakdown = breakDownNumber(amount);
  const pieces: Array<ReadonlyArray<string>> = [];

  if (breakdown.oku > 0) {
    throw new Error("Wago can't count this high?");
  }

  if (breakdown.man > 0) {
    pieces.push(createRank(breakdown.man, "よろず", ["よろず"]));
  }

  if (breakdown.sen > 0) {
    pieces.push(createRank(breakdown.sen, "ち", ["ち"]));
  }

  if (breakdown.hyaku > 0) {
    pieces.push(createRank(breakdown.hyaku, "ももち", ["ほち"]));
  }

  if (breakdown.jyuu > 0) {
    if (breakdown.jyuu === 2) {
      pieces.push(["はたち"]);
    } else {
      pieces.push(createRank(breakdown.jyuu, "とお", ["そち", "そじ"]));
    }
  }

  if (breakdown.solo > 0) {
    pieces.push(BASE_TEN[breakdown.solo]);
  }

  return combineWagoPieces(pieces);
}
