import { random, shuffle } from "lodash";

import { ITEMS_FROM_COUNTER } from "./data/items";
import { StudyPack } from "./data/study-packs";
import { conjugateNumberAndCounter } from "./japanese/counters";
import { Answer, Counter, Item, Question } from "./redux";
import { getDistinctCounters, randomFromArray } from "./utils";

const MAX_NUMBER_QUESTIONS_PER_ITEM = 20;
const MAX_NUMBER_QUESTIONS_PER_COUNTER = 40;

interface ItemEntry {
  item: Item;
  numRemaining: number;
  usedAmounts: Set<number>;
}

interface QuizItems {
  [itemId: string]: ItemEntry;
}

interface CountersLookup {
  [counterId: string]: Counter;
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
      usedAmounts: new Set()
    };
  }

  return quizItems;
}

function createQuestion(
  item: Item,
  amount: number,
  countersLookup: CountersLookup
): Question {
  const itemCounters = item.counters
    .map(counterId => countersLookup[counterId])
    .filter(itemId => !!itemId);
  const validAnswers: Answer[] = [];
  for (const counter of itemCounters) {
    if (counter.irregulars[amount]) {
      validAnswers.push({
        counterId: counter.counterId,
        isIrregular: true,
        kana: counter.irregulars[amount],
        kanji: ""
      });
    } else {
      const answers: Answer[] = conjugateNumberAndCounter(amount, {
        kana: counter.kana,
        kanji: counter.kanji
      }).map(({ kana, kanji }) => ({
        counterId: counter.counterId,
        isIrregular: false,
        kana,
        kanji
      }));

      for (const answer of answers) {
        validAnswers.push(answer);
      }
    }
  }

  return {
    amount,
    itemId: item.itemId,
    validAnswers
  };
}

function makeQuestionsForCounter(
  counter: Counter,
  quizItems: QuizItems,
  countersLookup: CountersLookup
): ReadonlyArray<Question> {
  const questions: Question[] = [];
  const validItems = ITEMS_FROM_COUNTER[counter.counterId].filter(
    ({ itemId }) => quizItems[itemId].numRemaining > 0
  );

  while (
    questions.length < MAX_NUMBER_QUESTIONS_PER_COUNTER &&
    validItems.length
  ) {
    const item = randomFromArray(validItems);
    let amount: number;
    do {
      amount = random(item.minQuantity, item.maxQuantity);
    } while (quizItems[item.itemId].usedAmounts.has(amount));

    questions.push(createQuestion(item, amount, countersLookup));

    quizItems[item.itemId].usedAmounts.add(amount);
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
): ReadonlyArray<Question> {
  const counters = getDistinctCounters(studyPacks);
  const items = getDistinctItems(counters);
  const quizItems = planOutItems(items);

  const countersLookup: CountersLookup = {};
  for (const counter of counters) {
    countersLookup[counter.counterId] = counter;
  }

  const questions: Question[] = [];
  for (const counter of counters) {
    const counterQuestions = makeQuestionsForCounter(
      counter,
      quizItems,
      countersLookup
    );
    questions.push(...counterQuestions);
  }

  return shuffle(questions);
}
