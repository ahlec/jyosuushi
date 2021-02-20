import { convertMarkdownToJSX } from "../../markdown";

import { ExportOutputEntry } from "../types";
import { ProductionVariable } from "../utils";

export interface CounterMarkdownComponent {
  componentName: string;
  jsx: string;
  requiresCounterLink: boolean;
}

function convertToWarningOutput(warning: string): ExportOutputEntry {
  return {
    message: warning,
    type: "warning",
  };
}

class CounterMarkdownConsolidator {
  public readonly footnoteComponentVariables: ProductionVariable[] = [];
  public readonly consoleOutput: ExportOutputEntry[] = [];

  private readonly primaryComponents: CounterMarkdownComponent[] = [];
  private readonly footnoteComponents: CounterMarkdownComponent[] = [];

  public constructor(
    public readonly importedNamespace: string,
    public readonly allExportedCounterIds: ReadonlySet<string>
  ) {}

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
    const { body, footnotes, warnings } = convertMarkdownToJSX(markdown, {
      allExportedCounterIds: this.allExportedCounterIds,
      // This should be consecutive and 1-based
      footnotesCountingStart: this.footnoteComponentVariables.length + 1,
    });

    if (warnings.length) {
      this.consoleOutput.push({
        contents: warnings.map(convertToWarningOutput),
        header: `'${componentName}' Markdown`,
        type: "group",
      });
    }

    for (const footnote of footnotes) {
      const footnoteComponentName = `Footnote${footnote.footnoteId}`;
      this.footnoteComponents.push({
        componentName: footnoteComponentName,
        jsx: footnote.jsx,
        requiresCounterLink: footnote.requiresCounterLink,
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
      requiresCounterLink: body.requiresCounterLink,
    });
    return new ProductionVariable(`${this.importedNamespace}.${componentName}`);
  }
}

export default CounterMarkdownConsolidator;
