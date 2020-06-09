import { ProductionVariable } from "../utils";

export interface CounterMarkdownComponent {
  componentName: string;
  markdown: string;
  footnotesLocalToUniversal: { [localId: string]: string };
}

class CounterMarkdownConsolidator {
  public readonly markdownComponents: CounterMarkdownComponent[] = [];

  public constructor(public readonly importedNamespace: string) {}

  public get hasComponents(): boolean {
    return this.markdownComponents.length > 0;
  }

  public addMarkdown(
    componentName: string,
    markdown: string
  ): ProductionVariable {
    this.markdownComponents.push({
      componentName,
      footnotesLocalToUniversal: {},
      markdown
    });
    return new ProductionVariable(`${this.importedNamespace}.${componentName}`);
  }
}

export default CounterMarkdownConsolidator;
