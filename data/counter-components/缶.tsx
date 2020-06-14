// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn build-data` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import * as React from "react";
import { MarkdownComponentProps } from "@jyosuushi/interfaces";

export class Disambiguation本 extends React.PureComponent<
  MarkdownComponentProps
> {
  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <p>
          本, as a counter for long and thin cylindrical objects, can be used to
          count canned goods. The counter 缶, literally meaning "tin can," can
          also be used to count canned goods. The shape of the can itself would
          need to be long and tall in order to use 本, but if that criteria is
          met, it comes down to what is inside the can. Typically, cans
          containing liquids or drinks (such as juice) would use 本 while cans
          with solid contents (such as vegetables) would use 缶.
          <sup id="fnref-1">
            <a className="footnote-ref" href="#fn-1">
              1
            </a>
          </sup>
        </p>
      </React.Fragment>
    );
  }
}

export class Footnote1 extends React.PureComponent<MarkdownComponentProps> {
  public render(): React.ReactNode {
    return (
      <li id="fn-1">
        <a
          href="https://japanknowledge.com/articles/kze/column_kaz_03.html#:~:text=%E7%BC%B6%E3%81%AE%E4%B8%AD%E8%BA%AB%E3%81%8C%E3%82%B8%E3%83%A5%E3%83%BC%E3%82%B9,%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%81%AE%E3%81%A7%E3%81%99%E3%80%82"
          target="_blank"
          rel="noopener noreferrer"
        >
          JapanKnowledge
        </a>
        :
        これは、話し手が単純に缶だけを数えているのではなく、缶の中身によって数え分けていることを示しています。缶の中身がジュースのような液体だと「本」で数えますが、中身がアスパラガスのように固体だと「個」や「缶」で数えます。また、中身の入っていない空き缶は「本」では数えず、「空き缶1個」のように数えます。
        <a className="footnote-backref" href="#fnref-1">
          ↩
        </a>
      </li>
    );
  }
}
