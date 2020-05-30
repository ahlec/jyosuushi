import { isArray } from "lodash";
import { Processor } from "unified";
import { Node } from "unist";

import { Eat, RemarkParser } from "./interfaces";

/**
 * Matches: `{1}` (at the start of a string)
 * Capture Groups: 1 - The numeral
 */
const NUMERICAL_SECTION_IDENTIFIER_REGEX = /^\{(\d+)\}/gm;

function splitNumericalSectionIntoPieces(
  fullText: string,
  lengthOfIdentifier: number
): { header: string | null; contents: string | null } {
  const usableText = fullText.substring(lengthOfIdentifier);

  const firstNewlineIndex = usableText.indexOf("\n");
  if (firstNewlineIndex < 0) {
    // All header, no content (section ends without newline)
    if (!usableText) {
      return {
        contents: null,
        header: null
      };
    }

    return {
      contents: null,
      header: usableText.trim()
    };
  }

  if (firstNewlineIndex === 0) {
    // No header, all content (newline immediately after identifier)
    if (!usableText) {
      return {
        contents: null,
        header: null
      };
    }

    return {
      contents: usableText.trim(),
      header: null
    };
  }

  const headerText = usableText.substring(0, firstNewlineIndex);
  const contentText = usableText.substring(firstNewlineIndex + 1);

  return {
    contents: contentText.trim() || null,
    header: headerText.trim() || null
  };
}

function numericalSectionTokenizer(
  this: RemarkParser,
  eat: Eat,
  value: string,
  silent: boolean
): Node | boolean | void {
  const firstGroup = NUMERICAL_SECTION_IDENTIFIER_REGEX.exec(value);
  if (!firstGroup) {
    if (silent) {
      return false;
    }

    return;
  }

  const followingGroup = NUMERICAL_SECTION_IDENTIFIER_REGEX.exec(value);
  const endIndex = followingGroup ? followingGroup.index : value.length;

  const sectionToConsume = value.substring(0, endIndex);
  const start = eat.now();
  const add = eat(sectionToConsume);

  const pieces = splitNumericalSectionIntoPieces(
    sectionToConsume,
    firstGroup[0].length
  );

  const exit = this.enterBlock();
  const header = pieces.header
    ? this.tokenizeInline(pieces.header, start)
    : null;
  const contents = pieces.contents
    ? this.tokenizeBlock(pieces.contents, start)
    : null;
  exit();

  const headerChildren: Node[] = [
    // Numerical identifier on header is always present
    {
      children: [
        {
          type: "text",
          value: firstGroup[1]
        }
      ],
      data: {
        hName: "div",
        hProperties: { className: ["numeral"] }
      },
      type: "numericalSection-header"
    }
  ];
  if (header && isArray(header) && header.length) {
    headerChildren.push({
      children: header,
      data: {
        hName: "div",
        hProperties: { className: ["qualifier"] }
      },
      type: "numericalSection-subheader"
    });
  }

  const containerChildren: Node[] = [
    // Header section, always present
    {
      children: headerChildren,
      data: {
        hName: "div",
        hProperties: { className: ["header"] }
      },
      type: "numericalSection-header"
    }
  ];

  if (contents && isArray(contents) && contents.length) {
    containerChildren.push({
      children: contents,
      data: {
        hName: "div",
        hProperties: { className: ["contents"] }
      },
      type: "numericalSection-contents"
    });
  }

  return add({
    children: containerChildren,
    data: {
      hName: "div",
      hProperties: { className: ["numericalSection"] }
    },
    type: "numericalSection"
  });
}

numericalSectionTokenizer.notInList = true;
numericalSectionTokenizer.notInLink = true;

function numericalSectionGroupMarkdownPlugin(this: Processor<unknown>): void {
  const Parser = this.Parser;
  const blockTokenizers = Parser.prototype.blockTokenizers;
  const blockMethods = Parser.prototype.blockMethods;
  blockTokenizers.numericalSection = numericalSectionTokenizer;
  blockMethods.splice(
    blockMethods.indexOf("blockquote"),
    0,
    "numericalSection"
  );
}

export default numericalSectionGroupMarkdownPlugin;
