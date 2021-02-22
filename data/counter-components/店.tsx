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
      <strong>
        <CounterDisplay primaryText="店" reading="てん" />
      </strong>{" "}
      and{" "}
      <IntrasiteLink id="試合">
        <CounterDisplay primaryText="試合" reading="しあい" />
      </IntrasiteLink>
      .
    </>
  );
}
