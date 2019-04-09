import * as React from "react";

import { StudyPack } from "../../data/study-packs";
import { Counter } from "../../redux";

import MultiPageModal from "../MultiPageModal";
import PackDetails from "./PackDetails";

interface ComponentProps {
  onRequestClose: () => void;
  pack: StudyPack | null;
}

export default class PackDetailsModal extends React.PureComponent<
  ComponentProps
> {
  public render() {
    const { onRequestClose, pack } = this.props;
    return (
      <MultiPageModal
        getSubpageHeader={this.getSubpageHeader}
        isOpen={!!pack}
        mainPageHeader={pack ? pack.name : ""}
        mainPageRenderer={this.renderMainPage}
        onRequestClose={onRequestClose}
        subpageRenderer={this.renderSubpage}
      />
    );
  }

  private getSubpageHeader = (counter: Counter) => counter.name;

  private renderMainPage = (
    isActive: boolean,
    openSubpage: (data: Counter) => void
  ): React.ReactNode => {
    const { pack } = this.props;
    if (!pack) {
      return null;
    }

    return (
      <PackDetails
        enabled={isActive}
        onInvestigateCounter={openSubpage}
        pack={pack}
      />
    );
  };

  private renderSubpage = (
    isActive: boolean,
    counter: Counter
  ): React.ReactNode => {
    if (!counter) {
      return null;
    }

    return <div>{counter.kanji}</div>;
  };
}
