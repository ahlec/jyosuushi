import * as React from "react";

import AnswerInput from "./ui/AnswerInput";
import HistoryPanel from "./ui/HistoryPanel";
import QuestionDisplay from "./ui/QuestionDisplay";
import ScoreBar from "./ui/ScoreBar";

import { conjugateNumberAndCounter } from "./japanese/counters";
import { getHepburnRoomaji } from "./japanese/hepburn";
import { conjugateNumber } from "./japanese/numbers";
import { JapaneseWord } from "./japanese/words";

import "./App.scss";

interface ComponentState {
  value: string;
  conjugationsNumbers: ReadonlyArray<JapaneseWord>;
  conjugationsNumberAndCounters: ReadonlyArray<JapaneseWord>;
}

// const COUNTER_HON: JapaneseWord = {
//   kana: "ほん",
//   kanji: "本"
// };

const COUNTER_WA: JapaneseWord = {
  kana: "わ",
  kanji: "話"
};

export default class App extends React.PureComponent<{}, ComponentState> {
  public state: ComponentState = {
    conjugationsNumbers: [],
    conjugationsNumberAndCounters: [],
    value: ""
  };

  public render() {
    const {
      conjugationsNumbers,
      conjugationsNumberAndCounters,
      value
    } = this.state;

    return (
      <div className="App">
        <ScoreBar />
        <QuestionDisplay />
        <AnswerInput />
        <HistoryPanel />
        Conjugate:
        <input value={value} onChange={this.onChange} />
        {this.renderConjugationList(conjugationsNumbers)}
        {this.renderConjugationList(conjugationsNumberAndCounters)}
      </div>
    );
  }

  private renderConjugationList(list: ReadonlyArray<JapaneseWord>) {
    return (
      <ul>
        {list.map(({ kana, kanji }) => (
          <React.Fragment key={kana + (kanji || "")}>
            <li>
              {kana} ({getHepburnRoomaji(kana)})
            </li>
            {kanji && <li>{kanji}</li>}
          </React.Fragment>
        ))}
      </ul>
    );
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(event.target.value, 10);
    this.setState({
      conjugationsNumbers: conjugateNumber(num),
      conjugationsNumberAndCounters: conjugateNumberAndCounter(num, COUNTER_WA),
      value: event.target.value
    });
  };
}
