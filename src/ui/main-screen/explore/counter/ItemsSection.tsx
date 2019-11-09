import * as React from "react";

import { ITEMS_FROM_COUNTER } from "@data/items";

import { Counter, Item } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";

import "./ItemsSection.scss";

export function hasItemsSectionContents(counter: Counter): boolean {
  const items = ITEMS_FROM_COUNTER[counter.counterId];
  return items.length > 1;
}

interface ComponentProps {
  counter: Counter;
  localization: Localization;
}

export default class ItemsSection extends React.PureComponent<ComponentProps> {
  public render() {
    const { counter, localization } = this.props;

    if (!hasItemsSectionContents(counter)) {
      return null;
    }

    const items = ITEMS_FROM_COUNTER[counter.counterId];
    return (
      <section className="ItemsSection">
        <p className="items-prefix">
          {localization.counterItemsPrefix(items.length)}
        </p>
        <div className="items-list">{items.map(this.renderItem)}</div>
      </section>
    );
  }

  private renderItem = (item: Item) => {
    const { localization } = this.props;
    return <div key={item.itemId}>{localization.itemPlural(item)}</div>;
  };
}
