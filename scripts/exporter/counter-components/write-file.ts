import { Writable } from "stream";

import { CounterMarkdownComponent } from "../counters/CounterMarkdownConsolidator";

import { convertMarkdownToJSX } from "../markdown";

import { WriteFileResults } from "../types";

function writeCounterComponentsFile(
  components: ReadonlyArray<CounterMarkdownComponent>,
  stream: Writable
): WriteFileResults {
  // Write out imports
  stream.write('import * as React from "react";\n');
  stream.write(
    'import { CounterNotesComponentProps } from "@jyosuushi/interfaces";\n'
  );

  // Write out components
  for (const { componentName, markdown } of components) {
    const convertedJsx = convertMarkdownToJSX(markdown);

    stream.write("\n\n");
    stream.write(
      `export class ${componentName} extends React.PureComponent<CounterNotesComponentProps> {\n`
    );
    stream.write("  public render(): React.ReactNode {\n");
    stream.write(`    return (${convertedJsx.jsx});`);
    stream.write("  }\n");
    stream.write("}\n");
    stream.write("\n");
  }

  // Return
  return {
    additionalFileRequests: []
  };
}

export default writeCounterComponentsFile;
