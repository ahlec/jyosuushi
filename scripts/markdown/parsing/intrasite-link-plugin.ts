import { Processor } from "unified";
import { Node } from "unist";

import { CounterRegistry, IntrasiteLinkLocation } from "../types";

import { Eat, RemarkParser } from "./interfaces";
import PluginWarningsCollector from "./PluginWarningsCollector";

import {
  COUNTER_DISPLAY_HAST_NODE_NAME,
  COUNTER_DISPLAY_PROPS_KEY,
  CounterDisplayProperties,
  INTRASITE_LINK_HAST_NODE_NAME,
  INTRASITE_LINK_PROPS_KEY,
  IntrasiteLinkProperties,
} from "./custom-nodes";

interface IntrasiteLinkConfig {
  counterRegistry: CounterRegistry;
  currentLocation: IntrasiteLinkLocation | null;
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

function isIntrasiteLinkToLocation(
  definition: IntrasiteLinkDefinition,
  location: IntrasiteLinkLocation
): boolean {
  return definition.id === location.id;
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

      if (silent) {
        return true;
      }

      const handleNonExportedContent = (): Node => {
        if (config.warningsCollector) {
          config.warningsCollector.add(
            `Intrasite ${definition.type} link to '${definition.id}' would navigate to non-exported content. No link generated.`
          );
        }

        return eat(value.substring(0, endMarkerIndex + 1))({
          type: "text",
          value: definition.id,
        });
      };

      let intrasiteLinkProps: IntrasiteLinkProperties;
      let childProps: CounterDisplayProperties;
      switch (definition.type) {
        case "counter": {
          const counter = config.counterRegistry[definition.id];
          if (!counter) {
            return handleNonExportedContent();
          }

          childProps = {
            primaryText:
              definition.specificKanji || counter.primaryPresentation,
            reading: definition.specificReading || counter.primaryReading,
          };

          intrasiteLinkProps = {
            id: definition.id,
            type: "counter",
          };
          break;
        }
      }

      return eat(value.substring(0, endMarkerIndex + 1))({
        children: [
          {
            children: [],
            data: {
              hName: COUNTER_DISPLAY_HAST_NODE_NAME,
              hProperties: {
                [COUNTER_DISPLAY_PROPS_KEY]: childProps,
              },
            },
            type: "element",
          },
        ],
        data:
          config.currentLocation &&
          isIntrasiteLinkToLocation(definition, config.currentLocation)
            ? {
                hName: "strong",
              }
            : {
                hName: INTRASITE_LINK_HAST_NODE_NAME,
                hProperties: {
                  [INTRASITE_LINK_PROPS_KEY]: intrasiteLinkProps,
                },
              },
        type: "element",
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
