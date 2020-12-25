// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn db:export` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import * as React from "react";
import { MarkdownComponentProps } from "@jyosuushi/interfaces";

export class CounterNotes extends React.PureComponent<MarkdownComponentProps> {
  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <p>
          As a noun,{" "}
          <ruby>
            人<rp>(</rp>
            <rt>ひと</rt>
            <rp>)</rp>
          </ruby>{" "}
          is the Japanese word for "human." When used as a nominal suffix,{" "}
          <strong>
            <ruby>
              人<rp>(</rp>
              <rt>にん</rt>
              <rp>)</rp>
            </ruby>
          </strong>{" "}
          will indicate the person who performs an action or is associated with
          some duty (for example,{" "}
          <ruby>
            商人<rp>(</rp>
            <rt>しょうにん</rt>
            <rp>)</rp>
          </ruby>{" "}
          (shopkeeper) is a combination of{" "}
          <ruby>
            商<rp>(</rp>
            <rt>しょう</rt>
            <rp>)</rp>
          </ruby>{" "}
          (store) and{" "}
          <ruby>
            人<rp>(</rp>
            <rt>にん</rt>
            <rp>)</rp>
          </ruby>
          ). Therefore, as a counter, this is <em>the</em> literal counter for
          people; it is also the most commonly-used counter for people.
        </p>
        <p>
          Unfortunately, as one of the first counters learned by beginners, it's
          also one of the first introductions to variations from the general
          pattern.{" "}
          <ruby>
            人<rp>(</rp>
            <rt>にん</rt>
            <rp>)</rp>
          </ruby>{" "}
          uses{" "}
          <ruby>
            和語<rp>(</rp>
            <rt>わご</rt>
            <rp>)</rp>
          </ruby>{" "}
          (native Japanese language) counting for both "one person" and "two
          people," and the counter (normally read as にん) is instead read as{" "}
          <strong>たり</strong>. Originally, 1-10 were all written with たり:
          みったり (3), よったり (4), いつたり (5), and so on.
          <sup id="fnref-1">
            <a className="footnote-ref" href="#fn-1">
              1
            </a>
          </sup>{" "}
          This lasted until the Meiji era,
          <sup id="fnref-2">
            <a className="footnote-ref" href="#fn-2">
              2
            </a>
          </sup>{" "}
          with many native Japanese recalling memories of their grandparents
          born in the Meiji era (1868-1912) using みったり and よったり, among
          other now-defunct{" "}
          <ruby>
            和語<rp>(</rp>
            <rt>わご</rt>
            <rp>)</rp>
          </ruby>{" "}
          words.
          <sup id="fnref-3">
            <a className="footnote-ref" href="#fn-3">
              3
            </a>
          </sup>{" "}
          However, over time these native Japanese readings were replaced by
          their{" "}
          <ruby>
            漢語<rp>(</rp>
            <rt>かんご</rt>
            <rp>)</rp>
          </ruby>{" "}
          (Chinese language) counterpart readings. Only ひとり and ふたり, which
          were both already so prevalent in the everyday Japanese, survived.
        </p>
        <p>
          To further confuse learners, "one person" is read as{" "}
          <strong>ひとり</strong> rather than the expected ひとたり. The root{" "}
          <ruby>
            和語<rp>(</rp>
            <rt>わご</rt>
            <rp>)</rp>
          </ruby>{" "}
          counter here is still read as たり. However, when speaking it can be a
          tongue-twister to say ひとたり. The sounds were simply blended
          together in order to make it easier to say when speaking.
          <sup id="fnref-4">
            <a className="footnote-ref" href="#fn-4">
              4
            </a>
          </sup>
        </p>
        <p>
          <ruby>
            人<rp>(</rp>
            <rt>にん</rt>
            <rp>)</rp>
          </ruby>{" "}
          is most often used for talking about humans. It <em>can</em> also be
          used to count non-humans humanoids (such as angels or robots) or
          animals, with the intent of humanizing them (either out of respect or
          to highlight some human-like behaviour or appearance in the animal).
          Some people will count their pets with{" "}
          <ruby>
            人<rp>(</rp>
            <rt>にん</rt>
            <rp>)</rp>
          </ruby>
          , elevating them to be equal members of the family;
          <sup id="fnref-5">
            <a className="footnote-ref" href="#fn-5">
              5
            </a>
          </sup>{" "}
          likewise, researchers working with intelligent primates like gorillas
          will count them using{" "}
          <ruby>
            人<rp>(</rp>
            <rt>にん</rt>
            <rp>)</rp>
          </ruby>{" "}
          to show respect.{" "}
        </p>
      </React.Fragment>
    );
  }
}

