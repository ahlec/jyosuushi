import { uniqBy } from "lodash";

import { permutate } from "@jyosuushi/utils";

import { areTagsCompatible, Tag } from "./tags";

export interface JapaneseWord {
  kana: string;
}

export interface ConjugatedJapaneseWord extends JapaneseWord {
  isStrange: boolean;
}

export interface TaggableJapaneseWord extends JapaneseWord {
  tags: ReadonlySet<Tag>;
}

function japaneseNumberIteratee(num: ConjugatedJapaneseWord): string {
  return num.kana;
}

export function uniqueWords(
  words: ReadonlyArray<ConjugatedJapaneseWord>
): ReadonlyArray<ConjugatedJapaneseWord> {
  return uniqBy(words, japaneseNumberIteratee);
}

function japaneseNumberCombiner(
  first: TaggableJapaneseWord,
  second: TaggableJapaneseWord
): TaggableJapaneseWord | null {
  // Require matching tags, if there are tags
  if (!areTagsCompatible(first.tags, second.tags)) {
    return null;
  }

  const tags: Set<Tag> = new Set(first.tags);
  for (const tag of second.tags) {
    tags.add(tag);
  }

  return {
    kana: first.kana + second.kana,
    kanji:
      first.kanji !== null && second.kanji !== null
        ? first.kanji + second.kanji
        : null,
    tags
  };
}

export function permutateTaggableWords(
  chunks: ReadonlyArray<ReadonlyArray<TaggableJapaneseWord>>
): ReadonlyArray<TaggableJapaneseWord> {
  return permutate(chunks, japaneseNumberCombiner);
}

function castAwayTaggableInternal(
  word: TaggableJapaneseWord
): ConjugatedJapaneseWord {
  return {
    isStrange: word.tags.has("strange"),
    kana: word.kana
  };
}

export function castAwayTaggable(
  words: ReadonlyArray<TaggableJapaneseWord>
): ReadonlyArray<ConjugatedJapaneseWord> {
  return words.map(castAwayTaggableInternal);
}

function castToTaggableInternal(
  word: JapaneseWord | TaggableJapaneseWord
): TaggableJapaneseWord {
  return {
    ...word,
    tags: "tags" in word ? word.tags : new Set()
  };
}

export function castToTaggable(
  words: ReadonlyArray<JapaneseWord | TaggableJapaneseWord>
): ReadonlyArray<TaggableJapaneseWord> {
  return words.map(castToTaggableInternal);
}
