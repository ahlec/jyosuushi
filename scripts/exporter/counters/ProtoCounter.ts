import { sortBy } from "lodash";

import {
  Counter,
  ExternalLink,
  CounterReading,
  CounterIrregular,
  CounterKanjiInfo
} from "@jyosuushi/interfaces";

import {
  DbCounter,
  DbCounterAlternativeKanji,
  DbCounterDisambiguation,
  DbCounterExternalLink,
  DbCounterIrregular,
  DbCounterReading,
  DbExternalLinkLanguage,
  DbIrregularType,
  DbWagoStyle
} from "../../database/schemas";

import {
  getCounterNotesComponent,
  getDisambiguationId,
  getWordOrigin,
  ProductionVariable
} from "../utils";

import { CounterJoinData } from "./CounterDataLookup";

type ProtoCounterReading = Omit<CounterReading, "wordOrigin"> & {
  wordOrigin: ProductionVariable;
};

type ProtoCounterIrregular = Omit<
  CounterIrregular,
  "countingSystem" | "type"
> & {
  countingSystem: ProductionVariable | null;
  type: ProductionVariable;
};

type ProtoExternalLink = Omit<ExternalLink, "language"> & {
  language: ProductionVariable;
};

type ProtoCounter = Omit<
  Counter,
  "disambiguations" | "externalLinks" | "irregulars" | "notes" | "readings"
> & {
  disambiguations: { [counterId: string]: ProductionVariable };
  externalLinks: ReadonlyArray<ProtoExternalLink>;
  irregulars: {
    [amount: number]: ReadonlyArray<ProtoCounterIrregular> | undefined;
  };
  notes: ProductionVariable | null;
  readings: ReadonlyArray<ProtoCounterReading>;
};

function convertToProductionExternalLink(
  db: DbCounterExternalLink
): ProtoExternalLink {
  let externalLinkLanguageEnumField: string;
  switch (db.language) {
    case DbExternalLinkLanguage.English: {
      externalLinkLanguageEnumField = "English";
      break;
    }
    case DbExternalLinkLanguage.Japanese: {
      externalLinkLanguageEnumField = "Japanese";
      break;
    }
  }

  return {
    additionalDescription: db.additional_description
      ? db.additional_description
      : null,
    displayText: db.link_text,
    language: new ProductionVariable(
      `ExternalLinkLanguage.${externalLinkLanguageEnumField}`
    ),
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

export function convertToProductionIrregularType(
  dbType: DbIrregularType
): ProductionVariable {
  switch (dbType) {
    case DbIrregularType.ArbitraryReading: {
      return new ProductionVariable("CounterIrregularType.ArbitraryReading");
    }
    case DbIrregularType.StandardWagoRangeSoundChange: {
      return new ProductionVariable("CounterIrregularType.SoundChange");
    }
  }
}

function getIrregularCountingSystem(
  type: DbIrregularType
): ProductionVariable | null {
  switch (type) {
    case DbIrregularType.ArbitraryReading: {
      return null;
    }
    case DbIrregularType.StandardWagoRangeSoundChange: {
      return new ProductionVariable("CountingSystem.Wago");
    }
  }
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

function convertToProductionIrregularsMap(
  dbIrregulars: ReadonlyArray<DbCounterIrregular>
): ProtoCounter["irregulars"] {
  const result: ProtoCounter["irregulars"] = {};

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
      (dbIrregular): ProtoCounterIrregular => ({
        amount,
        countingSystem: getIrregularCountingSystem(dbIrregular.irregular_type),
        doesPresenceEraseRegularConjugations: !!dbIrregular.does_presence_erase_regular_conjugations,
        reading: dbIrregular.kana,
        type: convertToProductionIrregularType(dbIrregular.irregular_type)
      })
    );
  }

  return result;
}

export function convertToProtoCounter(
  counter: DbCounter,
  joinData: CounterJoinData
): ProtoCounter {
  return {
    counterId: counter.counter_id,
    disambiguations: convertToProductionDisambiguations(
      counter.counter_id,
      joinData.disambiguations
    ),
    englishName: counter.english_name,
    externalLinks: joinData.externalLinks.map(convertToProductionExternalLink),
    irregulars: convertToProductionIrregularsMap(joinData.irregulars),
    kanji: counter.primary_kanji
      ? convertToProductionKanji(
          counter.primary_kanji,
          joinData.alternativeKanji
        )
      : null,
    leadIn: counter.lead_in ? counter.lead_in : null,
    notes: counter.notes
      ? new ProductionVariable(
          getCounterNotesComponent(counter.counter_id).componentName
        )
      : null,
    readings: joinData.readings.map(reading =>
      convertToProductionReading(
        counter.counter_id,
        reading,
        reading.wago_style
          ? joinData.allDefinedWagoStyles[reading.wago_style]
          : undefined
      )
    )
  };
}
