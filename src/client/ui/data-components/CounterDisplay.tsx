import React from "react";

import Furigana from "@jyosuushi/ui/Furigana";

interface ComponentProps {
  primaryText: string;
  reading: string;
}

function CounterDisplay({
  primaryText,
  reading,
}: ComponentProps): React.ReactElement {
  return <Furigana text={primaryText} furigana={reading} />;
}

export default CounterDisplay;
