import { uniqBy } from "lodash";
import { permutate } from "../utils";

export interface JapaneseWord {
  kana: string;
  kanji: string | null;
}

function japaneseNumberIteratee(num: JapaneseWord): string {
  return num.kana + "-" + num.kanji;
}

export function uniqueWords(
  words: ReadonlyArray<JapaneseWord>
): ReadonlyArray<JapaneseWord> {
  return uniqBy(words, japaneseNumberIteratee);
}

function japaneseNumberCombiner(
  first: JapaneseWord,
  second: JapaneseWord
): JapaneseWord {
  return {
    kana: first.kana + second.kana,
    kanji: first.kanji && second.kanji ? first.kanji + second.kanji : null
  };
}

export function permutateWords(
  chunks: ReadonlyArray<ReadonlyArray<JapaneseWord>>
): ReadonlyArray<JapaneseWord> {
  return permutate(chunks, japaneseNumberCombiner);
}
