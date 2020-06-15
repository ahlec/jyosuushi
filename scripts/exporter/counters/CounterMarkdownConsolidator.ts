import { convertMarkdownToJSX } from "../markdown";

import { ProductionVariable } from "../utils";

export interface CounterMarkdownComponent {
  componentName: string;
  jsx: string;
  requiresReactRouterDomLink: boolean;
}

class CounterMarkdownConsolidator {
  public readonly footnoteComponentVariables: ProductionVariable[] = [];

  private readonly primaryComponents: CounterMarkdownComponent[] = [];
  private readonly footnoteComponents: CounterMarkdownComponent[] = [];

  public constructor(public readonly importedNamespace: string) {}

  public get markdownComponents(): ReadonlyArray<CounterMarkdownComponent> {
    return [...this.primaryComponents, ...this.footnoteComponents];
  }

  public get hasComponents(): boolean {
    return (
      this.primaryComponents.length > 0 || this.footnoteComponents.length > 0
    );
  }

  public addMarkdown(
    componentName: string,
    markdown: string
  ): ProductionVariable {
    const { body, footnotes } = convertMarkdownToJSX(markdown, {
      // This should be consecutive and 1-based
      footnotesCountingStart: this.footnoteComponentVariables.length + 1
    });

    for (const footnote of footnotes) {
      const footnoteComponentName = `Footnote${footnote.footnoteId}`;
      this.footnoteComponents.push({
        componentName: footnoteComponentName,
        jsx: footnote.jsx,
        requiresReactRouterDomLink: footnote.requiresReactRouterLink
      });
      this.footnoteComponentVariables.push(
        new ProductionVariable(
          `${this.importedNamespace}.${footnoteComponentName}`
        )
      );
    }

    this.primaryComponents.push({
      componentName,
      jsx: body.jsx,
      requiresReactRouterDomLink: body.requiresReactRouterLink
    });
    return new ProductionVariable(`${this.importedNamespace}.${componentName}`);
  }
}

export default CounterMarkdownConsolidator;
