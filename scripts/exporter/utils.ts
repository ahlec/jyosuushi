import { isArray } from "lodash";
import path from "path";
import { DbWordOrigin } from "../database/schemas";

function getVariableFromId(prefix: string, id: string): string {
  return prefix + id.toUpperCase().replace(/[-\s,&._()（）ー']+/g, "_");
}

export function getCounterId(id: string): string {
  return getVariableFromId("COUNTER_", id);
}

export function getItemId(id: string): string {
  return getVariableFromId("ITEM_", id);
}

export function getStudyPackId(id: string): string {
  return getVariableFromId("STUDY_PACK_", id);
}

export const DATA_DIRECTORY = path.resolve(__dirname, "./../../data");

const COUNTER_NOTES_COMPONENTS_DIRECTORY = path.resolve(
  DATA_DIRECTORY,
  "./counter-notes/"
);

export interface CounterNotesComponentInfo {
  absoluteFilename: string;
  componentName: string;
  importPath: string;
}

export function getCounterNotesComponent(
  counterId: string
): CounterNotesComponentInfo {
  const componentName = `${counterId}Notes`;
  return {
    absoluteFilename: path.resolve(
      COUNTER_NOTES_COMPONENTS_DIRECTORY,
      `./${componentName}.tsx`
    ),
    componentName,
    importPath: `@data/counter-notes/${componentName}`,
  };
}

export function getDisambiguationId(
  counter1Id: string,
  counter2Id: string
): string {
  return `DISAMBIGUATION_${getVariableFromId(
    "",
    counter1Id
  )}${getVariableFromId("", counter2Id)}`;
}

export class ProductionVariable {
  public constructor(public readonly id: string) {}
}

export function getWordOrigin(dbWordOrigin: DbWordOrigin): ProductionVariable {
  switch (dbWordOrigin) {
    case DbWordOrigin.Japanese: {
      return new ProductionVariable("WordOrigin.Japanese");
    }
    case DbWordOrigin.Chinese: {
      return new ProductionVariable("WordOrigin.Chinese");
    }
    case DbWordOrigin.Foreign: {
      return new ProductionVariable("WordOrigin.Foreign");
    }
  }
}

export function productionStringify(value: unknown): string {
  if (value instanceof ProductionVariable) {
    return value.id;
  }

  if (isArray(value)) {
    let str = "[\n";

    for (const element of value) {
      str += `${productionStringify(element)},\n`;
    }

    str += "]";
    return str;
  }

  if (typeof value === "object" && value) {
    let str = "{\n";

    const keys = Object.keys(value);
    for (const key of keys) {
      const asNumber = typeof key === "number" ? key : parseInt(key, 10);
      if (isFinite(asNumber)) {
        str += key;
      } else {
        /**
         * Use JSON.stringify here to escape any double-quotes inside
         * of strings. It will also wrap the string in double quotes.
         */
        str += JSON.stringify(key);
      }

      str += `: ${productionStringify(value[key as keyof typeof value])},\n`;
    }

    str += "}";
    return str;
  }

  return JSON.stringify(value);
}
