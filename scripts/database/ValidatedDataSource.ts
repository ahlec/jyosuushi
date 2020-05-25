import Database, { DatabaseSnapshot } from "../database/Database";
import {
  DbCounter,
  DbCounterAdditionalReading,
  DbCounterDictionaryEntry,
  DbCounterDisambiguation,
  DbCounterExternalLink,
  DbCounterIrregular,
  DbItem,
  DbItemCounter,
  DbStudyPack,
  DbStudyPackContent,
  SchemaEntryTypes,
  Schemas,
  DbCounterReading,
  DbCounterAlternativeKanji,
  DbWagoStyle
} from "./schemas";

interface Reason {
  text: string;
  showsInAudit: boolean;
}

export interface InvalidResultEntry<TSchemaEntry> {
  entry: TSchemaEntry;
  reasons: ReadonlyArray<Reason>;
}

export interface Warning<TSchemaEntry> {
  entry: TSchemaEntry;
  text: string;
}

interface ValidatedResult<TSchemaEntry> {
  valid: ReadonlyArray<TSchemaEntry>;
  ignored: ReadonlyArray<InvalidResultEntry<TSchemaEntry>>;
  error: ReadonlyArray<InvalidResultEntry<TSchemaEntry>>;
  warnings: ReadonlyArray<Warning<TSchemaEntry>>;
}

type Indexer = {
  [schema in Schemas]: ValidatedResult<SchemaEntryTypes[schema]>;
};

function validateWagoStyles(
  snapshot: DatabaseSnapshot
): ValidatedResult<DbWagoStyle> {
  const valid: DbWagoStyle[] = [];
  const error: Array<InvalidResultEntry<DbWagoStyle>> = [];

  for (const wagoStyle of snapshot.wago_style) {
    const errorReasons: Reason[] = [];
    if (wagoStyle.range_end_inclusive <= 0) {
      errorReasons.push({
        showsInAudit: true,
        text: "Wago rango cannot be negative or zero."
      });
    }

    if (wagoStyle.range_end_inclusive > 10) {
      errorReasons.push({
        showsInAudit: true,
        text:
          "Standard wago range cannot go above 10 (these values require being listed as irregular)"
      });
    }

    if (errorReasons.length) {
      error.push({
        entry: wagoStyle,
        reasons: errorReasons
      });

      continue;
    }

    valid.push(wagoStyle);
  }

  return {
    error,
    ignored: [],
    valid,
    warnings: []
  };
}

function validateCounters(
  snapshot: DatabaseSnapshot
): ValidatedResult<DbCounter> {
  const valid: DbCounter[] = [];
  const ignored: Array<InvalidResultEntry<DbCounter>> = [];
  const error: Array<InvalidResultEntry<DbCounter>> = [];
  const warnings: Array<Warning<DbCounter>> = [];

  const counterHasItems = new Set<string>();
  for (const { counter_id } of snapshot.item_counters) {
    counterHasItems.add(counter_id);
  }

  const counterInStudyPack = new Set<string>();
  for (const { counter_id } of snapshot.study_pack_contents) {
    counterInStudyPack.add(counter_id);
  }

  const numReadingsForCounter = new Map<string, number>();
  for (const { counter_id } of snapshot.counter_readings) {
    const previous = numReadingsForCounter.get(counter_id) || 0;
    numReadingsForCounter.set(counter_id, previous + 1);
  }

  const counterHasDictionaryEntries = new Set<string>();
  for (const { counter_id } of snapshot.counter_dictionary_entries) {
    counterHasDictionaryEntries.add(counter_id);
  }

  for (const counter of snapshot.counters) {
    if (!counterHasDictionaryEntries.has(counter.counter_id)) {
      warnings.push({
        entry: counter,
        text: "Does not have any dictionary entries defined for it."
      });
    }

    const errorReasons: Reason[] = [];
    if (
      counterInStudyPack.has(counter.counter_id) &&
      !counterHasItems.has(counter.counter_id)
    ) {
      errorReasons.push({
        showsInAudit: true,
        text: "Included in a study pack but does not define any items."
      });
    }

    const numReadings = numReadingsForCounter.get(counter.counter_id) || 0;
    if (!numReadings) {
      errorReasons.push({
        showsInAudit: true,
        text: "Counter does not have any defined readings."
      });
    }

    if (!counter.primary_kanji && numReadings > 1) {
      // We've already reported an error for the case where < 1
      errorReasons.push({
        showsInAudit: true,
        text:
          "Counters without primary kanji must have no more than one reading."
      });
    }

    if (errorReasons.length) {
      error.push({
        entry: counter,
        reasons: errorReasons
      });

      continue;
    }

    const ignoredReasons: Reason[] = [];

    if (!counterHasItems.has(counter.counter_id)) {
      ignoredReasons.push({
        showsInAudit: true,
        text: "No associated items."
      });
    }

    if (!counterInStudyPack.has(counter.counter_id)) {
      ignoredReasons.push({
        showsInAudit: true,
        text: "Not part of a study pack."
      });
    }

    if (ignoredReasons.length) {
      ignored.push({
        entry: counter,
        reasons: ignoredReasons
      });

      continue;
    }

    valid.push(counter);
  }

  return {
    error,
    ignored,
    valid,
    warnings
  };
}

