import { random } from "lodash";
import { randomFromArray } from "../utils";
import { ActionCreateQuestion } from "./actions";
import { Answer, Counter, Item, Question, State } from "./index";

export function createQuestion(
  state: State,
  item: Item,
  amount: number
): ActionCreateQuestion {
  if (amount <= 0) {
    throw new Error(`Invalid question amount of: ${amount}`);
  }

  const counters = item.counters.map(counterId => state.counters[counterId]);
  const validAnswers: Answer[] = [];
  for (const counter of counters) {
    if (counter.irregulars.has(amount)) {
      validAnswers.push({
        counterId: counter.counterId,
        isIrregular: true,
        kana: counter.irregulars.get(amount)!,
        kanji: ""
      });
    } else {
    }
  }

  return {
    amount,
    item,
    type: "create-question",
    validAnswers
  };
}

export function createRandomQuestion(state: State): ActionCreateQuestion {
  const itemIds = Object.keys(state.items);
  if (!itemIds.length) {
    throw new Error("There are no defined items");
  }

  let item;
  do {
    item = state.items[randomFromArray(itemIds)];
  } while (!item.counters.length);
  const amount = random(item.minQuantity, item.maxQuantity);
  return createQuestion(state, item, amount);
}
