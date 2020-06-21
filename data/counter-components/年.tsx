// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn build-data` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import * as React from "react";
import { MarkdownComponentProps } from "@jyosuushi/interfaces";

export class Disambiguation歳 extends React.PureComponent<
  MarkdownComponentProps
> {
  public render(): React.ReactNode {
    return (
      <p>
        While both words mean "year,"{" "}
        <ruby>
          歳<rp>(</rp>
          <rt>さい</rt>
          <rp>)</rp>
        </ruby>{" "}
        as a counter is used specifically to express a living being's age in
        years while{" "}
        <ruby>
          年<rp>(</rp>
          <rt>ねん</rt>
          <rp>)</rp>
        </ruby>{" "}
        is the counter for years themselves.
      </p>
    );
  }
}