function validateCounterReadings(
  snapshot: DatabaseSnapshot,
  validCounterIds: ReadonlySet<string>,
  validWagoStyleHandles: ReadonlySet<string>
): ValidatedResult<DbCounterReading> {
  const valid: DbCounterReading[] = [];
  const ignored: Array<InvalidResultEntry<DbCounterReading>> = [];
  const error: Array<InvalidResultEntry<DbCounterReading>> = [];

  for (const counterReading of snapshot.counter_readings) {
    const errorReasons: Reason[] = [];
    if (
      !counterReading.kango_uses_yon &&
      !counterReading.kango_uses_yo &&
      !counterReading.kango_uses_shi
    ) {
      errorReasons.push({
        showsInAudit: true,
        text: "Counter reading doesn't use 'yon', 'yo', or 'shi'."
      });
    }

    if (!counterReading.kango_uses_nana && !counterReading.kango_uses_shichi) {
      errorReasons.push({
        showsInAudit: true,
        text: "Counter reading doesn't use either 'nana' or 'shichi'."
      });
    }

    if (!counterReading.kango_uses_kyuu && !counterReading.kango_uses_ku) {
      errorReasons.push({
        showsInAudit: true,
        text: "Counter reading doesn't use either 'kyuu' or 'ku'."
      });
    }

    if (
      counterReading.wago_style &&
      !validWagoStyleHandles.has(counterReading.wago_style)
    ) {
      errorReasons.push({
        showsInAudit: true,
        text:
          "Counter reading is configured to use wago style that doesn't exist or isn't valid."
      });
    }

    if (errorReasons.length) {
      error.push({
        entry: counterReading,
        reasons: errorReasons
      });

      continue;
    }

    if (!validCounterIds.has(counterReading.counter_id)) {
      ignored.push({
        entry: counterReading,
        reasons: [
          {
            showsInAudit: false,
            text: "Counter is not being exported."
          }
        ]
      });

      continue;
    }

    valid.push(counterReading);
  }

  return {
    error,
    ignored,
    valid,
    warnings: []
  };
}

function validateCounterAlternativeKanji(
  snapshot: DatabaseSnapshot,
  validCounterIds: ReadonlySet<string>
): ValidatedResult<DbCounterAlternativeKanji> {
  const valid: DbCounterAlternativeKanji[] = [];
  const ignored: Array<InvalidResultEntry<DbCounterAlternativeKanji>> = [];
  const error: Array<InvalidResultEntry<DbCounterAlternativeKanji>> = [];

  const countersWithoutPrimaryKanji = new Set<string>();
  for (const { counter_id, primary_kanji } of snapshot.counters) {
    if (primary_kanji) {
      continue;
    }

    countersWithoutPrimaryKanji.add(counter_id);
  }

  for (const entry of snapshot.counter_alternative_kanji) {
    if (countersWithoutPrimaryKanji.has(entry.counter_id)) {
      error.push({
        entry,
        reasons: [
          {
            showsInAudit: true,
            text: `Counter '${entry.counter_id}' doesn't have a primary kanji but has alternative kanji listed.`
          }
        ]
      });

      continue;
    }

    if (!validCounterIds.has(entry.counter_id)) {
      ignored.push({
        entry,
        reasons: [
          {
            showsInAudit: false,
            text: "Counter is not being exported."
          }
        ]
      });

      continue;
    }

    valid.push(entry);
  }

  return {
    error,
    ignored,
    valid,
    warnings: []
  };
}

