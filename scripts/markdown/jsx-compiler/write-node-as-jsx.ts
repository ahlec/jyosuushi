import {
  INTRASITE_LINK_HAST_NODE_NAME,
  isIntrasiteLinkProperties,
} from "../parsing/custom-nodes";
import { JsxRepresentation } from "../types";

import { mergeComponentUsages } from "./utils";

export function writeNodeAsJsx(
  tagName: string,
  properties: Record<string, unknown>,
  children: readonly JsxRepresentation[]
): JsxRepresentation {
  // Interpret the JSX tag
  let jsxTag: string;
  let isCounterLink: boolean;
  switch (tagName) {
    case INTRASITE_LINK_HAST_NODE_NAME: {
      jsxTag = "CounterLink";
      isCounterLink = true;
      break;
    }
    default: {
      jsxTag = tagName;
      isCounterLink = false;
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

  if (isIntrasiteLinkProperties(properties.intrasiteLink)) {
    openingTagPieces.push(`counterId="${properties.intrasiteLink.counterId}"`);

    if (properties.intrasiteLink.specificKanji) {
      openingTagPieces.push(
        `specificKanji="${properties.intrasiteLink.specificKanji}"`
      );
    }

    if (properties.intrasiteLink.specificReading) {
      openingTagPieces.push(
        `specificReading="${properties.intrasiteLink.specificReading}"`
      );
    }
  }

  // Determine the component usage for this tree
  const allComponentUsages = children.map((child) => child.componentUsage);
  allComponentUsages.push({
    counterLink: isCounterLink,
  });
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
