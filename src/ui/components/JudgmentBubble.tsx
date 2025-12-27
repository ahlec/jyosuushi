import classnames from "classnames";
import * as React from "react";

import { UserAnswerJudgment } from "@jyosuushi/redux";

import Furigana from "./Furigana";

import * as styles from "./JudgmentBubble.scss";

const RESULT_BUBBLE_CONTENTS: {
  [judgment in UserAnswerJudgment]: { kanji: string; kana: string };
} = {
  correct: {
    kana: "せいかい",
    kanji: "正解",
  },
  ignored: {
    kana: "むし",
    kanji: "無視",
  },
  incorrect: {
    kana: "ふせいかい",
    kanji: "不正解",
  },
  skipped: {
    kana: "みかいとう",
    kanji: "未回答",
  },
};

interface ComponentProps {
  className?: string;
  judgment: UserAnswerJudgment;
  shape: "block-circle" | "inline";
}

const SHAPE_TO_CSS_CLASS_NAME: {
  [shape in ComponentProps["shape"]]: string;
} = {
  "block-circle": styles.blockCircle,
  inline: styles.inline,
};

const JUDGMENT_TO_CSS_CLASS_NAME: {
  [judgment in UserAnswerJudgment]: string;
} = {
  correct: styles.correct,
  ignored: styles.ignored,
  incorrect: styles.incorrect,
  skipped: styles.skipped,
};

export default class JudgmentBubble extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { className, judgment, shape } = this.props;

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
      <div
        className={classnames(
          styles.judgmentBubble,
          SHAPE_TO_CSS_CLASS_NAME[shape],
          JUDGMENT_TO_CSS_CLASS_NAME[judgment],
          className,
        )}
      >
        {contents}
      </div>
    );
  }
}
