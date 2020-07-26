import { memoize } from "lodash";
import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { STUDY_PACKS } from "@data/studyPacks";
import { StudyPack } from "@jyosuushi/interfaces";

import PackToggleButton from "./PackToggleButton";

import styles from "./PackSelection.scss";

interface ComponentProps {
  onSelectionChanged: (selection: ReadonlyArray<StudyPack>) => void;
  selection: ReadonlyArray<StudyPack>;
}

function comparePacks(a: StudyPack, b: StudyPack): number {
  return a.packId.localeCompare(b.packId);
}

const INTL_MESSAGES = defineMessages({
  header: {
    defaultMessage: "Study Packs",
    id: "preparePage.PackSelection.header",
  },
  subheader: {
    defaultMessage: "(select 1 or more)",
    id: "preparePage.PackSelection.subheader",
  },
});

export default class PackSelection extends React.PureComponent<ComponentProps> {
  private onTogglePack = memoize((pack: StudyPack) => (): void => {
    const { onSelectionChanged, selection } = this.props;
    const next = [...selection];

    const index = next.indexOf(pack);
    if (index >= 0) {
      next.splice(index, 1);
    } else {
      next.push(pack);
    }

    next.sort(comparePacks);
    onSelectionChanged(next);
  });

  public render(): React.ReactNode {
    return (
      <div className={styles.packSelection}>
        <div className={styles.fieldset}>
          <div className={styles.header}>
            <FormattedMessage {...INTL_MESSAGES.header} tagName="strong" />{" "}
            <FormattedMessage {...INTL_MESSAGES.subheader}>
              {(text) => <span className={styles.subheader}>{text}</span>}
            </FormattedMessage>
          </div>
          {STUDY_PACKS.map(this.renderPack)}
        </div>
      </div>
    );
  }

  private renderPack = (pack: StudyPack): React.ReactNode => {
    const { selection } = this.props;
    const enabled = selection.indexOf(pack) >= 0;
    return (
      <PackToggleButton
        key={pack.packId}
        isEnabled={enabled}
        onToggle={this.onTogglePack(pack)}
        pack={pack}
      />
    );
  };
}
