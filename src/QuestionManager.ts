import { random } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import shallowequals from "shallow-equals";

import { conjugateNumberAndCounter } from "./japanese/counters";
import {
  Answer,
  CountersState,
  Item,
  ItemsState,
  Question,
  State
} from "./redux";
import { ActionCreateQuestion } from "./redux/actions";
import { Dispatch } from "./redux/store";
import { randomFromArray } from "./utils";

export type AskNewQuestion = () => void;

interface ProvidedProps {
  children: (askNewQuestion: AskNewQuestion) => React.ReactNode;
}

interface ReduxProps {
  counters: CountersState;
  currentQuestion: Question | null;
  enabledPacks: ReadonlyArray<string>;
  items: ItemsState;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    counters: state.counters,
    currentQuestion: state.currentQuestion,
    enabledPacks: state.enabledPacks,
    items: state.items
  };
}

type ComponentProps = ProvidedProps & ReduxProps & { dispatch: Dispatch };

class QuestionManager extends React.PureComponent<ComponentProps> {
  public componentDidUpdate({
    enabledPacks: prevEnabledPacks
  }: ComponentProps) {
    const { enabledPacks } = this.props;
    const hadPacksEnabled = !!prevEnabledPacks.length;
    const arePacksEnabled = !!enabledPacks.length;
    if (
      (!hadPacksEnabled && arePacksEnabled) ||
      (arePacksEnabled && !shallowequals(prevEnabledPacks, enabledPacks))
    ) {
      this.next();
    }
  }

  public render() {
    const { children } = this.props;
    return children(this.next);
  }

  private next = () => {
    const { dispatch } = this.props;
    const action = this.createRandomQuestion();
    dispatch(action);
  };

  private createRandomQuestion(): ActionCreateQuestion {
    const { currentQuestion, items } = this.props;
    const itemIds = Object.keys(items);
    if (!itemIds.length) {
      throw new Error("There are no defined items");
    }

    let item: Item;
    do {
      item = items[randomFromArray(itemIds)];
    } while (
      !item.counters.length ||
      (currentQuestion &&
        itemIds.length > 1 &&
        currentQuestion.itemId === item.itemId)
    );

    let amount: number;
    do {
      amount = random(item.minQuantity, item.maxQuantity);
    } while (
      currentQuestion &&
      currentQuestion.itemId === item.itemId &&
      currentQuestion.amount === amount
    );

    return this.createQuestion(item, amount);
  }

  private createQuestion(item: Item, amount: number): ActionCreateQuestion {
    const { counters } = this.props;
    if (amount <= 0) {
      throw new Error(`Invalid question amount of: ${amount}`);
    }

    const itemCounters = item.counters.map(
      counterId => counters[counterId].counter
    );
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
      item,
      type: "create-question",
      validAnswers
    };
  }
}

export default connect(mapStateToProps)(QuestionManager);
