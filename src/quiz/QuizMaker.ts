import { memoize, random, shuffle } from "lodash";

import { ITEMS_FROM_COUNTER } from "../../data/items";
import { AMOUNT_RANGES } from "../constants";
import { Counter, Item, PendingQuestion, StudyPack } from "../interfaces";
import { AmountRange } from "../redux";
import {
  getDistinctCounters,
  isConjugationRegular,
  randomFromArray
} from "../utils";

const MAX_NUMBER_QUESTIONS_PER_ITEM = 3;
const MIN_NUMBER_QUESTIONS_PER_COUNTER = 4;
const MAX_NUMBER_QUESTIONS_PER_COUNTER = 10;

interface ItemEntry {
  item: Item;
  numRemaining: number;
  usedAmountRegions: Set<string>;
}

interface QuizItems {
  [itemId: string]: ItemEntry;
}

function getDistinctItems(
  counters: ReadonlyArray<Counter>
): ReadonlyArray<Item> {
  const distinct: Item[] = [];
  const encountered = new Set<string>();
  for (const counter of counters) {
    const items = ITEMS_FROM_COUNTER[counter.counterId];
    for (const item of items) {
      if (encountered.has(item.itemId)) {
        continue;
      }

      encountered.add(item.itemId);
      distinct.push(item);
    }
  }

  return distinct;
}

function planOutItems(items: ReadonlyArray<Item>): QuizItems {
  const quizItems: QuizItems = {};
  for (const item of items) {
    const maxPossibleItems = Math.max(0, item.maxQuantity - item.minQuantity);
    if (maxPossibleItems <= 0) {
      continue;
    }

    quizItems[item.itemId] = {
      item,
      numRemaining: Math.min(maxPossibleItems, MAX_NUMBER_QUESTIONS_PER_ITEM),
      usedAmountRegions: new Set()
    };
  }

  return quizItems;
}

// "Amount regions" are what will become PendingQuestion.possibleAmounts
// "Interesting" amounts will be a region themselves, everything else is "boring"
const BORING_AMOUNTS_REGION_SIZE = 10;
const getAmountRegions = memoize(
  (
    counter: Counter,
    min: number,
    max: number
  ): ReadonlyArray<ReadonlyArray<number>> => {
    const regions: Array<ReadonlyArray<number>> = [];

    // The first ten are interesting enough we'll want to always just focus on them.
    for (let amount = min; amount <= 10; ++amount) {
      regions.push([amount]);
    }

    // Chunk regions based on if there's anything interesting there. If there is,
    // give it a region of its own. If not, group it together with surrounding numbers.
    let boringAmounts: number[] = [];
    for (let amount = Math.max(min, 11); amount <= max; amount++) {
      const isRegular = isConjugationRegular(amount, counter);
      if (!isRegular) {
        regions.push([amount]);
      } else {
        boringAmounts.push(amount);
        if (boringAmounts.length >= BORING_AMOUNTS_REGION_SIZE) {
          regions.push(boringAmounts);
          boringAmounts = [];
        }
      }
    }

    if (boringAmounts.length) {
      regions.push(boringAmounts);
    }

    return regions;
  },
  (counter: Counter, min: number, max: number) =>
    `${counter.counterId}-${min}-${max}`
);

function getRandomAmount(
  counter: Counter,
  item: Item,
  amountRange: AmountRange,
  usedAmountRegions: ReadonlySet<string>
):
  | { success: true; amounts: ReadonlyArray<number>; id: string }
  | { success: false } {
  const amountRegions = [
    ...getAmountRegions(
      counter,
      Math.max(item.minQuantity, 1),
      Math.min(item.maxQuantity, AMOUNT_RANGES[amountRange].max)
    )
  ];

  let possibleAmounts: ReadonlyArray<number>;
  let possibleAmountsId: string;
  const MAX_NUM_ATTEMPTS = 6;
  let numAttempts = 0;
  do {
    if (numAttempts > MAX_NUM_ATTEMPTS) {
      return { success: false };
    }

    ++numAttempts;
    possibleAmounts = randomFromArray(amountRegions);
    possibleAmountsId = possibleAmounts.join(",");
  } while (usedAmountRegions.has(possibleAmountsId));

  return {
    amounts: possibleAmounts,
    id: possibleAmountsId,
    success: true
  };
}

function makeQuestionsForCounter(
  counter: Counter,
  quizItems: QuizItems,
  amountRange: AmountRange
): ReadonlyArray<PendingQuestion> {
  const questions: PendingQuestion[] = [];
  const validItems = ITEMS_FROM_COUNTER[counter.counterId].filter(
    ({ itemId }) => quizItems[itemId].numRemaining > 0
  );

  const numCounterQuestions = random(
    MIN_NUMBER_QUESTIONS_PER_COUNTER,
    MAX_NUMBER_QUESTIONS_PER_COUNTER
  );
  while (questions.length < numCounterQuestions && validItems.length) {
    const item = randomFromArray(validItems);
    const randomAmount = getRandomAmount(
      counter,
      item,
      amountRange,
      quizItems[item.itemId].usedAmountRegions
    );

    let isItemDepleted = !randomAmount.success;

    if (randomAmount.success) {
      questions.push({
        itemId: item.itemId,
        possibleAmounts: randomAmount.amounts
      });

      quizItems[item.itemId].usedAmountRegions.add(randomAmount.id);
      quizItems[item.itemId].numRemaining--;
      isItemDepleted = quizItems[item.itemId].numRemaining <= 0;
    }

    if (isItemDepleted) {
      const index = validItems.indexOf(item);
      validItems.splice(index, 1);
    }
  }

  return questions;
}

export default function makeQuiz(
  studyPacks: ReadonlyArray<StudyPack>,
  amountRange: AmountRange
): ReadonlyArray<PendingQuestion> {
  const counters = getDistinctCounters(studyPacks);
  const items = getDistinctItems(counters);
  const quizItems = planOutItems(items);

  const questions: PendingQuestion[] = [];
  for (const counter of counters) {
    const counterQuestions = makeQuestionsForCounter(
      counter,
      quizItems,
      amountRange
    );
    questions.push(...counterQuestions);
  }

  return shuffle(questions);
}
