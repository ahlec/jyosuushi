// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn db:export` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import React from "react";

export function Disambiguation冊(): React.ReactElement {
  return (
    <p>
      <ruby>
        冊<rp>(</rp>
        <rt>さつ</rt>
        <rp>)</rp>
      </ruby>{" "}
      and{" "}
      <ruby>
        部<rp>(</rp>
        <rt>ぶ</rt>
        <rp>)</rp>
      </ruby>{" "}
      can both be used to count books, but the context of when you'd use one
      over the other differentiates them.{" "}
      <ruby>
        冊<rp>(</rp>
        <rt>さつ</rt>
        <rp>)</rp>
      </ruby>{" "}
      would typically be used to count the books themselves, their physical form
      <sup id="fnref-1">
        <a className="footnote-ref" href="#fn-1">
          1
        </a>
      </sup>{" "}
      — the thing that a person buys and reads.
      <sup id="fnref-2">
        <a className="footnote-ref" href="#fn-2">
          2
        </a>
      </sup>{" "}
      This would be used to count the books on your shelves or your tables.{" "}
      <ruby>
        部<rp>(</rp>
        <rt>ぶ</rt>
        <rp>)</rp>
      </ruby>
      , meanwhile, is used more to refer to the production of the books.{" "}
      <ruby>
        部<rp>(</rp>
        <rt>ぶ</rt>
        <rp>)</rp>
      </ruby>{" "}
      is used to count the number of copies of a book that have been published
      by the publisher or the number of copies printed at a print shop.
      <sup id="fnref-3">
        <a className="footnote-ref" href="#fn-3">
          3
        </a>
      </sup>{" "}
      While this latter counter is more of an industry term, this will
      nevertheless be seen publicly when talking about the success a book has
      seen ("This book has sold over 50,000 copies").
    </p>
  );
}

export function Footnote1(): React.ReactElement {
  return (
    <li id="fn-1">
      <a
        href="https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1430706134"
        target="_blank"
        rel="noopener noreferrer"
      >
        # 本を数える単位は「冊」？「部」？
      </a>
      : 本を物体として数えるなら「冊」で、本を発行物として数えるなら「部」です。
      <a className="footnote-backref" href="#fnref-1">
        ↩
      </a>
    </li>
  );
}

export function Footnote2(): React.ReactElement {
  return (
    <li id="fn-2">
      <a
        href="http://naniga-chigauno.st042.net/z230.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        冊と部の違い
      </a>
      :
      冊とは、本の数を数える時の助数詞で、主に個人が買ったり読んだりする本の数を示す時に使う。
      <a className="footnote-backref" href="#fnref-2">
        ↩
      </a>
    </li>
  );
}

export function Footnote3(): React.ReactElement {
  return (
    <li id="fn-3">
      <a
        href="http://naniga-chigauno.st042.net/z230.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        冊と部の違い
      </a>
      :
      一方部とは、こちらも書籍、本の数を数える時の助数詞であるが、冊とは違って、主に出版社が発行した本の数や、印刷所が印刷した本の数等を表す時に使う。
      <a className="footnote-backref" href="#fnref-3">
        ↩
      </a>
    </li>
  );
}
