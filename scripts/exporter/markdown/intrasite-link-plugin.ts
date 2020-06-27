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

interface IntrasiteLinkDefinition {
  type: "counter";
  id: string;
  specificReading: string | null;
  specificKanji: string | null;
}

const INTRASITE_LINK_REGEX = /([a-z]+):([^|>]*)(\|(.*))?/;

function parseIntrasiteLinkContents(contents: string): IntrasiteLinkDefinition {
  const match = contents.match(INTRASITE_LINK_REGEX);
  if (!match) {
    throw new Error(`Invalid intrasite link: '${contents}'`);
  }

  const customArgs: { [name: string]: string } = {};
  if (match[4]) {
    try {
      const keyValuePairs = match[4].split(",");
      keyValuePairs.forEach((pair: string): void => {
        const equalSignIndex = pair.indexOf("=");
        if (equalSignIndex < 0) {
          throw new Error("KVP without an equal sign!");
        }

        const [key, value] = pair.split("=");
        customArgs[key] = value;
      });
    } catch {
      throw new Error(
        `Encountered an error trying to parse key-value custom arguments '${match[4]}' ('${contents}')`
      );
    }
  }

  switch (match[1]) {
    case "counter": {
      Object.keys(customArgs).forEach((key: string): void => {
        switch (key) {
          case "reading":
          case "kanji": {
            return;
          }
          default: {
            throw new Error(
              `Unrecognized property '${key}' on counter intralink ('${contents}')`
            );
          }
        }
      });

      return {
        id: match[2],
        specificKanji: customArgs["kanji"] || null,
        specificReading: customArgs["reading"] || null,
        type: "counter",
      };
    }
    default: {
      throw new Error(
        `Unrecognized intrasite link type '${match[1]}' ('${contents}')`
      );
    }
  }
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

      const definition = parseIntrasiteLinkContents(
        value.substring(1, endMarkerIndex)
      );

      let isContentExported: boolean;
      let intrasiteLinkProps: IntrasiteLinkProps;
      switch (definition.type) {
        case "counter": {
          isContentExported = config.exportedCounterIds.has(definition.id);
          intrasiteLinkProps = {
            counterId: definition.id,
            specificKanji: definition.specificKanji,
            specificReading: definition.specificReading,
          };
          break;
        }
      }

      if (silent) {
        return true;
      }

      if (!isContentExported) {
        if (config.warningsCollector) {
          config.warningsCollector.add(
            `Intrasite ${definition.type} link to '${definition.id}' would navigate to non-exported content. No link generated.`
          );
        }

        return eat(value.substring(0, endMarkerIndex + 1))({
          type: "text",
          value: definition.id,
        });
      }

      return eat(value.substring(0, endMarkerIndex + 1))({
        children: [],
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
