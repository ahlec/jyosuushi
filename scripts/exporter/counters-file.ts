import { sortBy } from "lodash";
import { Writable } from "stream";

import {
  DbCounterDisambiguation,
  DbCounterExternalLink,
  DbCounterReading,
  DbCounterAlternativeKanji,
  DbWagoStyle,
  DbCounterIrregular,
  DbIrregularType
} from "../database/schemas";
import ValidatedDataSource from "../database/ValidatedDataSource";

import {
  Counter,
  ExternalLink,
  CounterReading,
  CounterKanjiInfo,
  CounterIrregular,
  CounterIrregularType
} from "../../src/interfaces";

import {
  getCounterId,
  getDisambiguationId,
  productionStringify,
  ProductionVariable,
  getWordOrigin
} from "./utils";

type ProtoCounterReading = Omit<CounterReading, "wordOrigin"> & {
  wordOrigin: ProductionVariable;
};

type ProtoCounter = Omit<Counter, "disambiguations" | "readings"> & {
  disambiguations: { [counterId: string]: ProductionVariable };
  readings: ReadonlyArray<ProtoCounterReading>;
};

function convertToProductionExternalLink(
  db: DbCounterExternalLink
): ExternalLink {
  return {
    additionalDescription: db.additional_description
      ? db.additional_description
      : null,
    displayText: db.link_text,
    siteName: db.site_name,
    url: db.url
  };
}

function convertToProductionDisambiguations(
  counterId: string,
  disambiguations: ReadonlyArray<DbCounterDisambiguation>
): { [counterId: string]: ProductionVariable } {
  const lookup: { [counterId: string]: ProductionVariable } = {};

  for (const disambiguation of disambiguations) {
    lookup[
      counterId === disambiguation.counter1_id
        ? disambiguation.counter2_id
        : disambiguation.counter1_id
    ] = new ProductionVariable(
      `DISAMBIGUATIONS.${getDisambiguationId(
        disambiguation.counter1_id,
        disambiguation.counter2_id
      )}`
    );
  }

  return lookup;
}

function convertToProductionReading(
  counterId: string,
  dbReading: DbCounterReading,
  dbWagoStyle: DbWagoStyle | undefined
): ProtoCounterReading {
  return {
    counterId,
    kana: dbReading.kana,
    kangoConjugationOptions: {
      allowsKuFor9: !!dbReading.kango_uses_ku,
      allowsKyuuFor9: !!dbReading.kango_uses_kyuu,
      allowsNanaFor7: !!dbReading.kango_uses_nana,
      allowsShiFor4: !!dbReading.kango_uses_shi,
      allowsShichiFor7: !!dbReading.kango_uses_shichi,
      allowsYoFor4: !!dbReading.kango_uses_yo,
      allowsYonFor4: !!dbReading.kango_uses_yon
    },
    readingId: dbReading.reading_id,
    wagoStyle: dbWagoStyle
      ? {
          alsoUsesKangoIchi:
            dbWagoStyle.range_end_inclusive >= 1 &&
            !!dbWagoStyle.also_uses_kango_one,
          alsoUsesKangoNi:
            dbWagoStyle.range_end_inclusive >= 2 &&
            !!dbWagoStyle.also_uses_kango_two,
          alsoUsesKangoSan:
            dbWagoStyle.range_end_inclusive >= 3 &&
            !!dbWagoStyle.also_uses_kango_three,
          kana: dbReading.wago_custom_base || dbReading.kana,
          rangeEndInclusive: dbWagoStyle.range_end_inclusive
        }
      : null,
    wordOrigin: getWordOrigin(dbReading.word_origin)
  };
}

function convertToProductionKanji(
  primaryKanji: string,
  alternativeKanji: ReadonlyArray<DbCounterAlternativeKanji>
): CounterKanjiInfo {
  return {
    additionalKanji: alternativeKanji.map(({ kanji }) => kanji),
    primaryKanji
  };
}

export function convertToProductionIrregularType(
  dbType: DbIrregularType
): CounterIrregularType {
  switch (dbType) {
    case DbIrregularType.ArbitraryReading: {
      return CounterIrregularType.ArbitraryReading;
    }
  }
}

function convertToProductionIrregularsMap(
  dbIrregulars: ReadonlyArray<DbCounterIrregular>
): Counter["irregulars"] {
  const result: Counter["irregulars"] = {};

  const amountsLookup = new Map<number, DbCounterIrregular[]>();
  for (const irregular of dbIrregulars) {
    if (!amountsLookup.has(irregular.number)) {
      amountsLookup.set(irregular.number, []);
    }

    amountsLookup.get(irregular.number)?.push(irregular);
  }

  const orderedAmounts = sortBy(Array.from(amountsLookup.keys()));

  for (const amount of orderedAmounts) {
    const irregulars = amountsLookup.get(amount);
    if (!irregulars) {
      continue;
    }

    result[amount] = irregulars.map(
      (dbIrregular): CounterIrregular => ({
        doesPresenceEraseRegularConjugations: !!dbIrregular.does_presence_erase_regular_conjugations,
        reading: dbIrregular.kana,
        type: convertToProductionIrregularType(dbIrregular.irregular_type)
      })
    );
  }

  return result;
}

