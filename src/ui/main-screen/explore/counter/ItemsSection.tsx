import * as React from "react";

import { ITEMS_FROM_COUNTER } from "../../../../../data/items";

import { Counter, Item } from "../../../../interfaces";
import Localization from "../../../../localization";

import "./ItemsSection.scss";

interface ComponentProps {
  counter: Counter;
  localization: Localization;
}

export default class ItemsSection extends React.PureComponent<ComponentProps> {
  public render() {
    const { counter, localization } = this.props;

    const items = ITEMS_FROM_COUNTER[counter.counterId];
    if (items.length <= 1) {
      // Don't show list if only one item, it will be the rule's title
      return null;
    }

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
