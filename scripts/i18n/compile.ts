import { parse, MessageFormatElement } from "intl-messageformat-parser";
import { outputJSONSync } from "fs-extra";

import LocaleFile from "./LocaleFile";

async function compileFile(inputFile: string, outFile: string): Promise<void> {
  const { entries } = await LocaleFile.load(inputFile);

  const results: Record<string, string | MessageFormatElement[]> = {};
  for (const [
    id,
    {
      original: { defaultMessage },
      translation,
    },
  ] of entries) {
    results[id] = parse(translation || defaultMessage);
  }

  outputJSONSync(outFile, results, {
    spaces: 2,
  });
}

async function main(): Promise<void> {
  await Promise.all([
    compileFile("./i18n/en.json", "src/i18n/translations/en.json"),
    compileFile("./i18n/jp.json", "src/i18n/translations/jp.json"),
  ]);
}

main();
