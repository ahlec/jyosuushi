// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn build-data` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import * as React from "react";
import { DictionaryEntryComponentProps } from "@jyosuushi/interfaces";

class DictionaryEntry24Trans extends React.PureComponent<
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
              Noun
            </div>
          </div>
          <div className={this.props.numericalGroupContentsClassName}>
            <ol>
              <li>
                School.{" "}
                <span className={this.props.exampleClassName}>
                  "Our school"
                </span>
              </li>
              <li>
                To look for and correct mistakes in the characters of documents.
                Proofreading.{" "}
                <span className={this.props.exampleClassName}>
                  "To proofread again and again"
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
              [Suffix] Counter. Used to count the number of proofs
              <sup id="fnref-1">
                <a className="footnote-ref" href="#fn-1">
                  1
                </a>
              </sup>
              .{" "}
              <span className={this.props.exampleClassName}>"First proof"</span>
              ,{" "}
              <span className={this.props.exampleClassName}>
                "Second proof"
              </span>
              ,{" "}
              <span className={this.props.exampleClassName}>"Third proof"</span>
            </div>
          </div>
          <div className={this.props.numericalGroupContentsClassName} />
        </div>
        <div className="footnotes">
          <hr />
          <ol>
            <li id="fn-1">
              Proofs in the printing sense. From{" "}
              <a
                href="https://www.merriam-webster.com/dictionary/proof"
                target="_blank"
                rel="noopener noreferrer"
              >
                Merriam Webster
              </a>
              : _a copy (as of typeset text) made for examination or correction.
              <a className="footnote-backref" href="#fnref-1">
                ↩
              </a>
            </li>
          </ol>
        </div>
      </React.Fragment>
    );
  }
}

export default DictionaryEntry24Trans;
