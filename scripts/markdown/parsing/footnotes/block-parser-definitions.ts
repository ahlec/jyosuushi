import { Node } from "unist";

import { BlockTokenizer, Eat, RemarkParser } from "../interfaces";

import {
  KEYCODE_TAB,
  KEYCODE_SPACE,
  KEYCODE_LEFT_SQUARE_BRACKET,
  KEYCODE_CARET,
  KEYCODE_LINE_FEED,
  KEYCODE_RIGHT_SQUARE_BRACKET,
  KEYCODE_COLON,
  TAB_SIZE,
  MAX_SLICE,
} from "./constants";
import IdTracker from "./IdTracker";

type InterruptorsArray = readonly (readonly string[])[];

interface ParsedLabelInfo {
  end: number;
  start: number;
  value: string;
}

interface ContentLine {
  contentEnd: number;
  contentStart: number;
  end: number;
  start: number;
}

// Mimics <https://github.com/remarkjs/remark/blob/b4c993e/packages/remark-parse/lib/util/interrupt.js>,
// but simplified for our needs.
function interrupt(
  list: InterruptorsArray,
  tokenizers: { [method: string]: BlockTokenizer },
  context: RemarkParser,
  parameters: Parameters<BlockTokenizer>,
): boolean {
  for (const [method] of list) {
    if (tokenizers[method].apply(context, parameters)) {
      return true;
    }
  }

  return false;
}

function parseLabel(value: string, valueStart: number): ParsedLabelInfo | null {
  const labelStart = valueStart;
  let labelEnd: number | undefined;
  let index = valueStart;
  while (index < value.length + 1) {
    const code = value.charCodeAt(index);

    // Exit on white space.
    if (
      code !== code ||
      code === KEYCODE_LINE_FEED ||
      code === KEYCODE_TAB ||
      code === KEYCODE_SPACE
    ) {
      return null;
    }

    if (code === KEYCODE_RIGHT_SQUARE_BRACKET) {
      labelEnd = index;
      index++;
      break;
    }

    index++;
  }

  // Ignore if we didn’t find an end, no label, or there’s no colon.
  if (
    labelEnd === undefined ||
    labelStart === labelEnd ||
    value.charCodeAt(index++) !== KEYCODE_COLON
  ) {
    return null;
  }

  return {
    end: index, // Also include trimming the optional following colon
    start: labelStart,
    value: value.slice(labelStart, labelEnd),
  };
}

function removeTrailingEmptyLines(
  lines: readonly ContentLine[],
): readonly ContentLine[] {
  let trimmedLength = lines.length;

  while (trimmedLength > 0) {
    const line = lines[trimmedLength - 1];

    if (line.contentStart !== line.contentEnd) {
      break;
    }

    trimmedLength--;
  }

  if (trimmedLength === lines.length) {
    return lines;
  }

  return lines.slice(0, trimmedLength + 1);
}

function parseContentLines(
  value: string,
  valueStart: number,
  containsFootnoteDefinitionInterruption: (str: string) => boolean,
): readonly ContentLine[] {
  let start = 0;
  let indent: number | undefined = 0;
  let index = valueStart;
  let contentStart: number | undefined = valueStart;
  const lines: ContentLine[] = [];
  let mostRecentLine: ContentLine | undefined;

  while (index < value.length + 1) {
    const code = value.charCodeAt(index);

    if (code !== code || code === KEYCODE_LINE_FEED) {
      mostRecentLine = {
        contentEnd: index,
        contentStart: contentStart || index,
        end: index,
        start,
      };

      lines.push(mostRecentLine);

      // Prepare a new line.
      if (code === KEYCODE_LINE_FEED) {
        start = index + 1;
        indent = 0;
        contentStart = undefined;

        mostRecentLine.end = start;
      }
    } else if (indent !== undefined) {
      if (code === KEYCODE_SPACE || code === KEYCODE_TAB) {
        indent += code === KEYCODE_SPACE ? 1 : TAB_SIZE - (indent % TAB_SIZE);

        if (indent > TAB_SIZE) {
          indent = undefined;
          contentStart = index;
        }
      } else {
        // If this line is not indented and it’s either preceded by a blank
        // line or starts a new block, exit.
        if (
          indent < TAB_SIZE &&
          mostRecentLine &&
          (mostRecentLine.contentStart === mostRecentLine.contentEnd ||
            containsFootnoteDefinitionInterruption(
              value.slice(index, MAX_SLICE),
            ))
        ) {
          break;
        }

        indent = undefined;
        contentStart = index;
      }
    }

    index++;
  }

  // Remove trailing lines without content.
  return removeTrailingEmptyLines(lines);
}

export function createFootnoteDefinitionTokenizer(
  interruptors: InterruptorsArray,
  blockToknenizers: { [method: string]: BlockTokenizer },
  idTracker: IdTracker,
): BlockTokenizer {
  return function footnoteDefinition(
    this: RemarkParser,
    eat: Eat,
    value: string,
    silent: boolean,
  ): Node | boolean | void {
    // Skip initial whitespace.
    let startValueIndex = 0;
    while (startValueIndex < value.length + 1) {
      const code = value.charCodeAt(startValueIndex);

      if (code !== KEYCODE_TAB && code !== KEYCODE_SPACE) {
        break;
      }

      startValueIndex++;
    }

    // Parse `[^`.
    if (value.charCodeAt(startValueIndex++) !== KEYCODE_LEFT_SQUARE_BRACKET) {
      return;
    }

    if (value.charCodeAt(startValueIndex++) !== KEYCODE_CARET) {
      return;
    }

    // Parse label.
    const label = parseLabel(value, startValueIndex);
    if (!label) {
      return;
    }

    // Found it!
    if (silent) {
      return true;
    }

    // Now, to get all lines.
    const now = eat.now();
    const lines = parseContentLines(
      value,
      label.end + 1,
      (str: string): boolean =>
        interrupt(interruptors, blockToknenizers, this, [eat, str, true]),
    );

    // Add all, but ignore the final line feed.
    const add = eat(value.slice(0, lines[lines.length - 1].contentEnd));

    // Add indent offsets and get content w/o indents.
    const content: string[] = [];
    for (let index = 0; index < lines.length; ++index) {
      const line = lines[index];

      this.offset[now.line + index] =
        (this.offset[now.line + index] || 0) + (line.contentStart - line.start);

      content.push(value.slice(line.contentStart, line.end));
    }

    // Parse content.
    const exit = this.enterBlock();
    const children = this.tokenizeBlock(content.join(""), now);
    exit();

    const refId = idTracker.getId(label.value.toLowerCase());
    return add({
      children,
      identifier: refId,
      label: refId,
      type: "footnoteDefinition",
    });
  };
}
