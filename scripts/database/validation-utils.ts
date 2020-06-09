interface TextAnalysis {
  numWords: number;
  numSentences: number;
}

const SENTENCE_ENDING_PUNCTUATION_REGEX = /[.?!;。！？；]/gm;
/**
 * Disable this linting rule because we want to specifically target
 * different whitespace elements.
 *
 * We'll use \s to target typical ASCII whitespace but then we also
 * want to include the Japanese space character, which triggers this
 * linting rule.
 */
/* eslint-disable-next-line no-irregular-whitespace */
const WORD_SEPARATOR_REGEX = /[\s　\-–—]/gim;

function isNotEmptyString(str: string): boolean {
  return str.length > 0;
}

export function analyzeText(str: string): TextAnalysis {
  const sentences = str.split(SENTENCE_ENDING_PUNCTUATION_REGEX);
  const words = str.split(WORD_SEPARATOR_REGEX);
  return {
    numSentences: sentences.filter(isNotEmptyString).length,
    numWords: words.filter(isNotEmptyString).length
  };
}
