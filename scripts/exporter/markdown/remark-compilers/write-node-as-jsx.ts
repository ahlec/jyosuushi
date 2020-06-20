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

function doesChildContainIntrasiteLink<T extends JSXRepresentation>(
  child: string | T
): boolean {
  if (typeof child === "string") {
    return false;
  }

  return child.containsIntrasiteLink;
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
  let isIntrasiteLink: boolean;
  switch (name) {
    case INTRASITE_LINK_HAST_NODE_NAME: {
      jsxTag = "Link";
      isIntrasiteLink = true;
      break;
    }
    default: {
      jsxTag = name;
      isIntrasiteLink = false;
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

    if (props.to) {
      openingTagPieces.push(`to="${props.to}"`);
    }
  }

  // Handle children
  let jsxChildren: string;
  let numChildNodes: number;
  let childContainsIntrasiteLink: boolean;

  if (children) {
    const consolidatedChildren = children.map(getChildAsJsx).filter(isNotNull);
    jsxChildren = consolidatedChildren.join("");
    numChildNodes = consolidatedChildren.length;
    childContainsIntrasiteLink = children.some(doesChildContainIntrasiteLink);
  } else {
    jsxChildren = "";
    numChildNodes = 0;
    childContainsIntrasiteLink = false;
  }

  // Consolidate together
  const containsIntrasiteLink = isIntrasiteLink || childContainsIntrasiteLink;

  const openingTag = openingTagPieces.join(" ");
  if (!jsxChildren) {
    return {
      childrenJsx: "",
      containsIntrasiteLink,
      jsx: `<${openingTag} />`,
      numChildNodes: 0,
      tag: jsxTag,
    };
  }

  return {
    childrenJsx: jsxChildren,
    containsIntrasiteLink,
    jsx: `<${openingTag}>${jsxChildren}</${jsxTag}>`,
    numChildNodes,
    tag: jsxTag,
  };
}

export default writeNodeAsJsx;
