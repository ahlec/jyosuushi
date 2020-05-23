import * as React from "react";

import { Counter } from "@jyosuushi/interfaces";
import Furigana from "@jyosuushi/ui/Furigana";

interface ComponentProps {
  className?: string;
  counter: Counter;
}

export default class CounterDisplay extends React.PureComponent<
  ComponentProps
> {
  public render(): React.ReactNode {
    const { className, counter } = this.props;

    if (counter.kanji) {
      return (
        <Furigana
          className={className}
          text={counter.kanji.primaryKanji}
          furigana={counter.readings[0].kana}
        />
      );
    }

    return <Furigana className={className} text={counter.readings[0].kana} />;
  }
}
