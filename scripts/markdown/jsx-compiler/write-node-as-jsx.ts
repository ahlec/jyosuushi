import {
  COUNTER_DISPLAY_HAST_NODE_NAME,
  COUNTER_DISPLAY_PROPS_KEY,
  isCounterDisplayProperties,
  INTRASITE_LINK_HAST_NODE_NAME,
  INTRASITE_LINK_PROPS_KEY,
  isIntrasiteLinkProperties,
} from "../parsing/custom-nodes";
import { JsxComponentUsage, JsxRepresentation } from "../types";

import { mergeComponentUsages } from "./utils";

export function writeNodeAsJsx(
  tagName: string,
  properties: Record<string, unknown>,
  children: readonly JsxRepresentation[]
): JsxRepresentation {
  // Interpret the JSX tag
  let jsxTag: string;
  let ownComponentUsage: JsxComponentUsage;
  switch (tagName) {
    case COUNTER_DISPLAY_HAST_NODE_NAME: {
      jsxTag = "CounterDisplay";
      ownComponentUsage = {
        counterDisplay: true,
        intrasiteLink: false,
      };
      break;
    }
    case INTRASITE_LINK_HAST_NODE_NAME: {
      jsxTag = "IntrasiteLink";
      ownComponentUsage = {
        counterDisplay: false,
        intrasiteLink: true,
      };
      break;
    }
    default: {
      jsxTag = tagName;
      ownComponentUsage = {
        counterDisplay: false,
        intrasiteLink: false,
      };
      break;
    }
  }

  const openingTagPieces: string[] = [jsxTag];

  // Handle props
  if (typeof properties.id === "string" && properties.id) {
    openingTagPieces.push(`id="${properties.id}"`);
  }

  if (Array.isArray(properties.className) && properties.className.length) {
    openingTagPieces.push(`className="${properties.className.join(" ")}"`);
  }

  if (typeof properties.href === "string" && properties.href) {
    openingTagPieces.push(`href="${properties.href}"`);

    if (!properties.href.startsWith("#")) {
      openingTagPieces.push('target="_blank"');
      openingTagPieces.push('rel="noopener noreferrer"');
    }
  }

  if (typeof properties.src === "string" && properties.src) {
    openingTagPieces.push(`src="${properties.src}"`);
  }

  if (typeof properties.alt === "string" && properties.alt) {
    openingTagPieces.push(`alt="${properties.alt}"`);
  }

  const intrasiteLinkProps = properties[INTRASITE_LINK_PROPS_KEY];
  if (isIntrasiteLinkProperties(intrasiteLinkProps)) {
    openingTagPieces.push(`id="${intrasiteLinkProps.id}"`);
  }

  const counterDisplayProps = properties[COUNTER_DISPLAY_PROPS_KEY];
  if (isCounterDisplayProperties(counterDisplayProps)) {
    openingTagPieces.push(`primaryText="${counterDisplayProps.primaryText}"`);
    openingTagPieces.push(`reading="${counterDisplayProps.reading}"`);
  }

  // Determine the component usage for this tree
  const allComponentUsages = children.map((child) => child.componentUsage);
  allComponentUsages.push(ownComponentUsage);
  const combinedComponentUsage = mergeComponentUsages(allComponentUsages);

  // Handle children
  const jsxChildren = children.map((child): string => child.jsx).join("");

  const openingTag = openingTagPieces.join(" ");
  if (!jsxChildren) {
    return {
      componentUsage: combinedComponentUsage,
      jsx: `<${openingTag} />`,
    };
  }

  return {
    componentUsage: combinedComponentUsage,
    jsx: `<${openingTag}>${jsxChildren}</${jsxTag}>`,
  };
}