export default function writeCountersFile(
  stream: Writable,
  dataSource: ValidatedDataSource
): void {
  stream.write('import { Counter, WordOrigin } from "../src/interfaces";\n');
  stream.write('import * as DISAMBIGUATIONS from "./disambiguations";');

  const externalLinksLookup: {
    [counterId: string]: DbCounterExternalLink[] | undefined;
  } = {};
  for (const externalLink of dataSource.counter_external_links.valid) {
    if (!externalLinksLookup[externalLink.counter_id]) {
      externalLinksLookup[externalLink.counter_id] = [];
    }

    externalLinksLookup[externalLink.counter_id]?.push(externalLink);
  }

  const disambiguationsLookup: {
    [counterId: string]: DbCounterDisambiguation[] | undefined;
  } = {};
  for (const disambiguation of dataSource.counter_disambiguations.valid) {
    if (!disambiguationsLookup[disambiguation.counter1_id]) {
      disambiguationsLookup[disambiguation.counter1_id] = [];
    }

    disambiguationsLookup[disambiguation.counter1_id]?.push(disambiguation);

    if (!disambiguationsLookup[disambiguation.counter2_id]) {
      disambiguationsLookup[disambiguation.counter2_id] = [];
    }

    disambiguationsLookup[disambiguation.counter2_id]?.push(disambiguation);
  }

  const readingsLookup: {
    [counterId: string]: DbCounterReading[] | undefined;
  } = {};
  for (const reading of dataSource.counter_readings.valid) {
    if (!readingsLookup[reading.counter_id]) {
      readingsLookup[reading.counter_id] = [];
    }

    readingsLookup[reading.counter_id]?.push(reading);
  }

  const irregularsLookup: {
    [counterId: string]: DbCounterIrregular[] | undefined;
  } = {};
  for (const irregular of dataSource.counter_irregulars.valid) {
    if (!irregularsLookup[irregular.counter_id]) {
      irregularsLookup[irregular.counter_id] = [];
    }

    irregularsLookup[irregular.counter_id]?.push(irregular);
  }

  const alternativeKanjiLookup: {
    [counterId: string]: DbCounterAlternativeKanji[] | undefined;
  } = {};
  for (const alternative of dataSource.counter_alternative_kanji.valid) {
    if (!alternativeKanjiLookup[alternative.counter_id]) {
      alternativeKanjiLookup[alternative.counter_id] = [];
    }

    alternativeKanjiLookup[alternative.counter_id]?.push(alternative);
  }

  const wagoStyleLookup: { [handle: string]: DbWagoStyle | undefined } = {};
  for (const wagoStyle of dataSource.wago_style.valid) {
    wagoStyleLookup[wagoStyle.wago_style_handle] = wagoStyle;
  }

  const sortedCounters = sortBy(dataSource.counters.valid, ["counter_id"]);
  for (const dbCounter of sortedCounters) {
    const variableName = getCounterId(dbCounter.counter_id);

    const readings = readingsLookup[dbCounter.counter_id] || [];
    const counter: ProtoCounter = {
      counterId: dbCounter.counter_id,
      disambiguations: convertToProductionDisambiguations(
        dbCounter.counter_id,
        disambiguationsLookup[dbCounter.counter_id] || []
      ),
      englishName: dbCounter.english_name,
      externalLinks: (externalLinksLookup[dbCounter.counter_id] || []).map(
        convertToProductionExternalLink
      ),
      irregulars: convertToProductionIrregularsMap(
        irregularsLookup[dbCounter.counter_id] || []
      ),
      kanji: dbCounter.primary_kanji
        ? convertToProductionKanji(
            dbCounter.primary_kanji,
            alternativeKanjiLookup[dbCounter.counter_id] || []
          )
        : null,
      notes: dbCounter.notes ? dbCounter.notes : null, // Handle empty string
      readings: readings.map(reading =>
        convertToProductionReading(
          dbCounter.counter_id,
          reading,
          reading.wago_style ? wagoStyleLookup[reading.wago_style] : undefined
        )
      )
    };

    stream.write(
      `\n\nexport const ${variableName}: Counter = ${productionStringify(
        counter
      )};`
    );
  }

  stream.write("\n\n");

  const lookup = sortedCounters.reduce(
    (obj: { [counterId: string]: ProductionVariable }, { counter_id }) => {
      obj[counter_id] = new ProductionVariable(getCounterId(counter_id));
      return obj;
    },
    {}
  );
  stream.write(
    `export const COUNTERS_LOOKUP: { [counterId: string]: Counter; } = ${productionStringify(
      lookup
    )};`
  );
}
