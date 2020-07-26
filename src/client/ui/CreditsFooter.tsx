import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import styles from "./CreditsFooter.scss";

const INTL_MESSAGES = defineMessages({
  credits: {
    defaultMessage:
      "Application designed and coded by <alec>Alec Deitloff</alec>. Vector icons were taken from the <vectorIcons>Core - UI - Outlined</vectorIcons> collection. Sakura icon was made by <sakura>Freepik</sakura>. Small icons are part of the <silk>Silk</silk> collection.",
    id: "CreditsFooter.credits",
  },
});

function AlecsPersonalSiteLink(
  chunks: readonly React.ReactNode[]
): React.ReactElement {
  return (
    <a
      href="http://alec.deitloff.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  );
}

function VectorIconsLink(
  chunks: readonly React.ReactNode[]
): React.ReactElement {
  return (
    <a
      href="https://www.iconfinder.com/iconsets/core-ui-outlined"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  );
}

function SakuraLink(chunks: readonly React.ReactNode[]): React.ReactElement {
  return (
    <a
      href="https://www.flaticon.com/packs/chinese-new-year-12"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  );
}

function SilkLink(chunks: readonly React.ReactNode[]): React.ReactElement {
  return (
    <a
      href="http://www.famfamfam.com/lab/icons/silk/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {chunks}
    </a>
  );
}

function CreditsFooter(): React.ReactElement {
  return (
    <div className={styles.creditsFooter}>
      <FormattedMessage
        {...INTL_MESSAGES.credits}
        values={{
          alec: AlecsPersonalSiteLink,
          sakura: SakuraLink,
          silk: SilkLink,
          vectorIcons: VectorIconsLink,
        }}
      />
    </div>
  );
}

export default CreditsFooter;
