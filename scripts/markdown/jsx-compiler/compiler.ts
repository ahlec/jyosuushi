import { HastNode, HastSyntaxTree, JsxRepresentation } from "../types";
import { isNodeFootnotesContainer } from "../utils";

import { mergeComponentUsages } from "./utils";
import { writeNodeAsJsx } from "./write-node-as-jsx";

interface CompileContext {
  isInsideReactNode: boolean;
}

function isIgnoredNode(node: HastNode): boolean {
  // Exclude footnotes section from the compilation. Footnotes have already
  // been extracted.
  if (isNodeFootnotesContainer(node)) {
    return true;
  }

  if (node.type === "text" && !node.value.trim()) {
    // Empty whitespace node
    return true;
  }

  return false;
}

function compileHastNodeToJsx(
  node: HastNode,
  { isInsideReactNode }: CompileContext
): JsxRepresentation {
  // If we're a text element, we can convert to JSX here
  if (node.type === "text") {
    return {
      componentUsage: {
        counterLink: false,
      },
      jsx: isInsideReactNode ? node.value : `<>${node.value}</>`,
    };
  }

  // First, transform all of the children of this node
  const children: JsxRepresentation[] = [];
  node.children.forEach((child): void => {
    if (isIgnoredNode(child)) {
      return;
    }

    children.push(
      compileHastNodeToJsx(child, {
        isInsideReactNode: true,
      })
    );
  });

  // Transform the node into JSX
  return writeNodeAsJsx(node.tagName, node.properties || {}, children);
}

export function compileToJsx(node: HastSyntaxTree): JsxRepresentation {
  const exportedRootChildren = node.children.filter(
    (child): boolean => !isIgnoredNode(child)
  );
  const isRootWrappedInFragment = exportedRootChildren.length !== 1;

  // Transform each block of the syntax tree
  const blocks = exportedRootChildren.map(
    (child): JsxRepresentation =>
      compileHastNodeToJsx(child, {
        isInsideReactNode: isRootWrappedInFragment,
      })
  );

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
      jsx = `<>${blocks.map((block): string => block.jsx).join("")}</>`;
      break;
    }
  }

  // Return the compiled results
  return {
    componentUsage: mergeComponentUsages(
      blocks.map((block) => block.componentUsage)
    ),
    jsx,
  };
}
