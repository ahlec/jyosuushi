import { Writable } from "stream";

import { CounterMarkdownComponent } from "../counters/CounterMarkdownConsolidator";
import { mergeComponentUsages } from "../../markdown/jsx-compiler/utils";

import { WriteFileResults } from "../types";

function writeCounterComponentsFile(
  components: readonly CounterMarkdownComponent[],
  stream: Writable
): WriteFileResults {
  // Determine the components that need to be imported for this file
  const componentUsage = mergeComponentUsages(
    components.map((component) => component.componentUsage)
  );

  // Write out imports
  stream.write('import React from "react";\n');

  if (componentUsage.counterDisplay) {
    stream.write(
      'import CounterDisplay from "@jyosuushi/ui/data-components/CounterDisplay";\n'
    );
  }

  if (componentUsage.intrasiteLink) {
    stream.write(
      'import IntrasiteLink from "@jyosuushi/ui/data-components/IntrasiteLink";\n'
    );
  }

  // Write out components
  for (const { jsx, name } of components) {
    stream.write("\n\n");
    stream.write(`export function ${name}(): React.ReactElement {\n`);
    stream.write(`  return (${jsx});`);
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
