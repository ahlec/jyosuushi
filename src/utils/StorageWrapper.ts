import { isIndexableObject } from "./typeguards";

interface SerializedStructure<TData> {
  schema: number;
  value: TData;
}

function isSerializedStructure<TData>(
  value: unknown,
): value is SerializedStructure<TData> {
  if (!isIndexableObject(value)) {
    return false;
  }

  if (typeof value.schema !== "number" || isNaN(value.schema)) {
    return false;
  }

  return true;
}

type ValidAtomicType = string | number | boolean | Record<string, unknown>;

export type ValueStorageType = ValidAtomicType | readonly ValidAtomicType[];

class StorageWrapper<TData extends ValueStorageType> {
  public constructor(
    private readonly storageKey: string,
    private readonly retention: "local" | "session",
    private readonly currentSchema: number,
  ) {}

  public get exists(): boolean {
    const raw = this.readRaw();
    if (!raw) {
      return false;
    }

    if (raw.schema !== this.currentSchema) {
      return false;
    }

    return true;
  }

  public getValue(): TData | null {
    const raw = this.readRaw();
    if (!raw) {
      return null;
    }

    if (raw.schema !== this.currentSchema) {
      return null;
    }

    return raw.value;
  }

  public setValue(value: TData): void {
    const serialized: SerializedStructure<TData> = {
      schema: this.currentSchema,
      value,
    };

    switch (this.retention) {
      case "local": {
        localStorage.setItem(this.storageKey, JSON.stringify(serialized));
        break;
      }
      case "session": {
        sessionStorage.setItem(this.storageKey, JSON.stringify(serialized));
        break;
      }
    }
  }

  public clear(): void {
    switch (this.retention) {
      case "local": {
        localStorage.removeItem(this.storageKey);
        break;
      }
      case "session": {
        sessionStorage.removeItem(this.storageKey);
        break;
      }
    }
  }

  private readRaw(): SerializedStructure<TData> | null {
    try {
      let rawJson: string | null;
      switch (this.retention) {
        case "local": {
          rawJson = localStorage.getItem(this.storageKey);
          break;
        }
        case "session": {
          rawJson = sessionStorage.getItem(this.storageKey);
          break;
        }
        default: {
          return null;
        }
      }

      if (!rawJson) {
        return null;
      }

      const parsed = JSON.parse(rawJson);
      if (!parsed || !isSerializedStructure<TData>(parsed)) {
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  }
}

export default StorageWrapper;
