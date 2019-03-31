import { random } from "lodash";
import { conjugateNumberAndCounter } from "./japanese/counters";
import { Answer, Item, State } from "./redux";
import { ActionCreateQuestion } from "./redux/actions";
import { Store } from "./redux/store";
import { randomFromArray } from "./utils";

export default class QuestionCreator {
  public constructor(private readonly store: Store) {}

  public next() {
    const state = this.store.getState();
    const action = this.createRandomQuestion(state);
    this.store.dispatch(action);
  }

  private createRandomQuestion(state: State): ActionCreateQuestion {
    if (!state.items.length) {
      throw new Error("There are no defined items");
    }

    let item;
    do {
      item = randomFromArray(state.items);
    } while (!item.counters.length);
    const amount = random(item.minQuantity, item.maxQuantity);
    return this.createQuestion(state, item, amount);
  }

  private createQuestion(
    state: State,
    item: Item,
    amount: number
  ): ActionCreateQuestion {
    if (amount <= 0) {
      throw new Error(`Invalid question amount of: ${amount}`);
    }

    const counters = item.counters.map(
      counterId => state.counters[counterId].counter
    );
    const validAnswers: Answer[] = [];
    for (const counter of counters) {
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
      item,
      type: "create-question",
      validAnswers
    };
  }
}
