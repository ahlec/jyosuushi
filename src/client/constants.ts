import { defineMessages, MessageDescriptor } from "react-intl";

import { AmountRange } from "./redux";

export const ONE_SECOND = 1000;
export const ONE_MINUTE = ONE_SECOND * 60;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_MONTH = ONE_DAY * 31;

export enum KeyCode {
  Enter = 13,
  Space = 32,
  LeftArrow = 37,
  RightArrow = 39,
}

const INTL_MESSAGES = defineMessages({
  amountRangeGiant: {
    defaultMessage: "Gigantic",
    id: "constants.quizAmountRanges.nameGiant",
  },
  amountRangeLarge: {
    defaultMessage: "Massive",
    id: "constants.quizAmountRanges.nameLarge",
  },
  amountRangeMedium: {
    defaultMessage: "Average",
    id: "constants.quizAmountRanges.nameMedium",
  },
  amountRangeSmall: {
    defaultMessage: "Tiny",
    id: "constants.quizAmountRanges.nameSmall",
  },
});

export const AMOUNT_RANGES: {
  [range in AmountRange]: { min: number; max: number; name: MessageDescriptor };
} = {
  [AmountRange.Small]: {
    max: 25,
    min: 1,
    name: INTL_MESSAGES.amountRangeSmall,
  },
  [AmountRange.Medium]: {
    max: 50,
    min: 1,
    name: INTL_MESSAGES.amountRangeMedium,
  },
  [AmountRange.Large]: {
    max: 100,
    min: 1,
    name: INTL_MESSAGES.amountRangeLarge,
  },
  [AmountRange.Giant]: {
    max: 1000,
    min: 1,
    name: INTL_MESSAGES.amountRangeGiant,
  },
};