export class Disambiguation名 extends React.PureComponent<
  MarkdownComponentProps
> {
  public render(): React.ReactNode {
    return (
      <p>
        人 is much more commonly used in daily conversation. 名 is more polite
        than 人 and so is used in formal situations.
      </p>
    );
  }
}

export class Disambiguation匹 extends React.PureComponent<
  MarkdownComponentProps
> {
  public render(): React.ReactNode {
    return (
      <p>
        While 人 is the counter for humans and 匹 is the counter for animals,
        the line can sometimes be blurred. Non-human animals can be counted with
        人, either out of respect or love; using 人 to count an animal will
        humanize the animal. Conversely, humans can be counted with 匹 to
        emphasize animalistic behaviour; a woman counted with 匹 would carry the
        nuance of being more beast than man.
      </p>
    );
  }
}

export class Footnote1 extends React.PureComponent<MarkdownComponentProps> {
  public render(): React.ReactNode {
    return (
      <li id="fn-1">
        <a
          href="http://www.kennya.jp/kotenn/hitono-kazoekat/"
          target="_blank"
          rel="noopener noreferrer"
        >
          人の数え方，「ひとり」「ふたり」の次は？／日本書紀より
        </a>
        :
        これが，奈良時代に完成した日本最古の勅撰の正史である『日本書紀』では，読み方が違うのです。
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
          href="https://twitter.com/tsuharayasumi/status/1035012517615943680"
          target="_blank"
          rel="noopener noreferrer"
        >
          津原 泰水
        </a>
        :
        日本語に余りにも頻出するひとりふたりが残存したのみ。みたり、よたり（よったり）、いつたり（いったり）、むゆたり……で明治頃までは通じた。
        <a className="footnote-backref" href="#fnref-2">
          ↩
        </a>
      </li>
    );
  }
}

export class Footnote3 extends React.PureComponent<MarkdownComponentProps> {
  public render(): React.ReactNode {
    return (
      <li id="fn-3">
        <a
          href="https://twitter.com/nemototakako/status/1035369345864663041"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reply to 津原 泰水
        </a>
        :
        祖母(明治45年生まれ)が三人、四人のことを「みったり」「よったり」と言っていました。
        <a className="footnote-backref" href="#fnref-3">
          ↩
        </a>
      </li>
    );
  }
}

export class Footnote4 extends React.PureComponent<MarkdownComponentProps> {
  public render(): React.ReactNode {
    return (
      <li id="fn-4">
        <a
          href="https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1493388379"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chiebukuro
        </a>
        :「ひとり」が「とり」になるのを簡単に言えは言いにくいためからきた習慣。（一人はHITARIのAがOに変化、五人も「いつたり」でなく「いくたり」と変化しています。）
        <a className="footnote-backref" href="#fnref-4">
          ↩
        </a>
      </li>
    );
  }
}

export class Footnote5 extends React.PureComponent<MarkdownComponentProps> {
  public render(): React.ReactNode {
    return (
      <li id="fn-5">
        <a
          href="http://www.town.yabuki.fukushima.jp/page/page003590.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          矢吹町の公式サイト
        </a>
        :
        また、ペットの数え方ですが、ペットは、家族のように大切なことから「犬一匹」、「猫一匹」とは言わず、例えば年賀状などに「新しい家族が一人増えました」と、「人」を使い、人間と同じ扱いをしていることもある。同様に、チンパンジー・ゴリラでも、研究者たちは往々にして「彼」、「彼女」と表現し、人間同様に「一人、二人」と数えられている。
        <a className="footnote-backref" href="#fnref-5">
          ↩
        </a>
      </li>
    );
  }
}
