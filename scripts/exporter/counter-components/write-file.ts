import { Writable } from "stream";

import { CounterMarkdownComponent } from "../counters/CounterMarkdownConsolidator";

import { WriteFileResults } from "../types";

function requiresCounterLink(component: CounterMarkdownComponent): boolean {
  return component.requiresCounterLink;
}

function writeCounterComponentsFile(
  components: ReadonlyArray<CounterMarkdownComponent>,
  stream: Writable
): WriteFileResults {
  // Write out imports
  stream.write('import * as React from "react";\n');
  stream.write(
    'import { MarkdownComponentProps } from "@jyosuushi/interfaces";\n'
  );
  if (components.some(requiresCounterLink)) {
    stream.write(
      'import CounterLink from "@jyosuushi/ui/components/CounterLink";\n'
    );
  }

  // Write out components
  for (const { componentName, jsx } of components) {
    stream.write("\n\n");
    stream.write(
      `export class ${componentName} extends React.PureComponent<MarkdownComponentProps> {\n`
    );
    stream.write("  public render(): React.ReactNode {\n");
    stream.write(`    return (${jsx});`);
    stream.write("  }\n");
    stream.write("}\n");
    stream.write("\n");
  }

  // Return
  return {
    additionalFileRequests: [],
    output: [],
  };
}

export default writeCounterComponentsFile;
