import * as React from "react";

import PackSelection from "../shared/PackSelection";

import "./index.scss";

export default class IntroPage extends React.PureComponent {
  public render() {
    return (
      <div className="IntroPage">
        <p>
          Welcome to <strong>助数詞を練習</strong>! This is a tool that's meant
          to help you study{" "}
          <a
            href="https://en.wikipedia.org/wiki/Japanese_counter_word"
            target="_blank"
          >
            Japanese counters
          </a>
          . It's simple! We take a random type of item and a random number, and
          then you tell us what the proper conjugation of the number + counter
          is!
        </p>
        <p>
          To start, choose one or more study pack below. Don't worry, you can
          change this at any time:
        </p>
        <PackSelection />
      </div>
    );
  }
}
