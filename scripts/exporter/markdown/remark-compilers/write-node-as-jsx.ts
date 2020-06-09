import { Properties } from "hast-to-hyperscript";

import { INTRASITE_LINK_HAST_NODE_NAME } from "../intrasite-link-plugin";

import { JSXRepresentation } from "./types";

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

export interface WriteNodeAsJsxOptions {
  footnoteLocalToGlobalMap: { [localRefId: string]: number | undefined };
}

function convertLocalFootnoteIdentifierToGlobal(
  identifierStr: string,
  options: WriteNodeAsJsxOptions
): string {
  const localRefIdIndex = identifierStr.indexOf("-") + 1;
  const localRefId = identifierStr.substr(localRefIdIndex);
  const globalRefId = options.footnoteLocalToGlobalMap[localRefId];
  if (typeof globalRefId !== "number") {
    throw new Error(
      `Could not find globalRefId for localRefId '${localRefId}'`
    );
  }

  return `${identifierStr.substring(0, localRefIdIndex)}${globalRefId}`;
}

function writeNodeAsJsx(
  name: string,
  props: Properties | undefined,
  children: readonly (string | JSXRepresentation)[] | undefined,
  options: WriteNodeAsJsxOptions
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

  if (props) {
    if (props.id) {
      let id: string;
      if (props.id.startsWith("fn-") || props.id.startsWith("fnref-")) {
        id = convertLocalFootnoteIdentifierToGlobal(props.id, options);
      } else {
        id = props.id;
      }

      openingTagPieces.push(`id="${id}"`);
    }

    if (props["class"]) {
      openingTagPieces.push(`className="${props["class"]}"`);
    }

    if (props.href) {
      let href: string;
      if (props.href.startsWith("#fnref-") || props.href.startsWith("#fn-")) {
        href = convertLocalFootnoteIdentifierToGlobal(props.href, options);
      } else {
        href = props.href;
      }

      openingTagPieces.push(`href="${href}"`);

      if (!props.href.startsWith("#")) {
        openingTagPieces.push('target="_blank"');
        openingTagPieces.push('rel="noopener noreferrer"');
      }
    }

    if (props.to) {
      openingTagPieces.push(`to="${props.to}"`);
    }
  }

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

  const containsIntrasiteLink = isIntrasiteLink || childContainsIntrasiteLink;

  const openingTag = openingTagPieces.join(" ");
  if (!jsxChildren) {
    return {
      childrenJsx: "",
      containsIntrasiteLink,
      jsx: `<${openingTag} />`,
      numChildNodes: 0,
      tag: jsxTag
    };
  }

  return {
    childrenJsx: jsxChildren,
    containsIntrasiteLink,
    jsx: `<${openingTag}>${jsxChildren}</${jsxTag}>`,
    numChildNodes,
    tag: jsxTag
  };
}

export default writeNodeAsJsx;
