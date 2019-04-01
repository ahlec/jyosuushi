import * as React from "react";

import "./Header.scss";

export default function Header() {
  return (
    <div className="Header">
      <ruby>
        助数詞<rt>じょすうし</rt>
      </ruby>
      を
      <ruby>
        練習<rt>れんしゅう</rt>
      </ruby>
      <div className="subheader">Let's review Japanese counters!</div>
    </div>
  );
}
