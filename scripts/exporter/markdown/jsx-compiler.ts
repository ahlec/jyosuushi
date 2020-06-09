import { Processor } from "unified";
import { Node } from "unist";
import { VFile } from "vfile";
import toH, { Properties } from "hast-to-hyperscript";
import toHast from "mdast-util-to-hast";

import { INTRASITE_LINK_HAST_NODE_NAME } from "./intrasite-link-plugin";

interface JSXRepresentation {
  childrenJsx: string;
  containsIntrasiteLink: boolean;
  jsx: string;
  numChildNodes: number;
  tag: string;
}

export interface JsxCompilerVFileData {
  usesReactRouterLink: boolean;
}

function isIndexableObject(obj: unknown): obj is { [index: string]: unknown } {
  return typeof obj === "object" && obj !== null;
}

function isJsxRepresentation(child: unknown): child is JSXRepresentation {
  return isIndexableObject(child) && "jsx" in child;
}

function getChildAsJsx(child: unknown): string | null {
  if (typeof child === "string") {
    if (!child.trim()) {
      return null;
    }

    return child;
  }

  if (isJsxRepresentation(child)) {
    return child.jsx;
  }

  throw new Error("Unexpected child encountered.");
}

function doesChildContainIntrasiteLink(child: unknown): boolean {
  if (!isJsxRepresentation(child)) {
    return false;
  }

  return child.containsIntrasiteLink;
}

function isNotNull<T>(val: T | null): val is T {
  return val !== null;
}

function h(
  name: string,
  props: Properties | undefined,
  children: readonly unknown[] | undefined
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
      openingTagPieces.push(`id="${props["id"]}"`);
    }

    if (props["class"]) {
      openingTagPieces.push(`className="${props["class"]}"`);
    }

    if (props["href"]) {
      openingTagPieces.push(`href="${props["href"]}"`);

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

function jsxCompiler(this: Processor<unknown>): void {
  this.Compiler = function compile(node: Node, file: VFile): string {
    const tree = toHast(node);
    const root = toH(h, tree);

    const data: JsxCompilerVFileData = {
      usesReactRouterLink: root.containsIntrasiteLink
    };
    file.data = data;

    if (root.tag === "div") {
      if (root.numChildNodes <= 1) {
        return root.childrenJsx;
      }

      return `<React.Fragment>${root.childrenJsx}</React.Fragment>`;
    }

    return root.jsx;
  };
}

export function assertJsxCompilerVFileData(
  data: unknown
): asserts data is JsxCompilerVFileData {
  if (!isIndexableObject(data)) {
    throw new Error("Data must be an indexable object!");
  }

  if (typeof data["usesReactRouterLink"] !== "boolean") {
    throw new Error("Data must have the 'usesReactRouterLink' boolean on it.");
  }
}

export default jsxCompiler;
