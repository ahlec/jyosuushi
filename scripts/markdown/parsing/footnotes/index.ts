import { ParserConstructor, ParserFunction, Processor } from "unified";

import { createFootnoteCallsTokenizer } from "./inline-parser-calls";
import { createFootnoteDefinitionTokenizer } from "./block-parser-definitions";
import { createReplacementDefinitionParser } from "./replacement-block-parser-definition";
import { createReplacementReferenceParser } from "./replacement-inline-parser-reference";

import IdTracker from "./IdTracker";

interface FootnoteOptions {
  footnotesCountingStart: number;
}

function insertBefore<T>(list: T[], before: T, value: T): void {
  list.splice(list.indexOf(before), 0, value);
}

function attachParser(
  parser: ParserConstructor | ParserFunction,
  { footnotesCountingStart }: FootnoteOptions,
): void {
  const proto = parser.prototype;
  const blocks = proto.blockTokenizers;
  const spans = proto.inlineTokenizers;
  const blockMethods = proto.blockMethods;
  const inlineMethods = proto.inlineMethods;
  const idTracker = new IdTracker(footnotesCountingStart);

  // Interrupt by anything except for indented code or paragraphs.
  const interruptors: string[][] = [];
  for (let index = 0; index < blockMethods.length; ++index) {
    const method = blockMethods[index];

    if (
      method === "newline" ||
      method === "indentedCode" ||
      method === "paragraph" ||
      method === "footnoteDefinition"
    ) {
      continue;
    }

    interruptors.push([method]);
  }

  interruptors.push(["footnoteDefinition"]);

  // Insert tokenizers.
  const reference = createReplacementReferenceParser(spans.reference);

  insertBefore(blockMethods, "definition", "footnoteDefinition");
  insertBefore(inlineMethods, "reference", "footnoteCall");

  blocks.definition = createReplacementDefinitionParser(blocks.definition);
  blocks.footnoteDefinition = createFootnoteDefinitionTokenizer(
    interruptors,
    blocks,
    idTracker,
  );
  spans.footnoteCall = createFootnoteCallsTokenizer(idTracker);
  spans.reference = reference;

  proto.interruptFootnoteDefinition = interruptors;
}

function isRemarkParser(parser: ParserConstructor | ParserFunction): boolean {
  return Boolean(
    parser && parser.prototype && parser.prototype.blockTokenizers,
  );
}

export default function footnotes(
  this: Processor<unknown>,
  options: FootnoteOptions,
): void {
  const parser = this.Parser;

  if (isRemarkParser(parser)) {
    attachParser(parser, options);
  }
}
