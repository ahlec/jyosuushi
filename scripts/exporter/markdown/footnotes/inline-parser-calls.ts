import { Node } from "unist";

import { Eat, RemarkParser, InlineTokenizer } from "../interfaces";

import IdTracker from "./IdTracker";

import {
  KEYCODE_RIGHT_SQUARE_BRACKET,
  KEYCODE_LINE_FEED,
  KEYCODE_TAB,
  KEYCODE_SPACE,
  KEYCODE_LEFT_SQUARE_BRACKET,
  KEYCODE_CARET
} from "./constants";

interface ParsedLabelInfo {
  start: number;
  end: number;
  value: string;
}

function parseLabel(value: string): ParsedLabelInfo | null {
  let index = 0;

  if (value.charCodeAt(index++) !== KEYCODE_LEFT_SQUARE_BRACKET) {
    return null;
  }
  if (value.charCodeAt(index++) !== KEYCODE_CARET) {
    return null;
  }

  const labelStart = index;
  while (index < value.length + 1) {
    const code = value.charCodeAt(index);

    if (
      code !== code ||
      code === KEYCODE_LINE_FEED ||
      code === KEYCODE_TAB ||
      code === KEYCODE_SPACE
    ) {
      return null;
    }

    if (code === KEYCODE_RIGHT_SQUARE_BRACKET) {
      if (labelStart === index) {
        return null;
      }

      return {
        end: index,
        start: labelStart,
        value: value.slice(labelStart, index)
      };
    }

    index++;
  }

  return null;
}

export function createFootnoteCallsTokenizer(
  idTracker: IdTracker
): InlineTokenizer {
  // Parse a footnote call / footnote reference, such as `[^label]`
  function footnoteCall(
    this: RemarkParser,
    eat: Eat,
    value: string,
    silent: boolean
  ): Node | boolean | void {
    const label = parseLabel(value);
    if (!label) {
      return;
    }

    if (silent) {
      return true;
    }

    const refId = idTracker.getId(label.value.toLowerCase());
    return eat(value.slice(0, label.end + 1))({
      identifier: refId,
      label: refId,
      type: "footnoteReference"
    });
  }

  footnoteCall.locator = (value: string, fromIndex: number): number => {
    return value.indexOf("[", fromIndex);
  };

  return footnoteCall;
}
