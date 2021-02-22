import {
  INTRASITE_LINK_HAST_NODE_NAME,
  isIntrasiteLinkProperties,
} from "../parsing/custom-nodes";

import { JSXRepresentation } from "./types";

export function writeNodeAsJsx(
  tagName: string,
  properties: Record<string, unknown>,
  children: readonly JSXRepresentation[]
): JSXRepresentation {
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

  // Handle children
  const jsxChildren = children.map((child): string => child.jsx).join("");
  const containsCounterLink =
    isCounterLink ||
    children.some((child): boolean => child.containsCounterLink);

  const openingTag = openingTagPieces.join(" ");
  if (!jsxChildren) {
    return {
      containsCounterLink,
      jsx: `<${openingTag} />`,
      tag: jsxTag,
    };
  }

  return {
    containsCounterLink,
    jsx: `<${openingTag}>${jsxChildren}</${jsxTag}>`,
    tag: jsxTag,
  };
}
