import { Node } from "unist";

import { Eat, InlineTokenizer, RemarkParser } from "../interfaces";

import {
  KEYCODE_EXCLAMATION_MARK,
  KEYCODE_LEFT_SQUARE_BRACKET,
  KEYCODE_CARET,
} from "./constants";

export function createReplacementReferenceParser(
  originalReference: InlineTokenizer
): InlineTokenizer {
  // Do not allow `![^` or `[^` as a normal reference, do pass all other values
  // through.
  function replacement(
    this: RemarkParser,
    eat: Eat,
    value: string,
    silent: boolean
  ): Node | boolean | void {
    let index = 0;
    if (value.charCodeAt(index) === KEYCODE_EXCLAMATION_MARK) {
      index++;
    }

    if (value.charCodeAt(index) !== KEYCODE_LEFT_SQUARE_BRACKET) {
      return;
    }

    if (value.charCodeAt(index + 1) === KEYCODE_CARET) {
      return;
    }

    return originalReference.call(this, eat, value, silent);
  }

  replacement.locator = originalReference.locator;

  return replacement;
}
