import {
  convertMarkdownToJSX,
  retrieveFootnotesFromMarkdown
} from "../markdown";

import { ProductionVariable } from "../utils";

export interface CounterMarkdownComponent {
  componentName: string;
  jsx: string;
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
      this.footnoteComponentVariables.length + 17
    );

    for (const footnote of footnoteExtraction.footnotes) {
      const footnoteComponentName = `Footnote${footnote.globalRefId}`;
      this.markdownComponents.push({
        componentName: footnoteComponentName,
        jsx: footnote.noteJsx.jsx
      });
      this.footnoteComponentVariables.push(
        new ProductionVariable(
          `${this.importedNamespace}.${footnoteComponentName}`
        )
      );
    }

    this.markdownComponents.push({
      componentName,
      jsx: convertMarkdownToJSX(
        markdown,
        footnoteExtraction.footnoteLocalRefIdToGlobalId
      ).jsx
    });
    return new ProductionVariable(`${this.importedNamespace}.${componentName}`);
  }
}

export default CounterMarkdownConsolidator;
