// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn db:export` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import React from "react";
import CounterDisplay from "@jyosuushi/ui/data-components/CounterDisplay";
import IntrasiteLink from "@jyosuushi/ui/data-components/IntrasiteLink";

export function CounterNotes(): React.ReactElement {
  return (
    <>
      <p>
        Found as a word under its kunyomi reading,{" "}
        <ruby>
          戦<rp>(</rp>
          <rt>いくさ</rt>
          <rp>)</rp>
        </ruby>{" "}
        as a noun means conflict, battle, and warfare. Indeed, the kanji 戦
        unambiguously points towards war and fighting when found in compound
        words. The counter{" "}
        <ruby>
          戦<rp>(</rp>
          <rt>せん</rt>
          <rp>)</rp>
        </ruby>{" "}
        does not have a dictionary entry in any major Japanese dictionaries.{" "}
        <ruby>
          一戦<rp>(</rp>
          <rt>いっせん</rt>
          <rp>)</rp>
        </ruby>{" "}
        is also not just a usage of this counter but a noun in its own right,
        meaning "a battle." It's therefore easy to see that this counter will be
        used to count battles in a war.
      </p>
      <p>
        <ruby>
          戦<rp>(</rp>
          <rt>せん</rt>
          <rp>)</rp>
        </ruby>{" "}
        is used beyond counting battles, however. This counter is also
        (frequently) used to count games and matches in sports, or competitions.
        In this usage, it is very similar{" "}
        <em>(though not entirely interchangeable)</em>, with the counter{" "}
        <IntrasiteLink id="試合">
          <CounterDisplay primaryText="試合" reading="しあい" />
        </IntrasiteLink>
        . Overall,{" "}
        <ruby>
          戦<rp>(</rp>
          <rt>せん</rt>
          <rp>)</rp>
        </ruby>{" "}
        tends to be used more frequently than{" "}
        <ruby>
          試合<rp>(</rp>
          <rt>しあい</rt>
          <rp>)</rp>
        </ruby>
        .
        <sup id="fnref-1">
          <a className="footnote-ref" href="#fn-1">
            1
          </a>
        </sup>{" "}
        There are many instances where either counter can be used
        interchangeably, but{" "}
        <ruby>
          試合<rp>(</rp>
          <rt>しあい</rt>
          <rp>)</rp>
        </ruby>{" "}
        sees more limitations in terms of <em>which</em> sports or competitions
        it can be used for, making{" "}
        <ruby>
          戦<rp>(</rp>
          <rt>せん</rt>
          <rp>)</rp>
        </ruby>{" "}
        a more broadly-applicable counter. In particular,{" "}
        <ruby>
          戦<rp>(</rp>
          <rt>せん</rt>
          <rp>)</rp>
        </ruby>
        <em>is</em> able to be used to count races (such as horse racing or auto
        racing), board-based games (such as Go or Shogi), or sporting
        competitions where participants don't directly interact but instead
        compete individually and win/lose via some proxy scoring (such as figure
        skating).
        <sup id="fnref-2">
          <a className="footnote-ref" href="#fn-2">
            2
          </a>
        </sup>{" "}
        However,{" "}
        <ruby>
          戦<rp>(</rp>
          <rt>せん</rt>
          <rp>)</rp>
        </ruby>{" "}
        is not without its own limitations. At its core the kanji 戦 talks about
        warfare and conflict, fights where the whole purpose is to win; it can't
        be used to count exhibition matches, timed matches, practices, or other
        competitions where the goal of the encounter isn't to determine a
        winner/loser.
        <sup id="fnref-3">
          <a className="footnote-ref" href="#fn-3">
            3
          </a>
        </sup>
      </p>
      <p>
        The primary nuance with this counter is centered around that need-to-win
        aspect. While it isn't the case that choosing{" "}
        <ruby>
          試合<rp>(</rp>
          <rt>しあい</rt>
          <rp>)</rp>
        </ruby>{" "}
        over{" "}
        <ruby>
          戦<rp>(</rp>
          <rt>せん</rt>
          <rp>)</rp>
        </ruby>{" "}
        automatically indicates that the matches weren't for the purpose of
        deciding who won, it <em>is</em> the case that choosing{" "}
        <ruby>
          戦<rp>(</rp>
          <rt>せん</rt>
          <rp>)</rp>
        </ruby>{" "}
        over{" "}
        <ruby>
          試合<rp>(</rp>
          <rt>しあい</rt>
          <rp>)</rp>
        </ruby>
        <em>does</em> raise the stakes and inject that the matches were about
        winning/losing.
        <sup id="fnref-4">
          <a className="footnote-ref" href="#fn-4">
            4
          </a>
        </sup>
      </p>
    </>
  );
}

