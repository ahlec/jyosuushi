import { Processor } from "unified";
import { Node } from "unist";

import { Eat, RemarkParser } from "./interfaces";
import PluginWarningsCollector from "./PluginWarningsCollector";

import { IntrasiteLinkProps } from "./remark-compilers/types";

export const INTRASITE_LINK_HAST_NODE_NAME = "intrasiteLink";

interface IntrasiteLinkConfig {
  exportedCounterIds: ReadonlySet<string>;
  warningsCollector: PluginWarningsCollector | null;
}

function intrasiteLinkMarkdownPlugin(
  this: Processor<unknown>,
  config: IntrasiteLinkConfig
): void {
  const Parser = this.Parser;

  function intrasiteLinkTokenizer(
    this: RemarkParser,
    eat: Eat,
    value: string,
    silent: boolean
  ): Node | boolean | void {
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

      const rawContents = value.substring(1, endMarkerIndex);
      const contentPieces = rawContents.split(":");
      if (contentPieces.length !== 2) {
        throw new Error(
          `Invalid contents for intrasite link: '${rawContents}'`
        );
      }

      if (!contentPieces[1]) {
        throw new Error(
          `Encountered empty intrasite link id ('${rawContents}')`
        );
      }

      let isContentExported: boolean;
      let intrasiteLinkProps: IntrasiteLinkProps;
      switch (contentPieces[0]) {
        case "counter": {
          isContentExported = config.exportedCounterIds.has(contentPieces[1]);
          intrasiteLinkProps = {
            counterId: contentPieces[1],
          };
          break;
        }
        default: {
          throw new Error(`Invalid intrasite link: '${contentPieces[0]}'`);
        }
      }

      if (silent) {
        return true;
      }

      if (!isContentExported) {
        if (config.warningsCollector) {
          config.warningsCollector.add(
            `Intrasite ${contentPieces[0]} link to '${contentPieces[1]}' would navigate to non-exported content. No link generated.`
          );
        }

        return eat(value.substring(0, endMarkerIndex + 1))({
          type: "text",
          value: contentPieces[1],
        });
      }

      return eat(value.substring(0, endMarkerIndex + 1))({
        children: [
          {
            type: "text",
            value: contentPieces[1],
          },
        ],
        data: {
          hName: INTRASITE_LINK_HAST_NODE_NAME,
          hProperties: {
            intrasiteLink: intrasiteLinkProps,
          },
        },
        type: "intrasite-link",
      });
    }
  }

  intrasiteLinkTokenizer.locator = (
    value: string,
    fromIndex: number
  ): number => {
    return value.indexOf("<", fromIndex);
  };

  // Inject inlineTokenizer
  const inlineTokenizers = Parser.prototype.inlineTokenizers;
  const inlineMethods = Parser.prototype.inlineMethods;
  inlineTokenizers.intrasiteLink = intrasiteLinkTokenizer;
  inlineMethods.splice(inlineMethods.indexOf("text"), 0, "intrasiteLink");
}

export default intrasiteLinkMarkdownPlugin;
