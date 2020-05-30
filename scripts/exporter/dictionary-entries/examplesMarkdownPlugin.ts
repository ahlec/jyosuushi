import { Processor } from "unified";
import { Node } from "unist";

import { Eat, RemarkParser } from "./interfaces";

function exampleTokenizer(
  this: RemarkParser,
  eat: Eat,
  value: string,
  silent: boolean
): Node | boolean | void {
  // allow escaping of all markers
  //   for (const marker of Object.keys(markers)) {
  //     if (!this.escape.includes(marker)) this.escape.push(marker);
  //   }

  const marker = value[0];
  const now = eat.now();
  now.column += 1;
  now.offset += 1;

  if (marker === "<" && !value.startsWith(marker + marker)) {
    const endMarkerIndex = value.indexOf(">");
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
      children: this.tokenizeInline(value.substring(1, endMarkerIndex), now),
      data: {
        hName: "span",
        hProperties: {
          propClassName: "exampleClassName"
        }
      },
      type: "example"
    });
  }
}

exampleTokenizer.locator = (value: string, fromIndex: number): number => {
  return value.indexOf("<", fromIndex);
};

function examplesMarkdownPlugin(this: Processor<unknown>): void {
  const Parser = this.Parser;

  // Inject inlineTokenizer
  const inlineTokenizers = Parser.prototype.inlineTokenizers;
  const inlineMethods = Parser.prototype.inlineMethods;
  inlineTokenizers.example = exampleTokenizer;
  inlineMethods.splice(inlineMethods.indexOf("text"), 0, "example");
}

export default examplesMarkdownPlugin;