export function ExternalLink0(): React.ReactElement {
  return (
    <>
      Masters thesis that focuses on the establishment of new counters, in
      particular{" "}
      <IntrasiteLink id="店">
        <CounterDisplay primaryText="店" reading="てん" />
      </IntrasiteLink>{" "}
      and{" "}
      <IntrasiteLink id="試合">
        <CounterDisplay primaryText="試合" reading="しあい" />
      </IntrasiteLink>
      . Has a lengthy comparison of{" "}
      <ruby>
        試合<rp>(</rp>
        <rt>しあい</rt>
        <rp>)</rp>
      </ruby>{" "}
      and{" "}
      <ruby>
        戦<rp>(</rp>
        <rt>せん</rt>
        <rp>)</rp>
      </ruby>{" "}
      as counters.
    </>
  );
}

export function Disambiguation試合(): React.ReactElement {
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
        <sup id="fnref-5">
          <a className="footnote-ref" href="#fn-5">
            5
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
        <sup id="fnref-6">
          <a className="footnote-ref" href="#fn-6">
            6
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
        <sup id="fnref-7">
          <a className="footnote-ref" href="#fn-7">
            7
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
      : 先にも述べたように、得られたデータは「-試合」が 3,326 例、「-戦」が
      1,742
      例であり、「-試合」の方が多く用いられている。それを基準として、比率が逆転しているもの（「-戦」の用例が「-試合」の用例よりも多いもの）を斜体で示し...
      (p. 92)
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
      「-試合」は〚囲碁・将棋〛（「対局」）や〚相撲〛（「取組」）、〚競馬〛〚F1〛（「レース」）など、その勝負を「試合」以外の名詞で指示する競技には用いることができない。また、「互いに相手に対して何かをする」という意味と馴染まない〚フィギュアスケート〛のような競技には用いにくい。(p.
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
      : 「-戦」は、文脈上、勝敗を決することを目的としないことが含意され
      ると用いにくくなる。これは、「-戦」が〚スポーツの勝負〛の数を表
      現する前から有していた〚いくさ〛の数を表現するという用法に起因
      する意味的制約である。(p. 105)
      <a className="footnote-backref" href="#fnref-3">
        ↩
      </a>
    </li>
  );
}

export function Footnote4(): React.ReactElement {
  return (
    <li id="fn-4">
      <a
        href="http://hdl.handle.net/2241/00128666"
        target="_blank"
        rel="noopener noreferrer"
      >
        近現代日本語における新たな助数詞の成立と定着
      </a>
      : (5.29a)は「エンジョイグループに参
      戦する」という勝敗を問題にしないという文脈によって許容度が落ちているこ
      とが(5.29b)との対比からわかる。(p. 100)
      <a className="footnote-backref" href="#fnref-4">
        ↩
      </a>
    </li>
  );
}

export function Footnote5(): React.ReactElement {
  return (
    <li id="fn-5">
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
      <a className="footnote-backref" href="#fnref-5">
        ↩
      </a>
    </li>
  );
}

export function Footnote6(): React.ReactElement {
  return (
    <li id="fn-6">
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
      <a className="footnote-backref" href="#fnref-6">
        ↩
      </a>
    </li>
  );
}

export function Footnote7(): React.ReactElement {
  return (
    <li id="fn-7">
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
      <a className="footnote-backref" href="#fnref-7">
        ↩
      </a>
    </li>
  );
}
