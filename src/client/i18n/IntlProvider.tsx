import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";

import useLocale from "./useLocale";
import { Locale } from "./types";

import translationsEn from "./translations/en.json";

interface ComponentProps {
  children: React.ReactElement;
}

function getTranslationsFile(locale: Locale) {
  switch (locale.translationsFile) {
    case "en.json": {
      return translationsEn;
    }
  }
}

function IntlProvider({ children }: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const locale = useLocale();

  // Mount the provider and pass children through
  return (
    <ReactIntlProvider
      locale={locale.isoCode}
      messages={getTranslationsFile(locale)}
    >
      {children}
    </ReactIntlProvider>
  );
}

export default IntlProvider;
