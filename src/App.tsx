import * as React from "react";

import AnswerInput from "./ui/AnswerInput";
import HistoryPanel from "./ui/HistoryPanel";
import QuestionDisplay from "./ui/QuestionDisplay";
import ScoreBar from "./ui/ScoreBar";

import "./App.scss";

export default class App extends React.PureComponent {
  public render() {
    return (
      <div className="App">
        <ScoreBar />
        <QuestionDisplay />
        <AnswerInput />
        <HistoryPanel />
      </div>
    );
  }
}
