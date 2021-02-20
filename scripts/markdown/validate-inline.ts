import {
  HastNode,
  HastSyntaxTree,
  ValidationResult,
  ValidationViolation,
} from "./types";

interface HastNodeValidationContext {
  hasReportedListViolation: boolean;
}

function isIgnoredNode(node: HastNode): boolean {
  switch (node.type) {
    case "text": {
      return !node.value.trim();
    }
    case "element": {
      return false;
    }
  }
}

function validateHastNode(
  node: HastNode,
  context: HastNodeValidationContext
): ValidationResult {
  // If this node should be ignored, consider it valid
  if (isIgnoredNode(node)) {
    return { valid: true };
  }

  // Validate text nodes first because they're easiest
  if (node.type === "text") {
    if (node.value.indexOf("\n") >= 0) {
      return {
        reasons: [
          {
            message: "Text element contains line break \\n character.",
            node,
          },
        ],
        valid: false,
      };
    }

    return { valid: true };
  }

  const violations: ValidationViolation[] = [];

  // Check to see if this is a forbidden tag
  let { hasReportedListViolation } = context;
  switch (node.tagName) {
    case "li":
    case "ol":
    case "ul": {
      if (!hasReportedListViolation) {
        violations.push({
          message: `Contains invalid <${node.tagName} /> element`,
          node,
        });
        hasReportedListViolation = true;
      }

      break;
    }
  }

  // Validate children
  node.children.forEach((child): void => {
    const childValidation = validateHastNode(child, {
      hasReportedListViolation,
    });
    if (!childValidation.valid) {
      violations.push(...childValidation.reasons);
    }
  });

  // Return the final result
  if (!violations.length) {
    return { valid: true };
  }

  return {
    reasons: violations,
    valid: false,
  };
}

export function validateInlineSyntaxTree(
  tree: HastSyntaxTree
): ValidationResult {
  const violations: ValidationViolation[] = [];

  const nonIgnoredChildren = tree.children.filter(
    (child): boolean => !isIgnoredNode(child)
  );

  // Syntax tree isn't valid for inline if it has more than one block element
  // at the root (like paragraph + paragraph)
  if (nonIgnoredChildren.length > 1) {
    violations.push({
      message: "Contains more than one block element at the root.",
      node: tree,
    });
  }

  // Validate all of the blocks in the syntax tree
  nonIgnoredChildren.forEach((child): void => {
    const childValidation = validateHastNode(child, {
      hasReportedListViolation: false,
    });
    if (!childValidation.valid) {
      violations.push(...childValidation.reasons);
    }
  });

  // Return the final results
  if (!violations.length) {
    return { valid: true };
  }

  return {
    reasons: violations,
    valid: false,
  };
}
