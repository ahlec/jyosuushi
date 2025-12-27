import {
  BlockTokenizer,
  Eat,
  RemarkParser,
  TokenizerReturnType,
} from "../interfaces";

import {
  KEYCODE_TAB,
  KEYCODE_SPACE,
  KEYCODE_LEFT_SQUARE_BRACKET,
  KEYCODE_CARET,
} from "./constants";

export function createReplacementDefinitionParser(
  originalDefinition: BlockTokenizer,
): BlockTokenizer {
  // Do not allow `[^` as a normal definition, do pass all other values through.
  function replacement(
    this: RemarkParser,
    eat: Eat,
    value: string,
    silent: boolean,
  ): TokenizerReturnType {
    let index = 0;
    let code = value.charCodeAt(index);
    while (code === KEYCODE_SPACE || code === KEYCODE_TAB) {
      code = value.charCodeAt(++index);
    }

    if (code !== KEYCODE_LEFT_SQUARE_BRACKET) {
      return;
    }

    if (value.charCodeAt(index + 1) === KEYCODE_CARET) {
      return;
    }

    return originalDefinition.call(this, eat, value, silent);
  }

  return replacement;
}
