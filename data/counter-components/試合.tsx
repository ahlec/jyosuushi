// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn db:export` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import React from "react";
import CounterDisplay from "@jyosuushi/ui/data-components/CounterDisplay";
import IntrasiteLink from "@jyosuushi/ui/data-components/IntrasiteLink";

export function ExternalLink0(): React.ReactElement {
  return (
    <>
      Masters thesis that focuses on the establishment of new counters, in
      particular{" "}
      <IntrasiteLink id="店">
        <CounterDisplay primaryText="店" reading="てん" />
      </IntrasiteLink>{" "}
      and{" "}
      <strong>
        <CounterDisplay primaryText="試合" reading="しあい" />
      </strong>
      .
    </>
  );
}

export function Disambiguation戦(): React.ReactElement {
  return (
    <>
      <p>
        Both{" "}
        <ruby>
          試合<rp>(</rp>
          <rt>しあい</rt>
          <rp>)</rp>
        </ruby>
        　and{" "}
        <ruby>
          戦<rp>(</rp>
          <rt>せん</rt>
          <rp>)</rp>
        </ruby>{" "}
        can be used to count sports matches/sports games. For the prototypical
        sports, such as baseball or basketball, these can be used
        interchangeably. However, some sport matches cannot be counted with{" "}
        <ruby>
          試合<rp>(</rp>
          <rt>しあい</rt>
          <rp>)</rp>
        </ruby>
        , most noteably racing competitions, board game matches (such as Go or
        Shogi), and sports where individual compete without direct opponents
        (such as figure skating).
        <sup id="fnref-1">
          <a className="footnote-ref" href="#fn-1">
            1
          </a>
        </sup>{" "}
        On the other hand,{" "}
        <ruby>
          戦<rp>(</rp>
          <rt>せん</rt>
          <rp>)</rp>
        </ruby>{" "}
        is able to be used for most games and matches, but not all; games that
        are performed without the purpose of declaring a winner/loser (such as
        exhibition matches or practice games) would use{" "}
        <ruby>
          試合<rp>(</rp>
          <rt>しあい</rt>
          <rp>)</rp>
        </ruby>{" "}
        instead.
        <sup id="fnref-2">
          <a className="footnote-ref" href="#fn-2">
            2
          </a>
        </sup>
      </p>
      <p>
        Additionally, though it does not reflect a difference in meaning between
        the two counters,{" "}
        <ruby>
          戦<rp>(</rp>
          <rt>せん</rt>
          <rp>)</rp>
        </ruby>{" "}
        is used ordinally (
        <ruby>
          第１戦<rp>(</rp>
          <rt>だいいっせん</rt>
          <rp>)</rp>
        </ruby>
        ,{" "}
        <ruby>
          ３戦目<rp>(</rp>
          <rt>さんせんめ</rt>
          <rp>)</rp>
        </ruby>
        ) significantly more than{" "}
        <ruby>
          試合<rp>(</rp>
          <rt>しあい</rt>
          <rp>)</rp>
        </ruby>
        .
        <sup id="fnref-3">
          <a className="footnote-ref" href="#fn-3">
            3
          </a>
        </sup>
      </p>
    </>
  );
}

export function Footnote1(): React.ReactElement {
  return (
    <li id="fn-1">
      <a
        href="http://hdl.handle.net/2241/00128666"
        target="_blank"
        rel="noopener noreferrer"
      >
        近現代日本語における新たな助数詞の成立と定着
      </a>
      :
      「-試合」は〚囲碁・将棋〛（「対局」）や〚相撲〛（「取組」）、〚競馬〛〚F1〛（「レース」）など、その勝負を「試合」以外の名詞で指示する競技には用いることができない。また、「互いに相手に対して何かをする」という意味と馴染まない〚フィギュアスケート〛のような競技には用いにくい。(p.
      105)
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
        href="http://hdl.handle.net/2241/00128666"
        target="_blank"
        rel="noopener noreferrer"
      >
        近現代日本語における新たな助数詞の成立と定着
      </a>
      :
      「-戦」は、文脈上、勝敗を決することを目的としないことが含意されると用いにくくなる。(p.
      105)
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
        href="http://hdl.handle.net/2241/00128666"
        target="_blank"
        rel="noopener noreferrer"
      >
        近現代日本語における新たな助数詞の成立と定着
      </a>
      : 〔表
      5-1〕から「-試合」は数量を表す際に、「-戦」は順序を表す際によく用いられていることがわかる。しかし、このような差異は
      2
      つの助数詞の使用傾向の一端を表すものではあるが、意味的な違いを表すものではないと考えられる。
      (p. 91-92)
      <a className="footnote-backref" href="#fnref-3">
        ↩
      </a>
    </li>
  );
}
