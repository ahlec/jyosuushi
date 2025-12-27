import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { ITEMS_FROM_COUNTER } from "@data/items";

import useLocale from "@jyosuushi/i18n/useLocale";
import { Counter, Item } from "@jyosuushi/interfaces";

import * as styles from "./ItemsSection.scss";

export function hasItemsSectionContents(counter: Counter): boolean {
  const items = ITEMS_FROM_COUNTER[counter.counterId];
  return items.length > 1;
}

interface ComponentProps {
  counter: Counter;
}

const INTL_MESSAGES = defineMessages({
  introText: {
    defaultMessage:
      "The following {numItems, plural, one {is an example} other {are examples}} of what this is used to count:",
    id: "explorePage.counter.itemsSection.introText",
  },
});

function ItemsSection({ counter }: ComponentProps): React.ReactElement {
  // Connect to the rest of the app
  const locale = useLocale();

  // Render the component
  const items = ITEMS_FROM_COUNTER[counter.counterId];
  return (
    <section className={styles.itemsSection}>
      <FormattedMessage
        {...INTL_MESSAGES.introText}
        values={{
          numItems: items.length,
        }}
      >
        {(text) => <p className={styles.itemsPrefix}>{text}</p>}
      </FormattedMessage>
      <div className={styles.itemsList}>
        {items.map(
          (item: Item): React.ReactNode => {
            return (
              <div key={item.itemId}>
                {locale.dataLocalizers.getItemName(
                  item,
                  /**
                   * Random number, but let's try to get the unambiguously-large
                   * plural in all languages.
                   **/
                  100
                )}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}

export default ItemsSection;
