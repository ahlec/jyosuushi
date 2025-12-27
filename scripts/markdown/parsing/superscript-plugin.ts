import { Processor } from "unified";
import { Node } from "unist";

import { Eat, RemarkParser } from "./interfaces";

function superscriptMarkdownPlugin(this: Processor<unknown>): void {
  const Parser = this.Parser;

  function superscriptLinkTokenizer(
    this: RemarkParser,
    eat: Eat,
    value: string,
    silent: boolean,
  ): Node | boolean | void {
    const marker = value[0];
    const now = eat.now();
    now.column += 1;
    now.offset += 1;

    if (marker !== "^") {
      return;
    }

    const endMarkerIndex = value.indexOf("^", 1);
    if (endMarkerIndex < 0) {
      return;
    }

    // if it's actually empty, don't tokenize (disallows e.g. <sup></sup>)
    if (endMarkerIndex === 1) {
      console.log("no");
      return;
    }

    if (silent) {
      return true;
    }

    return eat(value.substring(0, endMarkerIndex + 1))({
      children: [
        {
          type: "text",
          value: value.substring(1, endMarkerIndex),
        },
      ],
      data: {
        hName: "sup",
      },
      type: "element",
    });
  }

  superscriptLinkTokenizer.locator = (
    value: string,
    fromIndex: number,
  ): number => {
    return value.indexOf("^", fromIndex);
  };

  // Inject inlineTokenizer
  const inlineTokenizers = Parser.prototype.inlineTokenizers;
  const inlineMethods = Parser.prototype.inlineMethods;
  inlineTokenizers.superscript = superscriptLinkTokenizer;
  inlineMethods.splice(inlineMethods.indexOf("text"), 0, "superscript");
}

export default superscriptMarkdownPlugin;
