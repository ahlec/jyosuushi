import { Node } from "unist";
import { Transformer } from "unified";
import visit from "unist-util-visit";

interface TextNode extends Node {
  value?: string;
}

const DOUBLE_HYPHEN_REGEX = /--/g;

function visitor(node: TextNode): void {
  if (!node.value) {
    return;
  }

  node.value = node.value.replace(DOUBLE_HYPHEN_REGEX, "—");
}

function mdash(): Transformer {
  return (tree: Node): void => visit(tree, "text", visitor);
}

export default mdash;
