import { INTRASITE_LINK_HAST_NODE_NAME } from "../intrasite-link-plugin";

import { HastToHyperscriptProperties, JSXRepresentation } from "./types";

function getChildAsJsx<T extends JSXRepresentation>(
  child: string | T
): string | null {
  if (typeof child === "string") {
    if (!child.trim()) {
      return null;
    }

    return child;
  }

  return child.jsx;
}

function doesChildContainCounterLink<T extends JSXRepresentation>(
  child: string | T
): boolean {
  if (typeof child === "string") {
    return false;
  }

  return child.containsCounterLink;
}

function isNotNull<T>(val: T | null): val is T {
  return val !== null;
}

function writeNodeAsJsx(
  name: string,
  props: HastToHyperscriptProperties | undefined,
  children: readonly (string | JSXRepresentation)[] | undefined
): JSXRepresentation {
  let jsxTag: string;
  let isCounterLink: boolean;
  switch (name) {
    case INTRASITE_LINK_HAST_NODE_NAME: {
      jsxTag = "CounterLink";
      isCounterLink = true;
      break;
    }
    default: {
      jsxTag = name;
      isCounterLink = false;
      break;
    }
  }

  const openingTagPieces: string[] = [jsxTag];

  // Handle props
  if (props) {
    if (props.id) {
      openingTagPieces.push(`id="${props.id}"`);
    }

    if (props["class"]) {
      openingTagPieces.push(`className="${props["class"]}"`);
    }

    if (props.href) {
      openingTagPieces.push(`href="${props.href}"`);

      if (!props.href.startsWith("#")) {
        openingTagPieces.push('target="_blank"');
        openingTagPieces.push('rel="noopener noreferrer"');
      }
    }

    if (props.src) {
      openingTagPieces.push(`src="${props.src}"`);
    }

    if (props.alt) {
      openingTagPieces.push(`alt="${props.alt}"`);
    }

    if (props.intrasiteLink) {
      openingTagPieces.push(`counterId="${props.intrasiteLink.counterId}"`);

      if (props.intrasiteLink.specificKanji) {
        openingTagPieces.push(
          `specificKanji="${props.intrasiteLink.specificKanji}"`
        );
      }

      if (props.intrasiteLink.specificReading) {
        openingTagPieces.push(
          `specificReading="${props.intrasiteLink.specificReading}"`
        );
      }
    }
  }

  // Handle children
  let jsxChildren: string;
  let numChildNodes: number;
  let childContainsCounterLink: boolean;

  if (children) {
    const consolidatedChildren = children.map(getChildAsJsx).filter(isNotNull);
    jsxChildren = consolidatedChildren.join("");
    numChildNodes = consolidatedChildren.length;
    childContainsCounterLink = children.some(doesChildContainCounterLink);
  } else {
    jsxChildren = "";
    numChildNodes = 0;
    childContainsCounterLink = false;
  }

  // Consolidate together
  const containsCounterLink = isCounterLink || childContainsCounterLink;

  const openingTag = openingTagPieces.join(" ");
  if (!jsxChildren) {
    return {
      childrenJsx: "",
      containsCounterLink,
      jsx: `<${openingTag} />`,
      numChildNodes: 0,
      tag: jsxTag,
    };
  }

  return {
    childrenJsx: jsxChildren,
    containsCounterLink,
    jsx: `<${openingTag}>${jsxChildren}</${jsxTag}>`,
    numChildNodes,
    tag: jsxTag,
  };
}

export default writeNodeAsJsx;
