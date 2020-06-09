import { Processor } from "unified";
import { Node } from "unist";
import { VFile } from "vfile";
import toH, { Properties } from "hast-to-hyperscript";
import toHast from "mdast-util-to-hast";

import { JSXRepresentation } from "../types";
import { isIndexableObject } from "../utils";
import writeNodeAsJsx, { WriteNodeAsJsxOptions } from "../write-node-as-jsx";

interface JsxCompilerOptions {
  footnoteLocalRefIdToGlobalId: { [localRefId: string]: number | undefined };
}

export interface JsxCompilerVFileData {
  usesReactRouterLink: boolean;
}

function isFootnotesContainerDiv(
  name: string,
  props: Properties | undefined
): boolean {
  return name === "div" && !!props && props["class"] === "footnotes";
}

function h(
  name: string,
  props: Properties | undefined,
  children: readonly (string | JSXRepresentation)[] | undefined,
  options: WriteNodeAsJsxOptions
): JSXRepresentation {
  // Exclude footnotes section from the main body. Footnotes will
  // be extracted in a separate process.
  if (isFootnotesContainerDiv(name, props)) {
    return {
      childrenJsx: "",
      containsIntrasiteLink: false,
      jsx: "",
      numChildNodes: 0,
      tag: ""
    };
  }

  return writeNodeAsJsx(name, props, children, options);
}

function jsxCompiler(
  this: Processor<unknown>,
  options: JsxCompilerOptions
): void {
  this.Compiler = function compile(node: Node, file: VFile): string {
    const tree = toHast(node);
    const writeNodeOptions: WriteNodeAsJsxOptions = {
      footnoteLocalToGlobalMap: options.footnoteLocalRefIdToGlobalId
    };
    const root = toH<JSXRepresentation>(
      (name, props, children) => h(name, props, children, writeNodeOptions),
      tree
    );

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
