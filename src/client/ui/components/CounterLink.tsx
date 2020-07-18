import * as React from "react";
import { Link } from "react-router-dom";

import { COUNTERS_LOOKUP } from "@data/counters";

import Furigana from "@jyosuushi/ui/Furigana";

import { getCounterLink } from "@jyosuushi/ui/main-screen/explore/pathing";

interface ComponentProps {
  counterId: string;
  specificKanji?: string;
  specificReading?: string;
}

class CounterLink extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { counterId, specificKanji, specificReading } = this.props;
    const counter = COUNTERS_LOOKUP[counterId];

    let furigana: string;
    let text: string;
    if (specificKanji) {
      text = specificKanji;
      furigana = specificReading || counter.readings[0].kana;
    } else if (counter.kanji) {
      text = counter.kanji.primaryKanji;
      furigana = specificReading || counter.readings[0].kana;
    } else {
      text = specificReading || counter.readings[0].kana;
      furigana = "";
    }

    return (
      <Link to={getCounterLink(counter)}>
        <Furigana text={text} furigana={furigana} />
      </Link>
    );
  }
}

export default CounterLink;
