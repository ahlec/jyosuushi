// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn build-data` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import * as React from "react";
import { MarkdownComponentProps } from "@jyosuushi/interfaces";

export class Disambiguation冊 extends React.PureComponent<
  MarkdownComponentProps
> {
  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <p>
          Both{" "}
          <ruby>
            冊<rp>(</rp>
            <rt>さつ</rt>
            <rp>)</rp>
          </ruby>{" "}
          and{" "}
          <ruby>
            巻<rp>(</rp>
            <rt>かん</rt>
            <rp>)</rp>
          </ruby>{" "}
          can be used to count books, though their usages differ. Today,{" "}
          <ruby>
            巻<rp>(</rp>
            <rt>かん</rt>
            <rp>)</rp>
          </ruby>{" "}
          would be used primarily to count individual books within a
          continuation — be that a single story/collection split across multiple
          volumes, or a series (such as manga).
          <sup id="fnref-1">
            <a className="footnote-ref" href="#fn-1">
              1
            </a>
          </sup>{" "}
          This can be seen with phrases like 「{" "}
          <ruby>
            全７巻<rp>(</rp>
            <rt>ぜんななかん</rt>
            <rp>)</rp>
          </ruby>
          の
          <ruby>
            事典<rp>(</rp>
            <rt>じてん</rt>
            <rp>)</rp>
          </ruby>
          」(lit. seven-volume encyclopedia) or, used ordinally,{" "}
          <ruby>
            第一巻<rp>(</rp>
            <rt>だいいっかん</rt>
            <rp>)</rp>
          </ruby>{" "}
          (the first volume in a series).{" "}
          <ruby>
            巻<rp>(</rp>
            <rt>かん</rt>
            <rp>)</rp>
          </ruby>{" "}
          would therefore be limited to when you are counting things from the
          same continuation, but wouldn't be used to count things from separate
          collections.
        </p>
        <p>
          <ruby>
            冊<rp>(</rp>
            <rt>さつ</rt>
            <rp>)</rp>
          </ruby>{" "}
          meanwhile is more around counting the book itself. It can be used to
          count books from the same collection or from multiple separate
          collections. Like{" "}
          <ruby>
            巻<rp>(</rp>
            <rt>かん</rt>
            <rp>)</rp>
          </ruby>
          , it <em>can</em> be used in phrases like 「{" "}
          <ruby>
            全７冊<rp>(</rp>
            <rt>ぜんななさつ</rt>
            <rp>)</rp>
          </ruby>
          の
          <ruby>
            事典<rp>(</rp>
            <rt>じてん</rt>
            <rp>)</rp>
          </ruby>
          」, but it <em>cannot</em> be used with ordinal numbers to refer to a
          particular issue in a series.
          <sup id="fnref-2">
            <a className="footnote-ref" href="#fn-2">
              2
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
          href="http://www.st38.net/sukkiri-chigai/z0186.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          巻と冊の違い
        </a>
        :
        巻は数冊でひとまとまりになる書物のひとつずつを表すときにも使われる。例えば、「これは全１２巻の小説だ」などという時である。
        <a className="footnote-backref" href="#fnref-1">
          ↩
        </a>
      </li>
    );
  }
}

export class Footnote2 extends React.PureComponent<MarkdownComponentProps> {
  public render(): React.ReactNode {
    return (
      <li id="fn-2">
        <a
          href="http://www.st38.net/sukkiri-chigai/z0186.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          巻と冊の違い
        </a>
        :
        例えば、「これは全１２巻の小説だ」などという時である。この場合、「全１２冊」と冊を使って言うこともできる。しかし、「この本は人気シリーズ漫画の第５巻だ」のようにシリーズの何番目にあたる書籍なのか、という序数で示すときには巻を使うが、冊に置き換えて使うことはできない。
        <a className="footnote-backref" href="#fnref-2">
          ↩
        </a>
      </li>
    );
  }
}
