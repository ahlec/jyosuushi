import React, { useMemo } from "react";

import useLocale from "@jyosuushi/i18n/useLocale";
import { Counter } from "@jyosuushi/interfaces";

import useCounterDisplay from "@jyosuushi/hooks/useCounterDisplay";
import Furigana from "@jyosuushi/ui/components/Furigana";

import PageHeader from "@jyosuushi/ui/modules/explore/components/page-header/PageHeader";
import { HeaderSubtitleEntryDefinition } from "@jyosuushi/ui/modules/explore/components/page-header/types";

interface ComponentProps {
  counter: Counter;
}

function CounterHeader({ counter }: ComponentProps): React.ReactElement {
  // Connect with the rest of the app
  const locale = useLocale();

  // Determine how to present the counter
  const counterDisplay = useCounterDisplay(counter);

  // Determine the subtitle entries
  const mainText = locale.dataLocalizers.getCounterName(counter);
  const subtitleEntries = useMemo(
    (): readonly HeaderSubtitleEntryDefinition[] => [
      {
        text: mainText,
        uniqueId: "main",
        value: "",
      },
    ],
    [mainText]
  );

  // Render the component
  return (
    <PageHeader colorTheme="pink" subtitleEntries={subtitleEntries}>
      <Furigana
        furigana={counterDisplay.furigana}
        text={counterDisplay.writing}
      />
    </PageHeader>
  );
}

export default CounterHeader;