function validateItems(
  snapshot: DatabaseSnapshot,
  validCounterIds: ReadonlySet<string>
): ValidatedResult<DbItem> {
  const valid: DbItem[] = [];
  const error: Array<InvalidResultEntry<DbItem>> = [];
  const ignored: Array<InvalidResultEntry<DbItem>> = [];

  const itemHasExportedCounter = new Set<string>();
  const itemHasAnyCounter = new Set<string>();
  for (const { counter_id, item_id } of snapshot.item_counters) {
    itemHasAnyCounter.add(item_id);

    if (!validCounterIds.has(counter_id)) {
      continue;
    }

    itemHasExportedCounter.add(item_id);
  }

  for (const item of snapshot.items) {
    if (!itemHasAnyCounter.has(item.item_id)) {
      error.push({
        entry: item,
        reasons: [
          {
            showsInAudit: true,
            text: "No counters use this item (exported or otherwise)."
          }
        ]
      });

      continue;
    }

    if (!itemHasExportedCounter.has(item.item_id)) {
      ignored.push({
        entry: item,
        reasons: [
          {
            showsInAudit: false,
            text: "No exported counters use this item."
          }
        ]
      });

      continue;
    }

    valid.push(item);
  }

  return {
    error,
    ignored,
    valid,
    warnings: []
  };
}

function validateSingleCounterDependentDb<
  TSchemaType extends { counter_id: string }
>(
  entries: ReadonlyArray<TSchemaType>,
  validCounterIds: ReadonlySet<string>
): ValidatedResult<TSchemaType> {
  const valid: TSchemaType[] = [];
  const ignored: Array<InvalidResultEntry<TSchemaType>> = [];

  for (const entry of entries) {
    if (!validCounterIds.has(entry.counter_id)) {
      ignored.push({
        entry,
        reasons: [
          {
            showsInAudit: false,
            text: "Counter is not being exported."
          }
        ]
      });

      continue;
    }

    valid.push(entry);
  }

  return {
    error: [],
    ignored,
    valid,
    warnings: []
  };
}

function validateCounterDisambiguations(
  snapshot: DatabaseSnapshot,
  validCounterIds: ReadonlySet<string>
): ValidatedResult<DbCounterDisambiguation> {
  const error: Array<InvalidResultEntry<DbCounterDisambiguation>> = [];
  const valid: DbCounterDisambiguation[] = [];
  const ignored: Array<InvalidResultEntry<DbCounterDisambiguation>> = [];

  const combinations = new Set(
    snapshot.counter_disambiguations.map(
      ({ counter1_id, counter2_id }) => `${counter1_id}${counter2_id}`
    )
  );

  for (const disambiguation of snapshot.counter_disambiguations) {
    const inverse = `${disambiguation.counter2_id}${disambiguation.counter1_id}`;
    if (combinations.has(inverse)) {
      error.push({
        entry: disambiguation,
        reasons: [
          {
            showsInAudit: true,
            text: "The inverse of this combination is also defined."
          }
        ]
      });

      continue;
    }

    const ignoredReasons: Reason[] = [];

    if (!validCounterIds.has(disambiguation.counter1_id)) {
      ignoredReasons.push({
        showsInAudit: false,
        text: "Counter 1 is not being exported."
      });
    }

    if (!validCounterIds.has(disambiguation.counter2_id)) {
      ignoredReasons.push({
        showsInAudit: false,
        text: "Counter 2 is not being exported."
      });
    }

    if (ignoredReasons.length) {
      ignored.push({
        entry: disambiguation,
        reasons: ignoredReasons
      });

      continue;
    }

    valid.push(disambiguation);
  }

  return {
    error,
    ignored,
    valid,
    warnings: []
  };
}

function validateCounterIrregulars(
  snapshot: DatabaseSnapshot,
  validCounterIds: ReadonlySet<string>
): ValidatedResult<DbCounterIrregular> {
  const valid: DbCounterIrregular[] = [];
  const ignored: Array<InvalidResultEntry<DbCounterIrregular>> = [];

  for (const irregular of snapshot.counter_irregulars) {
    const ignoredReasons: Reason[] = [];
    if (!validCounterIds.has(irregular.counter_id)) {
      ignoredReasons.push({
        showsInAudit: false,
        text: "Counter is not being exported."
      });
    }

    if (ignoredReasons.length) {
      ignored.push({
        entry: irregular,
        reasons: ignoredReasons
      });

      continue;
    }

    valid.push(irregular);
  }

  return {
    error: [],
    ignored,
    valid,
    warnings: []
  };
}

function validateItemCounters(
  snapshot: DatabaseSnapshot,
  validItemIds: ReadonlySet<string>
): ValidatedResult<DbItemCounter> {
  const valid: DbItemCounter[] = [];
  const ignored: Array<InvalidResultEntry<DbItemCounter>> = [];

  for (const itemCounter of snapshot.item_counters) {
    if (!validItemIds.has(itemCounter.item_id)) {
      ignored.push({
        entry: itemCounter,
        reasons: [{ showsInAudit: false, text: "Item is not being exported" }]
      });

      continue;
    }

    valid.push(itemCounter);
  }

  return {
    error: [],
    ignored,
    valid,
    warnings: []
  };
}

