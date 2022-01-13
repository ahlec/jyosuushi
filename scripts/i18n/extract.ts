import { transform, Opts, MessageDescriptor } from "@formatjs/ts-transformer";
import { existsSync, readFile } from "fs-extra";
import { sync as globSync } from "glob";
import { isEqual } from "lodash";
import path from "path";
import ts from "typescript";

import LocaleFile, { LocaleFileEntry } from "./LocaleFile";

export interface ExtractionResult {
  filename: string;
  messages: MessageDescriptor[];
  meta: Record<string, string>;
}

export interface ExtractCLIOptions {
  outDirectory: string;
  locales: readonly string[];
}

interface ExtractedMessage {
  defaultMessage: string;
  description?: string;
  filenames: string[];
}

function processFile(source: string, fn: string): ExtractionResult {
  let messages: MessageDescriptor[] = [];
  let meta: Record<string, string> = {};
  const opts: Opts = {
    onMetaExtracted(_, m) {
      meta = m;
    },
    onMsgExtracted(_, msgs) {
      messages = messages.concat(msgs);
    },
  };

  try {
    ts.transpileModule(source, {
      compilerOptions: {
        allowJs: true,
        noEmit: true,
        target: ts.ScriptTarget.ESNext,
      },
      fileName: fn,
      transformers: {
        before: [transform(opts)],
      },
    });
  } catch {
    // TODO: There seem to be issues with certain files being generated?
    // Without this line we get tons of warnings like:
    // > Error: Debug Failure. Output generation failed
    // Investigate later and figure out the source.
  }

  return {
    filename: fn,
    messages,
    meta,
  };
}

function isNotUndefined<T>(val: T | undefined): val is T {
  return !!val;
}

async function extract(files: readonly string[]): Promise<ExtractionResult[]> {
  const results = await Promise.all(
    files.map(async (fn) => {
      const source = await readFile(fn, "utf8");
      return processFile(source, fn);
    })
  );

  return results.filter(isNotUndefined);
}

const areOriginalsSame: (
  a: LocaleFileEntry["original"],
  b: LocaleFileEntry["original"]
) => boolean = isEqual;

async function mergeAndWrite(
  destinationFilePath: string,
  extractedMessages: Map<string, ExtractedMessage>
): Promise<void> {
  // Create the output file using the raw extractions
  const contents: Record<string, LocaleFileEntry> = {};
  extractedMessages.forEach((message: ExtractedMessage, id: string): void => {
    contents[id] = {
      original: message,
      translation: "",
    };
  });
  const outputFile = new LocaleFile(contents);

  // If the destination file exists, open it up, parse it, and preserve anything that hasn't been
  // changed since it was previously extracted.
  if (existsSync(destinationFilePath)) {
    const existing = await LocaleFile.load(destinationFilePath);

    const { entries } = outputFile;
    for (const [key, extractedValue] of entries) {
      const existingValue = existing.get(key);
      if (!existingValue) {
        continue;
      }

      if (!areOriginalsSame(extractedValue.original, existingValue.original)) {
        continue;
      }

      // This existed in the file already and the original source hasn't changed, so let's
      // copy over what we had before.
      outputFile.set(key, existingValue);
    }
  }

  // Write to the destination
  outputFile.save(destinationFilePath);
}

async function extractAndWrite(
  files: readonly string[],
  { locales, outDirectory }: ExtractCLIOptions
) {
  const extractionResults = await extract(files);
  const extractedMessages = new Map<string, ExtractedMessage>();

  for (const { filename, messages } of extractionResults) {
    for (const message of messages) {
      const { id, description, defaultMessage } = message;
      if (!id) {
        throw new Error(
          `[FormatJS CLI] Missing message id for message: 
${JSON.stringify(message, undefined, 2)}`
        );
      }

      if (!defaultMessage) {
        throw new Error(
          `Missing defaultMessage for message: ${JSON.stringify(
            message,
            undefined,
            2
          )}`
        );
      }

      const existing = extractedMessages.get(id);
      if (typeof existing !== "undefined") {
        if (
          description !== existing.description ||
          defaultMessage !== existing.defaultMessage
        ) {
          throw new Error(
            `[FormatJS CLI] Duplicate message id: "${id}", ` +
              "but the `description` and/or `defaultMessage` are different."
          );
        }

        existing.filenames.push(filename);
        continue;
      }

      extractedMessages.set(id, {
        defaultMessage,
        description,
        filenames: [filename],
      });
    }
  }

  await Promise.all(
    locales.map(
      (locale: string): Promise<void> =>
        mergeAndWrite(
          path.resolve(outDirectory, `${locale}.json`),
          extractedMessages
        )
    )
  );
}

const files = globSync("src/**/*.ts*");
extractAndWrite(files, {
  locales: ["en", "jp"],
  outDirectory: "./i18n",
});
