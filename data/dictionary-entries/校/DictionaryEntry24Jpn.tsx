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
        <div className={this.props.numericalGroupClassName}>
          <div className={this.props.numericalGroupHeaderClassName}>
            <div className={this.props.numericalGroupHeaderNumeralClassName}>
              1
            </div>
            <div className={this.props.numericalGroupHeaderSubheaderClassName}>
              ［名］
            </div>
          </div>
          <div className={this.props.numericalGroupContentsClassName}>
            <ol>
              <li>
                学校。
                <span className={this.props.exampleClassName}>「わが校」</span>
              </li>
              <li>
                書物の文字の誤りを調べ正すこと。校正。
                <span className={this.props.exampleClassName}>
                  「校を重ねる」
                </span>
              </li>
            </ol>
          </div>
        </div>
        <div className={this.props.numericalGroupClassName}>
          <div className={this.props.numericalGroupHeaderClassName}>
            <div className={this.props.numericalGroupHeaderNumeralClassName}>
              2
            </div>
            <div className={this.props.numericalGroupHeaderSubheaderClassName}>
              ［接尾］助数詞。校正の回数を数えるのに用いる。
              <span className={this.props.exampleClassName}>「初校」</span>
              <span className={this.props.exampleClassName}>「再校」</span>
              <span className={this.props.exampleClassName}>「三校」</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DictionaryEntry24Jpn;
