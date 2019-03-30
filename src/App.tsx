import * as React from "react";

import AnswerInput from "./ui/AnswerInput";
import HistoryPanel from "./ui/HistoryPanel";
import QuestionDisplay from "./ui/QuestionDisplay";
import ScoreBar from "./ui/ScoreBar";

import { conjugateNumber, JapaneseNumber } from "./japanese/numbers";

import "./App.scss";

interface ComponentState {
  value: string;
  conjugations: ReadonlyArray<JapaneseNumber>;
}

export default class App extends React.PureComponent<{}, ComponentState> {
  public state: ComponentState = {
    conjugations: [],
    value: ""
  };

  public render() {
    const { conjugations, value } = this.state;

    return (
      <div className="App">
        <ScoreBar />
        <QuestionDisplay />
        <AnswerInput />
        <HistoryPanel />
        Conjugate:
        <input value={value} onChange={this.onChange} />
        <ul>
          {conjugations.map(({ kana, kanji }) => (
            <React.Fragment key={kana + (kanji || "")}>
              <li>{kana}</li>
              {kanji && <li>{kanji}</li>}
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(event.target.value, 10);
    this.setState({
      conjugations: conjugateNumber(num),
      value: event.target.value
    });
  };
}
