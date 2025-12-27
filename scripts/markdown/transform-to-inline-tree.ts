import { HastNode, HastSyntaxTree } from "./types";

function transformChildrenToInline(
  children: readonly HastNode[],
): readonly HastNode[] {
  const transformed: HastNode[] = [];

  children.forEach((child): void => {
    // Text nodes are already inline
    if (child.type === "text") {
      transformed.push(child);
      return;
    }

    // Non-paragraph nodes should remain as a single node
    if (child.tagName !== "p") {
      transformed.push({
        ...child,
        children: transformChildrenToInline(child.children),
      });
      return;
    }

    // Paragraph nodes should be erased and their children added inline to
    // this node
    transformed.push(...transformChildrenToInline(child.children));
  });

  return transformed;
}

export function transformToInlineSyntaxTree(
  syntaxTree: HastSyntaxTree,
): HastSyntaxTree {
  return {
    children: transformChildrenToInline(syntaxTree.children),
    type: "root",
  };
}
