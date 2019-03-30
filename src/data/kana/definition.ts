export interface ConversionChart {
  [romaji: string]: string;
}

export default class KanaDefinition {
  public constructor(
    public readonly codepointStart: number,
    public readonly codepointEnd: number,
    public readonly conversionChart: ConversionChart
  ) {}

  public isOnlyKana(str: string): boolean {
    for (let index = 0; index < str.length; ++index) {
      const code = str.charCodeAt(index);
      if (code < this.codepointStart || code > this.codepointEnd) {
        return false;
      }
    }

    return true;
  }
}
