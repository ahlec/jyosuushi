import classnames from "classnames";
import * as React from "react";

import { UserAnswerJudgment } from "@jyosuushi/redux";

import Furigana from "./Furigana";

import "./JudgmentBubble.scss";

const RESULT_BUBBLE_CONTENTS: {
  [judgment in UserAnswerJudgment]: { kanji: string; kana: string };
} = {
  correct: {
    kana: "せいかい",
    kanji: "正解"
  },
  ignored: {
    kana: "むし",
    kanji: "無視"
  },
  incorrect: {
    kana: "ふせいかい",
    kanji: "不正解"
  },
  skipped: {
    kana: "みかいとう",
    kanji: "未回答"
  }
};

interface ComponentProps {
  judgment: UserAnswerJudgment;
  shape: "block-circle" | "inline";
}

export default class JudgmentBubble extends React.PureComponent<
  ComponentProps
> {
  public render(): React.ReactNode {
    const { judgment, shape } = this.props;

    let contents: React.ReactNode;
    switch (shape) {
      case "block-circle": {
        contents = (
          <Furigana
            text={RESULT_BUBBLE_CONTENTS[judgment].kanji}
            furigana={RESULT_BUBBLE_CONTENTS[judgment].kana}
          />
        );
        break;
      }
      case "inline": {
        contents = RESULT_BUBBLE_CONTENTS[judgment].kanji;
        break;
      }
    }

    return (
      <div className={classnames("JudgmentBubble", shape, judgment)}>
        {contents}
      </div>
    );
  }
}
