import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";

import useLocale from "./useLocale";

interface ComponentProps {
  children: React.ReactElement;
}

function IntlProvider({ children }: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const locale = useLocale();

  // Mount the provider and pass children through
  return (
    <ReactIntlProvider locale={locale.isoCode}>{children}</ReactIntlProvider>
  );
}

export default IntlProvider;
