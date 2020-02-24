import { memoize } from "lodash";
import { getAsHiragana } from "./kana";

const VOWELS_HEPBURN: ReadonlySet<string> = new Set(["a", "e", "i", "o", "u"]);
const SMALL_YS: { [kana: string]: { withY: string; withoutY: string } } = {
  ゃ: { withY: "ya", withoutY: "a" },
  ゅ: { withY: "yu", withoutY: "u" },
  ょ: { withY: "yo", withoutY: "o" }
};
const N_CONSONANT_IS: {
  [kana: string]: { consonant: string; includeY: boolean };
} = {
  き: { consonant: "k", includeY: true },
  ぎ: { consonant: "g", includeY: true },
  し: { consonant: "sh", includeY: false },
  じ: { consonant: "j", includeY: false },
  ち: { consonant: "ch", includeY: false },
  ぢ: { consonant: "j", includeY: false },
  に: { consonant: "n", includeY: true },
  ひ: { consonant: "h", includeY: true },
  び: { consonant: "b", includeY: true },
  ぴ: { consonant: "p", includeY: true },
  み: { consonant: "m", includeY: true },
  り: { consonant: "r", includeY: true }
};

/* eslint-disable sort-keys */
// JUSTIFICATION: Allows us to maintain traditional/expected ordering of Japanese.
const HepburnChart: { [kana: string]: string } = {
  あ: "a",
  い: "i",
  う: "u",
  え: "e",
  お: "o",
  か: "ka",
  き: "ki",
  く: "ku",
  け: "ke",
  こ: "ko",
  が: "ga",
  ぎ: "gi",
  ぐ: "gu",
  げ: "ge",
  ご: "go",
  さ: "sa",
  し: "shi",
  す: "su",
  せ: "se",
  そ: "so",
  ざ: "za",
  じ: "ji",
  ず: "zu",
  ぜ: "ze",
  ぞ: "zo",
  た: "ta",
  ち: "chi",
  つ: "tsu",
  て: "te",
  と: "to",
  だ: "da",
  ぢ: "ji",
  づ: "zu",
  で: "de",
  ど: "do",
  な: "na",
  に: "ni",
  ぬ: "nu",
  ね: "ne",
  の: "no",
  は: "ha",
  ひ: "hi",
  ふ: "fu",
  へ: "he",
  ほ: "ho",
  ば: "ba",
  び: "bi",
  ぶ: "bu",
  べ: "be",
  ぼ: "bo",
  ぱ: "pa",
  ぴ: "pi",
  ぷ: "pu",
  ぺ: "pe",
  ぽ: "po",
  ま: "ma",
  み: "mi",
  む: "mu",
  め: "me",
  も: "mo",
  や: "ya",
  よ: "yo",
  ゆ: "yu",
  ら: "ra",
  り: "ri",
  る: "ru",
  れ: "re",
  ろ: "ro",
  わ: "wa",
  を: "wo",
  ん: "n"
};
/* eslint-enable sort-keys */

class HepburnConverter {
  private readonly englishCharacters: string[] = [];
  private precedingSmallTsus = 0;
  private precedingKanaO = false;
  private precedingN = false;
  private precedingNConsonantI: string | null = null;

  public get english(): string {
    return this.englishCharacters.join("");
  }

  public pushKana(kana: string): void {
    const wasPrecededByKanaO = this.precedingKanaO;
    this.precedingKanaO = false;
    const precedingNConsonantI = this.precedingNConsonantI;
    this.precedingNConsonantI = null;

    if (wasPrecededByKanaO && kana === "う") {
      this.pushEnglish("o");
      return;
    }

    if (kana === "っ") {
      this.precedingSmallTsus++;
      this.precedingN = false;
      return;
    }

    let english: string;
    if (SMALL_YS[kana]) {
      if (!precedingNConsonantI) {
        throw new Error(`Encountered "${kana}" with no preceding consonant-I`);
      }

      const { consonant, includeY } = N_CONSONANT_IS[precedingNConsonantI];
      this.englishCharacters[this.englishCharacters.length - 1] = consonant;
      english = includeY ? SMALL_YS[kana].withY : SMALL_YS[kana].withoutY;
    } else {
      english = HepburnChart[kana];
      if (!english) {
        throw new Error(`Unable to find '${kana}' in the Hepburn chart`);
      }
    }

    this.precedingKanaO = english[english.length - 1] === "o";
    this.pushEnglish(english);
    this.precedingN = kana === "ん";
    if (N_CONSONANT_IS[kana]) {
      this.precedingNConsonantI = kana;
    }
  }

  private pushEnglish(english: string): void {
    if (this.precedingN && VOWELS_HEPBURN.has(english)) {
      this.englishCharacters.push("-");
      this.precedingN = false;
    }

    if (this.precedingSmallTsus) {
      this.englishCharacters.push(english[0].repeat(this.precedingSmallTsus));
      this.precedingSmallTsus = 0;
    }

    this.englishCharacters.push(english);
  }
}

function hepburn(inputKana: string): string {
  const hiragana = getAsHiragana(inputKana);
  const converter = new HepburnConverter();

  for (const kana of hiragana) {
    converter.pushKana(kana);
  }

  return converter.english;
}

export const getHepburnRoomaji: (kana: string) => string = memoize(hepburn);

/**
 * Gets the consonant of the word, if it begins with a consonant.
 * @example
 * // returns 'k'
 * getLeadingConsonant('かな');
 * @example
 * // returns null
 * getLeadingConsonant('いなり');
 */
export function getLeadingConsonant(inputKana: string): string | null {
  const hiragana = getAsHiragana(inputKana);
  if (!hiragana) {
    return null;
  }

  const first = hiragana[0];
  if (SMALL_YS[first]) {
    throw new Error("Word began with a small Y-kana");
  }

  const firstHepburn = HepburnChart[first];
  if (!firstHepburn) {
    throw new Error(`Could not find '${first}' in the Hepburn chart!`);
  }

  if (VOWELS_HEPBURN.has(firstHepburn)) {
    return null;
  }

  return firstHepburn[0];
}
