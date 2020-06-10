import {
  convertMarkdownToJSX,
  retrieveFootnotesFromMarkdown
} from "../markdown";

import { ProductionVariable } from "../utils";

export interface CounterMarkdownComponent {
  componentName: string;
  jsx: string;
  requiresReactRouterDomLink: boolean;
}

class CounterMarkdownConsolidator {
  public readonly markdownComponents: CounterMarkdownComponent[] = [];
  public readonly footnoteComponentVariables: ProductionVariable[] = [];

  public constructor(public readonly importedNamespace: string) {}

  public get hasComponents(): boolean {
    return this.markdownComponents.length > 0;
  }

  public addMarkdown(
    componentName: string,
    markdown: string
  ): ProductionVariable {
    const footnoteExtraction = retrieveFootnotesFromMarkdown(
      markdown,
      // This should be consecutive and 1-based
      this.footnoteComponentVariables.length + 1
    );

    for (const footnote of footnoteExtraction.footnotes) {
      const footnoteComponentName = `Footnote${footnote.globalRefId}`;
      this.markdownComponents.push({
        componentName: footnoteComponentName,
        jsx: footnote.noteJsx.jsx,
        requiresReactRouterDomLink: footnote.noteJsx.containsIntrasiteLink
      });
      this.footnoteComponentVariables.push(
        new ProductionVariable(
          `${this.importedNamespace}.${footnoteComponentName}`
        )
      );
    }

    const convertedJsx = convertMarkdownToJSX(
      markdown,
      footnoteExtraction.footnoteLocalRefIdToGlobalId
    );
    this.markdownComponents.push({
      componentName,
      jsx: convertedJsx.jsx,
      requiresReactRouterDomLink: convertedJsx.requiresReactRouterLink
    });
    return new ProductionVariable(`${this.importedNamespace}.${componentName}`);
  }
}

export default CounterMarkdownConsolidator;
