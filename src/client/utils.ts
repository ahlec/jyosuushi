import { COUNTERS_LOOKUP } from "@data/counters";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

import { Counter } from "./interfaces";

export function randomFromArray<T>(arr: ReadonlyArray<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function permutateTwoArrays<T>(
  first: ReadonlyArray<T>,
  second: ReadonlyArray<T>,
  combiner: (first: T, second: T) => T | null
): ReadonlyArray<T> {
  if (!first.length) {
    return second;
  }

  if (!second.length) {
    return first;
  }

  const permutations: T[] = [];
  for (const a of first) {
    for (const b of second) {
      const combined = combiner(a, b);
      if (combined !== null) {
        permutations.push(combined);
      }
    }
  }

  return permutations;
}

// from [["a", "b"], ["c", "d"]], get ["ac", "ad", "bc", "bd"]
export function permutate<T>(
  arrays: ReadonlyArray<ReadonlyArray<T>>,
  combiner: (first: T, second: T) => T | null
): ReadonlyArray<T> {
  if (arrays.length === 0) {
    return [];
  }

  if (arrays.length === 1) {
    return arrays[0];
  }

  if (arrays.length === 2) {
    return permutateTwoArrays(arrays[0], arrays[1], combiner);
  }

  return permutateTwoArrays(
    arrays[0],
    permutate(arrays.slice(1), combiner),
    combiner
  );
}

function compareCounters(a: Counter, b: Counter): number {
  return a.readings[0].kana.localeCompare(b.readings[0].kana);
}

export function getDistinctCounters(
  collections: readonly CounterCollection[]
): readonly Counter[] {
  const counters: Counter[] = [];
  const encountered = new Set<string>();

  collections.forEach((collection): void => {
    collection.counterIds.forEach((counterId): void => {
      if (encountered.has(counterId)) {
        return;
      }

      encountered.add(counterId);
      counters.push(COUNTERS_LOOKUP[counterId]);
    });
  });

  counters.sort(compareCounters);
  return counters;
}

export function interleave<TItem, TInterleaved>(
  arr: ReadonlyArray<TItem>,
  item: TInterleaved
): ReadonlyArray<TItem | TInterleaved> {
  if (arr.length <= 1) {
    return arr;
  }

  const interleaved: Array<TItem | TInterleaved> = [];
  for (let index = 0; index < arr.length; index++) {
    if (index > 0) {
      interleaved.push(item);
    }

    interleaved.push(arr[index]);
  }

  return interleaved;
}

export function getPrimaryJapaneseRepresentation(counter: Counter): string {
  if (counter.kanji) {
    return counter.kanji.primaryKanji;
  }

  return counter.readings[0].kana;
}
