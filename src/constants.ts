import { AmountRange } from "./redux";

export const ONE_SECOND = 1000;
export const ONE_MINUTE = ONE_SECOND * 60;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_MONTH = ONE_DAY * 31;

export const AMOUNT_RANGES: {
  [range in AmountRange]: { min: number; max: number };
} = {
  [AmountRange.Small]: {
    max: 25,
    min: 1
  },
  [AmountRange.Medium]: {
    max: 50,
    min: 1
  },
  [AmountRange.Large]: {
    max: 100,
    min: 1
  },
  [AmountRange.Giant]: {
    max: 1000,
    min: 1
  }
};
