import { StudyPack } from "./data/study-packs";
import { Counter } from "./redux";

export function randomFromArray<T>(arr: ReadonlyArray<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
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

function compareCounters(a: Counter, b: Counter): number {
  return a.kana.localeCompare(b.kana);
}

export function getDistinctCounters(
  packs: Iterable<StudyPack>
): ReadonlyArray<Counter> {
  const counters: Counter[] = [];
  const encountered = new Set<string>();
  for (const pack of packs) {
    for (const counter of pack.counters) {
      if (encountered.has(counter.counterId)) {
        continue;
      }

      encountered.add(counter.counterId);
      counters.push(counter);
    }
  }

  counters.sort(compareCounters);
  return counters;
}
