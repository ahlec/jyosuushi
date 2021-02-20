import { HastNode, HastSyntaxTree } from "../types";
import { isNodeFootnotesContainer } from "../utils";

import { JSXRepresentation } from "./types";
import { writeNodeAsJsx } from "./write-node-as-jsx";

export interface CompiledJsx {
  jsx: string;
  requiresCounterLink: boolean;
}

function compileHastNodeToJsx(node: HastNode): JSXRepresentation | null {
  // Exclude footnotes section from the compilation. Footnotes have already
  // been extracted.
  if (isNodeFootnotesContainer(node)) {
    return null;
  }

  // If we're a text element, we can convert to JSX here
  if (node.type === "text") {
    if (!node.value.trim()) {
      // Empty whitespace
      return null;
    }

    return {
      childrenJsx: node.value,
      containsCounterLink: false,
      jsx: node.value,
      tag: "",
    };
  }

  // First, transform all of the children of this node
  const children: JSXRepresentation[] = [];
  node.children.map((child): void => {
    const childRepresentation = compileHastNodeToJsx(child);
    if (!childRepresentation) {
      return;
    }

    children.push(childRepresentation);
  });

  // Transform the node into JSX
  return writeNodeAsJsx(node.tagName, node.properties || {}, children);
}

export function compileToJsx(node: HastSyntaxTree): CompiledJsx {
  // Transform each block of the syntax tree
  const blocks: JSXRepresentation[] = [];
  node.children.forEach((child): void => {
    const block = compileHastNodeToJsx(child);
    if (block) {
      blocks.push(block);
    }
  });

  // Combine the blocks together into a single JSX element
  let jsx: string;
  switch (blocks.length) {
    case 0: {
      jsx = "<React.Fragment />";
      break;
    }
    case 1: {
      jsx = blocks[0].jsx;
      break;
    }
    default: {
      jsx = `<React.Fragment>${blocks
        .map((block): string => block.jsx)
        .join("")}</React.Fragment>`;
      break;
    }
  }

  // Return the compiled results
  return {
    jsx,
    requiresCounterLink: blocks.some(
      (block): boolean => block.containsCounterLink
    ),
  };
}
