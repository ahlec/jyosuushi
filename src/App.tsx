import * as React from "react";
import { connect } from "react-redux";

import QuestionCreator from "./QuestionCreator";
import { State } from "./redux";

import AnswerInput from "./ui/AnswerInput";
import Header from "./ui/Header";
import HistoryPanel from "./ui/HistoryPanel";
import PackSelection from "./ui/PackSelection";
import QuestionDisplay from "./ui/QuestionDisplay";
import ScoreBar from "./ui/ScoreBar";

import { conjugateNumberAndCounter } from "./japanese/counters";
import { getHepburnRoomaji } from "./japanese/hepburn";
import { conjugateNumber } from "./japanese/numbers";
import { JapaneseWord } from "./japanese/words";

import "./App.scss";

interface ProvidedProps {
  questionCreator: QuestionCreator;
}

interface ReduxProps {
  hasStudyPacksEnabled: boolean;
}

type ComponentProps = ProvidedProps & ReduxProps;

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

function mapStateToProps(state: State): ReduxProps {
  return {
    hasStudyPacksEnabled: !!state.enabledPacks.length
  };
}

class App extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState = {
    conjugationsNumbers: [],
    conjugationsNumberAndCounters: [],
    value: ""
  };

  public render() {
    const { hasStudyPacksEnabled } = this.props;
    const {
      conjugationsNumbers,
      conjugationsNumberAndCounters,
      value
    } = this.state;

    if (!hasStudyPacksEnabled) {
      return (
        <div className="App">
          <Header />
          <p>
            Welcome to <strong>助数詞を練習</strong>! This is a tool that's
            meant to help you study{" "}
            <a
              href="https://en.wikipedia.org/wiki/Japanese_counter_word"
              target="_blank"
            >
              Japanese counters
            </a>
            . It's simple! We take a random type of item and a random number,
            and then you tell us what the proper conjugation of the number +
            counter is!
          </p>
          <p>
            To start, choose one or more study pack below. Don't worry, you can
            change this at any time:
          </p>
          <PackSelection />
        </div>
      );
    }

    return (
      <div className="App">
        <Header />
        <ScoreBar />
        <QuestionDisplay />
        <AnswerInput />
        <HistoryPanel />
        <PackSelection />
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

export default connect(mapStateToProps)(App);
