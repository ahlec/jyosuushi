import { shuffle } from "lodash";

import { ITEMS_FROM_COUNTER } from "../data/items";
import {
  Counter,
  InterestRegion,
  Item,
  PendingQuestion,
  StudyPack
} from "./interfaces";
import { getDistinctCounters, randomFromArray } from "./utils";

const MAX_NUMBER_QUESTIONS_PER_ITEM = 3;
const MAX_NUMBER_QUESTIONS_PER_COUNTER = 10;

interface ItemEntry {
  item: Item;
  numRemaining: number;
  usedInterestRegions: Set<string>;
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
      usedInterestRegions: new Set()
    };
  }

  return quizItems;
}

function getInterestRegionId({
  endInclusive,
  startInclusive
}: InterestRegion): string {
  return `${startInclusive}-${endInclusive}`;
}

function makeQuestionsForCounter(
  counter: Counter,
  quizItems: QuizItems
): ReadonlyArray<PendingQuestion> {
  const questions: PendingQuestion[] = [];
  const validItems = ITEMS_FROM_COUNTER[counter.counterId].filter(
    ({ itemId }) => quizItems[itemId].numRemaining > 0
  );

  while (
    questions.length < MAX_NUMBER_QUESTIONS_PER_COUNTER &&
    validItems.length
  ) {
    const item = randomFromArray(validItems);
    let interestRegion: InterestRegion;
    let interestRegionId: string;
    do {
      interestRegion = randomFromArray(counter.interestRegions);
      interestRegionId = getInterestRegionId(interestRegion);
    } while (quizItems[item.itemId].usedInterestRegions.has(interestRegionId));

    questions.push({
      interestRegion,
      itemId: item.itemId
    });

    quizItems[item.itemId].usedInterestRegions.add(interestRegionId);
    quizItems[item.itemId].numRemaining--;
    if (quizItems[item.itemId].numRemaining <= 0) {
      const index = validItems.indexOf(item);
      validItems.splice(index, 1);
    }
  }

  return questions;
}

export default function makeQuiz(
  studyPacks: ReadonlyArray<StudyPack>
): ReadonlyArray<PendingQuestion> {
  const counters = getDistinctCounters(studyPacks);
  const items = getDistinctItems(counters);
  const quizItems = planOutItems(items);

  const questions: PendingQuestion[] = [];
  for (const counter of counters) {
    const counterQuestions = makeQuestionsForCounter(counter, quizItems);
    questions.push(...counterQuestions);
  }

  return shuffle(questions);
}
