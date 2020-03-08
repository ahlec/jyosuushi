import { escape, isArray } from "lodash";
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
    case "和語": {
      return new ProductionVariable("WordOrigin.Japanese");
    }
    case "漢語": {
      return new ProductionVariable("WordOrigin.Chinese");
    }
    case "外来語": {
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
        str += `"${escape(key)}"`;
      }

      str += `: ${productionStringify(value[key as keyof typeof value])},\n`;
    }

    str += "}";
    return str;
  }

  return JSON.stringify(value);
}
