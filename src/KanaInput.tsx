import * as React from "react";

//import { HIRAGANA_LOOKUP, KanaLookup, KATAKANA_LOOKUP } from "./kana-lookups";

interface ComponentProps {
  children: (
    onRawChange: (event: React.ChangeEvent) => void
  ) => React.ReactNode;
  kana?: "hiragana" | "katakana";
  onChange?: (event: React.ChangeEvent) => void;
}

export default class KanaInput extends React.Component<ComponentProps> {
  // private get kanaLookup(): Readonly<KanaLookup> {
  //   return this.props.kana === "katakana" ? KATAKANA_LOOKUP : HIRAGANA_LOOKUP;
  // }

  public render() {
    const { children } = this.props;
    if (!children) {
      return null;
    }

    return children(this.handleRawChange);
  }

  private handleRawChange = (event: React.ChangeEvent) => {};
}
