import { convertMarkdownToJSX } from "../../markdown";
import {
  CounterRegistry,
  IntrasiteLinkLocation,
  JsxComponentUsage,
  MarkdownStyle,
} from "../../markdown/types";

import { ExportOutputEntry } from "../types";
import { ProductionVariable } from "../utils";

export interface CounterMarkdownComponent {
  name: string;
  componentUsage: JsxComponentUsage;
  jsx: string;
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

  private readonly intrasiteLinkLocation: IntrasiteLinkLocation;
  private readonly primaryComponents: CounterMarkdownComponent[] = [];
  private readonly footnoteComponents: CounterMarkdownComponent[] = [];

  public constructor(
    counterId: string,
    public readonly importedNamespace: string,
    private readonly allExportedCounters: CounterRegistry,
  ) {
    this.intrasiteLinkLocation = {
      id: counterId,
      type: "counter",
    };
  }

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
    markdown: string,
    style: MarkdownStyle,
  ): ProductionVariable {
    const { body, footnotes, warnings } = convertMarkdownToJSX(markdown, {
      allExportedCounters: this.allExportedCounters,
      currentLocation: this.intrasiteLinkLocation,
      // This should be consecutive and 1-based
      footnotesCountingStart: this.footnoteComponentVariables.length + 1,
      style,
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
        componentUsage: footnote.componentUsage,
        jsx: footnote.jsx,
        name: footnoteComponentName,
      });
      this.footnoteComponentVariables.push(
        new ProductionVariable(
          `${this.importedNamespace}.${footnoteComponentName}`,
        ),
      );
    }

    this.primaryComponents.push({
      componentUsage: body.componentUsage,
      jsx: body.jsx,
      name: componentName,
    });
    return new ProductionVariable(`${this.importedNamespace}.${componentName}`);
  }
}

export default CounterMarkdownConsolidator;
