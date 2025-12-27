import { HastNode, HastSyntaxTree } from "./types";
import { isNodeFootnotesContainer } from "./utils";

export interface Footnote {
  refId: number;
  syntaxTree: HastNode;
}

function isFootnoteLiElement(node: HastNode): boolean {
  if (node.type !== "element") {
    return false;
  }

  if (node.tagName !== "li") {
    return false;
  }

  if (!node.properties) {
    return false;
  }

  const { id } = node.properties;
  if (typeof id !== "string") {
    return false;
  }

  return id.startsWith("fn-");
}

function collectAllNodes(
  node: HastNode,
  predicate: (node: HastNode) => boolean,
  nodes: HastNode[],
): void {
  if (predicate(node)) {
    nodes.push(node);
  }

  if (node.type === "element") {
    node.children.forEach((child): void =>
      collectAllNodes(child, predicate, nodes),
    );
  }
}

function collectFootnoteNodes(tree: HastSyntaxTree): readonly HastNode[] {
  // Find the footnote container element, which will exist in the tree
  // only if there's at least one footnote in the document.
  const containers: HastNode[] = [];
  tree.children.forEach((child): void =>
    collectAllNodes(child, isNodeFootnotesContainer, containers),
  );
  if (containers.length < 1) {
    return [];
  }

  // Now that we have the footnotes container, pull from it all of the footnote
  // nodes.
  const [container] = containers;
  const footnoteNodes: HastNode[] = [];
  collectAllNodes(container, isFootnoteLiElement, footnoteNodes);
  return footnoteNodes;
}

function convertNodeToFootnote(node: HastNode): Footnote {
  if (node.type !== "element" || node.tagName !== "li") {
    throw new Error('Received a "footnote" that wasn\'t a <li /> element.');
  }

  if (!node.properties) {
    throw new Error("Received a <li /> element without properties.");
  }

  const { id } = node.properties;
  if (typeof id !== "string" || !id.startsWith("fn-")) {
    throw new Error("Received an invalid <li /> footnote node.");
  }

  const localRefId = id.substring("fn-".length);
  return {
    refId: parseInt(localRefId, 10),
    syntaxTree: node,
  };
}

export function extractFootnotes(
  hastSyntaxTree: HastSyntaxTree,
): readonly Footnote[] {
  const footnoteNodes = collectFootnoteNodes(hastSyntaxTree);
  return footnoteNodes.map(convertNodeToFootnote);
}
