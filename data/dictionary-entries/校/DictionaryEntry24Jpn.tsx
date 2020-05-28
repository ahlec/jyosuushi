// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn build-data` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import * as React from "react";
import { DictionaryEntryComponentProps } from "@jyosuushi/interfaces";

class DictionaryEntry24Jpn extends React.PureComponent<
  DictionaryEntryComponentProps
> {
  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <p>{1} ［名］</p>
        <ol>
          <li>
            学校。<span className="example">「わが校」</span>
          </li>
          <li>
            書物の文字の誤りを調べ正すこと。校正。
            <span className="example">「校を重ねる」</span>
          </li>
        </ol>
        <p>
          {2} ［接尾］助数詞。校正の回数を数えるのに用いる。
          <span className="example">「初校」</span>
          <span className="example">「再校」</span>
          <span className="example">「三校」</span>
        </p>
      </React.Fragment>
    );
  }
}

export default DictionaryEntry24Jpn;
