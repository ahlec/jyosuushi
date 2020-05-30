import { Writable } from "stream";

import { convertDictionaryEntryToJSX } from "./dictionary-entries";

export default function writeDictionaryEntryComponentFile(
  stream: Writable,
  componentName: string,
  markdown: string
): void {
  const renderedContents = convertDictionaryEntryToJSX(markdown);

  if (renderedContents.doesRequireClassNamesLibrary) {
    stream.write(`import classnames from "classnames";\n`);
  }

  stream.write('import * as React from "react";\n');
  stream.write(
    'import { DictionaryEntryComponentProps } from "@jyosuushi/interfaces";\n'
  );
  stream.write("\n\n");

  stream.write(
    `class ${componentName} extends React.PureComponent<DictionaryEntryComponentProps> {\n`
  );
  stream.write("  public render(): React.ReactNode {\n");
  stream.write(`    return (${renderedContents.jsx});`);
  stream.write("  }\n");
  stream.write("}\n");
  stream.write("\n");
  stream.write(`export default ${componentName};`);
}
