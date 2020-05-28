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
        <p>{1} Noun</p>
        <ol>
          <li>
            School. <span className="example">"Our school"</span>
          </li>
          <li>
            To look for and correct mistakes in the characters of documents.
            Proofreading.{" "}
            <span className="example">"To proofread again and again"</span>
          </li>
        </ol>
        <p>
          {2} [Suffix] Counter. Used to count the number of proofs
          <sup id="fnref-1">
            <a className="footnote-ref" href="#fn-1">
              1
            </a>
          </sup>
          . <span className="example">"First proof"</span>,{" "}
          <span className="example">"Second proof"</span>,{" "}
          <span className="example">"Third proof"</span>
        </p>
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
