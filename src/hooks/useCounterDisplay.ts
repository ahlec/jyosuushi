import { useMemo } from "react";

import { Counter } from "@jyosuushi/interfaces";

interface CounterDisplay {
  /**
   * Furigana which should appear and provide the primary reading for this
   * counter, if it has one.
   */
  furigana: string | null;

  /**
   * The primary representation of this counter in Japanese characters.
   */
  writing: string;
}

function useCounterDisplay(counter: Counter): CounterDisplay {
  let furigana: string | null;
  let writing: string;
  if (counter.kanji) {
    writing = counter.kanji.primaryKanji;
    furigana = counter.readings[0].kana || null;
  } else {
    writing = counter.readings[0].kana;
    furigana = null;
  }

  // Return the public API, memoized to allow for performance optimizations
  return useMemo(
    (): CounterDisplay => ({
      furigana,
      writing,
    }),
    [furigana, writing]
  );
}

export default useCounterDisplay;