function validateStudyPacks(
  snapshot: DatabaseSnapshot,
  validStudyPackContents: ReadonlyArray<DbStudyPackContent>
): ValidatedResult<DbStudyPack> {
  const valid: DbStudyPack[] = [];
  const ignored: Array<InvalidResultEntry<DbStudyPack>> = [];

  const hasCounter = new Set<string>();
  for (const { pack_id } of validStudyPackContents) {
    hasCounter.add(pack_id);
  }

  for (const studyPack of snapshot.study_packs) {
    if (!hasCounter.has(studyPack.pack_id)) {
      ignored.push({
        entry: studyPack,
        reasons: [
          {
            showsInAudit: true,
            text: "No exported counters in study pack."
          }
        ]
      });

      continue;
    }

    valid.push(studyPack);
  }

  return {
    error: [],
    ignored,
    valid,
    warnings: []
  };
}

export default class ValidatedDataSource implements Indexer {
  public static async validate(
    database: Database
  ): Promise<ValidatedDataSource> {
    const snapshot = await database.getSnapshot();

    const wago_style = validateWagoStyles(snapshot);
    const validWagoStyleHandles = new Set(
      wago_style.valid.map(({ wago_style_handle }) => wago_style_handle)
    );

    const counters = validateCounters(snapshot);
    const validCounterIds = new Set(
      counters.valid.map(({ counter_id }) => counter_id)
    );
    const counter_additional_readings = validateSingleCounterDependentDb(
      snapshot.counter_additional_readings,
      validCounterIds
    );
    const counter_dictionary_entries = validateSingleCounterDependentDb(
      snapshot.counter_dictionary_entries,
      validCounterIds
    );
    const counter_readings = validateCounterReadings(
      snapshot,
      validCounterIds,
      validWagoStyleHandles
    );
    const counter_disambiguations = validateCounterDisambiguations(
      snapshot,
      validCounterIds
    );
    const counter_external_links = validateSingleCounterDependentDb(
      snapshot.counter_external_links,
      validCounterIds
    );
    const counter_alternative_kanji = validateCounterAlternativeKanji(
      snapshot,
      validCounterIds
    );
    const counter_irregulars = validateCounterIrregulars(
      snapshot,
      validCounterIds
    );

    const items = validateItems(snapshot, validCounterIds);
    const validItemIds = new Set(items.valid.map(({ item_id }) => item_id));
    const item_counters = validateItemCounters(snapshot, validItemIds);

    const study_pack_contents = validateSingleCounterDependentDb(
      snapshot.study_pack_contents,
      validCounterIds
    );
    const study_packs = validateStudyPacks(snapshot, study_pack_contents.valid);

    return new ValidatedDataSource(
      counter_additional_readings,
      counter_dictionary_entries,
      counter_disambiguations,
      counter_external_links,
      counter_irregulars,
      counter_alternative_kanji,
      counter_readings,
      counters,
      item_counters,
      items,
      study_pack_contents,
      study_packs,
      wago_style
    );
  }

  public readonly hasErrors: boolean;

  private constructor(
    public readonly counter_additional_readings: ValidatedResult<
      DbCounterAdditionalReading
    >,
    public readonly counter_dictionary_entries: ValidatedResult<
      DbCounterDictionaryEntry
    >,
    public readonly counter_disambiguations: ValidatedResult<
      DbCounterDisambiguation
    >,
    public readonly counter_external_links: ValidatedResult<
      DbCounterExternalLink
    >,
    public readonly counter_irregulars: ValidatedResult<DbCounterIrregular>,
    public readonly counter_alternative_kanji: ValidatedResult<
      DbCounterAlternativeKanji
    >,
    public readonly counter_readings: ValidatedResult<DbCounterReading>,
    public readonly counters: ValidatedResult<DbCounter>,
    public readonly item_counters: ValidatedResult<DbItemCounter>,
    public readonly items: ValidatedResult<DbItem>,
    public readonly study_pack_contents: ValidatedResult<DbStudyPackContent>,
    public readonly study_packs: ValidatedResult<DbStudyPack>,
    public readonly wago_style: ValidatedResult<DbWagoStyle>
  ) {
    this.hasErrors = Object.values(Schemas)
      .map(schema => this.getSchema(schema))
      .some(results => !!results.error.length);
  }

  public getSchema<TSchema extends Schemas>(
    schema: TSchema
  ): ValidatedResult<SchemaEntryTypes[TSchema]> {
    return (this as any)[schema];
  }
}
