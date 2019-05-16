import { ONE_MONTH } from "../../../constants";

const LOCAL_STORAGE_KEY = "tsu-warning";
const NUM_DEFAULT_WARNINGS = 10;
// How long to go without ACCESSING site before redisplaying. We don't want to
// redisplay to users unless we displayed the warning before and they haven't
// accessed the site in a while, possibly forgetting.
const EXPIRATION = ONE_MONTH;

interface LocalStorageFormat {
  numWarningsRemaining: number;
  lastAccessedTimestamp: number;
}

export default class TsuWarningModel {
  public static get(): TsuWarningModel {
    const model = this.parse();
    model.save(); // save immediately to track date last accessed
    return model;
  }

  private static parse(): TsuWarningModel {
    try {
      const rawJson = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (rawJson) {
        const json = JSON.parse(rawJson) as LocalStorageFormat;
        if (
          json &&
          Number.isInteger(json.numWarningsRemaining) &&
          Number.isInteger(json.lastAccessedTimestamp)
        ) {
          let numWarnings =
            json.numWarningsRemaining < 0 ? 0 : json.numWarningsRemaining;
          if (
            numWarnings === 0 &&
            Date.now() - json.lastAccessedTimestamp >= EXPIRATION
          ) {
            numWarnings = NUM_DEFAULT_WARNINGS;
          }

          return new TsuWarningModel(numWarnings);
        }
      }
    } catch (err) {
      // Fallthrough
    }

    return new TsuWarningModel(NUM_DEFAULT_WARNINGS);
  }

  private constructor(public numWarnings: number) {}

  public save() {
    const storageFormat: LocalStorageFormat = {
      lastAccessedTimestamp: Date.now(),
      numWarningsRemaining: this.numWarnings
    };
    const json = JSON.stringify(storageFormat);
    localStorage.setItem(LOCAL_STORAGE_KEY, json);
  }
}
