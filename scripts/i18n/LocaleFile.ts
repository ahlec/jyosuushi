import { outputJSONSync, readFile } from "fs-extra";

import { isArrayOf, isIndexableObject, isStringOrUndefined } from "./utils";

export interface LocaleFileEntry {
  original: {
    defaultMessage: string;
    description?: string;
    filenames: readonly string[];
  };
  translation: string;
}

function isLocaleFileEntry(obj: unknown): obj is LocaleFileEntry {
  if (!isIndexableObject(obj)) {
    return false;
  }

  const original = obj["original"];
  if (!isIndexableObject(original)) {
    return false;
  }

  if (typeof original["defaultMessage"] !== "string") {
    return false;
  }

  if (!isStringOrUndefined(original["description"])) {
    return false;
  }

  if (
    !isArrayOf(
      original["filenames"],
      (val): val is string => typeof val === "string"
    )
  ) {
    return false;
  }

  if (typeof obj["translation"] !== "string") {
    return false;
  }

  return true;
}

class LocaleFile {
  public static async load(filename: string): Promise<LocaleFile> {
    const rawContents = await readFile(filename, "utf8");
    const json = JSON.parse(rawContents);
    if (!isIndexableObject(json)) {
      throw new Error(`${filename} is not a JSON object file.`);
    }

    const fileContents: Record<string, LocaleFileEntry> = {};
    const invalidIds = new Set<string>();
    for (const id in json) {
      const value = json[id];
      if (!isLocaleFileEntry(value)) {
        invalidIds.add(id);
        continue;
      }

      fileContents[id] = value;
    }

    if (invalidIds.size > 0) {
      throw new Error(
        `${filename} has ${invalidIds.size} invalid keys: ${Array.from(
          invalidIds
        ).join(", ")}`
      );
    }

    return new LocaleFile(fileContents);
  }

  public constructor(
    private readonly contents: Record<string, LocaleFileEntry>
  ) {}

  public get entries(): readonly [string, LocaleFileEntry][] {
    return Object.entries(this.contents);
  }

  public get(id: string): LocaleFileEntry | undefined {
    return this.contents[id];
  }

  public set(id: string, entry: LocaleFileEntry): void {
    this.contents[id] = entry;
  }

  public save(filename: string): void {
    outputJSONSync(filename, this.contents, {
      spaces: 2,
    });
  }
}

export default LocaleFile;
