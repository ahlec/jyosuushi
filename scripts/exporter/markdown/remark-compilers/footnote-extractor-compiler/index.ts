import { isArray } from "lodash";
import toHast from "mdast-util-to-hast";
import { Processor } from "unified";
import { Node } from "unist";
import { VFile } from "vfile";

import { JSXRepresentation } from "../types";
import { isIndexableObject } from "../utils";
import writeNodeAsJsx from "../write-node-as-jsx";

interface FootnoteExtractorCompilerOptions {
  refnoteStart: number;
}

export interface Footnote {
  localRefId: string;
  globalRefId: number;
  noteJsx: JSXRepresentation;
}

interface FootnoteExtractorCompilerVFileData {
  footnotes: ReadonlyArray<Footnote>;
}

function isNodeFootnotesContainer(node: Node): boolean {
  const properties = node["properties"];
  return (
    node.type === "element" &&
    node.tagName === "div" &&
    properties &&
    isIndexableObject(properties) &&
    isArray(properties.className) &&
    properties.className[0] === "footnotes"
  );
}

function isFootnoteLiElement(node: Node): boolean {
  const properties = node["properties"];
  return (
    node.type === "element" &&
    node.tagName === "li" &&
    properties &&
    isIndexableObject(properties) &&
    typeof properties["id"] === "string" &&
    properties["id"].startsWith("fn-")
  );
}

function isHastNode(obj: unknown): obj is Node {
  if (!isIndexableObject(obj)) {
    return false;
  }

  if (typeof obj["type"] !== "string") {
    return false;
  }

  switch (obj["type"]) {
    case "text": {
      return typeof obj["value"] === "string";
    }
    case "element": {
      return typeof obj["tagName"] === "string";
    }
    default: {
      return false;
    }
  }
}

function findAllNodes(
  node: Node,
  predicate: (node: Node) => boolean
): ReadonlyArray<Node> {
  const results: Node[] = [];
  if (predicate(node)) {
    results.push(node);
  }

  const children = node["children"];
  if (children && isArray(children)) {
    for (const child of children) {
      if (!isHastNode(child)) {
        throw new Error("Encountered non-Hast child node.");
      }

      results.push(...findAllNodes(child, predicate));
    }
  }

  return results;
}

function collectFootnoteNodes(tree: Node): ReadonlyArray<Node> {
  const containers = findAllNodes(tree, isNodeFootnotesContainer);
  if (containers.length < 1) {
    return [];
  }

  const [container] = containers;
  return findAllNodes(container, isFootnoteLiElement);
}

function convertNodeToFootnote(node: Node, globalRefId: number): Footnote {
  const properties = node["properties"];
  const children = node["children"];
  if (
    !properties ||
    !isIndexableObject(properties) ||
    typeof properties["id"] !== "string" ||
    !properties["id"].startsWith("fn-") ||
    !children ||
    !isArray(children)
  ) {
    throw new Error("Received an invalid <li/> footnote node.");
  }

  const localRefId = properties["id"].substring("fn-".length);
  return {
    globalRefId,
    localRefId,
    noteJsx: writeNodeAsJsx("li", properties, children, {
      footnoteLocalToGlobalMap: {
        [localRefId]: globalRefId
      }
    })
  };
}

function footnoteExtractorCompiler(
  this: Processor<unknown>,
  options: FootnoteExtractorCompilerOptions
): void {
  this.Compiler = function compile(node: Node, file: VFile): string {
    const tree = toHast(node);
    const footnoteNodes = collectFootnoteNodes(tree);

    const data: FootnoteExtractorCompilerVFileData = {
      footnotes: footnoteNodes.map(
        (node, index): Footnote =>
          convertNodeToFootnote(node, options.refnoteStart + index)
      )
    };
    file.data = data;

    return "<N/A>";
  };
}

export function assertFootnoteExtractorCompilerVFileData(
  data: unknown
): asserts data is FootnoteExtractorCompilerVFileData {
  if (!isIndexableObject(data)) {
    throw new Error("Data must be an indexable object!");
  }

  if (!isArray(data["footnotes"])) {
    throw new Error("Data must have the 'footnotes' array on it.");
  }
}

export default footnoteExtractorCompiler;
