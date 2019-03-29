import * as React from "react";

import HistoryPanel from "./ui/history-panel";
import AnswerInput from "./ui/AnswerInput";
import QuestionPanel from "./ui/QuestionPanel";
import ScoreBar from "./ui/ScoreBar";

import "./App.scss";

export default class App extends React.PureComponent {
  public render() {
    return (
      <div className="App">
        <HistoryPanel />
        <div className="main">
          <ScoreBar />
          <QuestionPanel />
          <AnswerInput />
          we're an app now with hot reloading
        </div>
      </div>
    );
  }
}
