import { Writable } from "stream";

import { convertMarkdownToJSX } from "./markdown";

export default function writeCounterNotesComponentFile(
  stream: Writable,
  componentName: string,
  markdown: string
): void {
  stream.write('import * as React from "react";\n');
  stream.write(
    'import { CounterNotesComponentProps } from "@jyosuushi/interfaces";\n'
  );
  stream.write("\n\n");

  stream.write(
    `class ${componentName} extends React.PureComponent<CounterNotesComponentProps> {\n`
  );
  stream.write("  public render(): React.ReactNode {\n");
  stream.write(`    return (${convertMarkdownToJSX(markdown)});`);
  stream.write("  }\n");
  stream.write("}\n");
  stream.write("\n");
  stream.write(`export default ${componentName};`);
}
