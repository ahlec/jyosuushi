import { Processor } from "unified";
import { Node } from "unist";
import { VFile } from "vfile";
import toH from "hast-to-hyperscript";
import toHast from "mdast-util-to-hast";

import { HastToHyperscriptProperties, JSXRepresentation } from "../types";
import { isIndexableObject } from "../utils";
import writeNodeAsJsx from "../write-node-as-jsx";

export interface JsxCompilerVFileData {
  usesReactRouterLink: boolean;
}

function isFootnotesContainerDiv(
  name: string,
  props: HastToHyperscriptProperties | undefined
): boolean {
  return name === "div" && !!props && props["class"] === "footnotes";
}

function h(
  name: string,
  props: HastToHyperscriptProperties | undefined,
  children: readonly (string | JSXRepresentation)[] | undefined
): JSXRepresentation {
  // Exclude footnotes section from the main body. Footnotes will
  // be extracted in a separate process.
  if (isFootnotesContainerDiv(name, props)) {
    return {
      childrenJsx: "",
      containsIntrasiteLink: false,
      jsx: "",
      numChildNodes: 0,
      tag: "",
    };
  }

  return writeNodeAsJsx(name, props, children);
}

function jsxCompiler(this: Processor<unknown>): void {
  this.Compiler = function compile(node: Node, file: VFile): string {
    const tree = toHast(node);
    const root = toH(h, tree);

    const data: JsxCompilerVFileData = {
      usesReactRouterLink: root.containsIntrasiteLink,
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
