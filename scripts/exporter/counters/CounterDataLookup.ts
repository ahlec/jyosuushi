import {
  DbCounterDisambiguation,
  DbCounterExternalLink,
  DbCounterReading,
  DbCounterAlternativeKanji,
  DbCounterIrregular,
  DbWagoStyle
} from "../../database/schemas";
import ValidatedDataSource from "../../database/ValidatedDataSource";

export interface CounterJoinData {
  externalLinks: ReadonlyArray<DbCounterExternalLink>;
  disambiguations: ReadonlyArray<DbCounterDisambiguation>;
  readings: ReadonlyArray<DbCounterReading>;
  irregulars: ReadonlyArray<DbCounterIrregular>;
  alternativeKanji: ReadonlyArray<DbCounterAlternativeKanji>;
  allDefinedWagoStyles: { [handle: string]: DbWagoStyle };
}

class CounterDataLookup {
  private readonly externalLinksLookup: {
    [counterId: string]: DbCounterExternalLink[] | undefined;
  } = {};
  private readonly disambiguationsLookup: {
    [counterId: string]: DbCounterDisambiguation[] | undefined;
  } = {};
  private readonly readingsLookup: {
    [counterId: string]: DbCounterReading[] | undefined;
  } = {};
  private readonly irregularsLookup: {
    [counterId: string]: DbCounterIrregular[] | undefined;
  } = {};
  private readonly alternativeKanjiLookup: {
    [counterId: string]: DbCounterAlternativeKanji[] | undefined;
  } = {};
  private readonly wagoStyleLookup: {
    [handle: string]: DbWagoStyle;
  } = {};

  public constructor(dataSource: ValidatedDataSource) {
    for (const externalLink of dataSource.counter_external_links.valid) {
      if (!this.externalLinksLookup[externalLink.counter_id]) {
        this.externalLinksLookup[externalLink.counter_id] = [];
      }

      this.externalLinksLookup[externalLink.counter_id]?.push(externalLink);
    }

    for (const disambiguation of dataSource.counter_disambiguations.valid) {
      if (!this.disambiguationsLookup[disambiguation.counter1_id]) {
        this.disambiguationsLookup[disambiguation.counter1_id] = [];
      }

      this.disambiguationsLookup[disambiguation.counter1_id]?.push(
        disambiguation
      );

      if (!this.disambiguationsLookup[disambiguation.counter2_id]) {
        this.disambiguationsLookup[disambiguation.counter2_id] = [];
      }

      this.disambiguationsLookup[disambiguation.counter2_id]?.push(
        disambiguation
      );
    }

    for (const reading of dataSource.counter_readings.valid) {
      if (!this.readingsLookup[reading.counter_id]) {
        this.readingsLookup[reading.counter_id] = [];
      }

      this.readingsLookup[reading.counter_id]?.push(reading);
    }

    for (const irregular of dataSource.counter_irregulars.valid) {
      if (!this.irregularsLookup[irregular.counter_id]) {
        this.irregularsLookup[irregular.counter_id] = [];
      }

      this.irregularsLookup[irregular.counter_id]?.push(irregular);
    }

    for (const alternative of dataSource.counter_alternative_kanji.valid) {
      if (!this.alternativeKanjiLookup[alternative.counter_id]) {
        this.alternativeKanjiLookup[alternative.counter_id] = [];
      }

      this.alternativeKanjiLookup[alternative.counter_id]?.push(alternative);
    }

    for (const wagoStyle of dataSource.wago_style.valid) {
      this.wagoStyleLookup[wagoStyle.wago_style_handle] = wagoStyle;
    }
  }

  public getJoinData(counterId: string): CounterJoinData {
    return {
      allDefinedWagoStyles: this.wagoStyleLookup,
      alternativeKanji: this.alternativeKanjiLookup[counterId] || [],
      disambiguations: this.disambiguationsLookup[counterId] || [],
      externalLinks: this.externalLinksLookup[counterId] || [],
      irregulars: this.irregularsLookup[counterId] || [],
      readings: this.readingsLookup[counterId] || []
    };
  }
}

export default CounterDataLookup;
