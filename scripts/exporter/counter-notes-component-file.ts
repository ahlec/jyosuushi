import { Writable } from "stream";

import { convertMarkdownToJSX } from "./markdown";

export default function writeCounterNotesComponentFile(
  stream: Writable,
  componentName: string,
  markdown: string
): void {
  const convertedJsx = convertMarkdownToJSX(markdown);

  stream.write('import * as React from "react";\n');
  if (convertedJsx.requiresReactRouterLink) {
    stream.write('import { Link } from "react-router-dom";\n');
  }

  stream.write(
    'import { CounterNotesComponentProps } from "@jyosuushi/interfaces";\n'
  );
  stream.write("\n\n");

  stream.write(
    `class ${componentName} extends React.PureComponent<CounterNotesComponentProps> {\n`
  );
  stream.write("  public render(): React.ReactNode {\n");
  stream.write(`    return (${convertedJsx.jsx});`);
  stream.write("  }\n");
  stream.write("}\n");
  stream.write("\n");
  stream.write(`export default ${componentName};`);
}
