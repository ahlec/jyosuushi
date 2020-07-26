import React from "react";
import { FormattedMessage } from "react-intl";

import styles from "./CreditsFooter.scss";

function CreditsFooter(): React.ReactElement {
  return (
    <div className={styles.creditsFooter}>
      <FormattedMessage
        id="CreditsFooter.credits"
        defaultMessage="Application designed and coded by {alec}. Vector icons were taken from the {vectorIcons} collection. Sakura icon was made by {sakura}. Small icons are part of the {silk} collection."
        values={{
          alec: (
            <a
              href="http://alec.deitloff.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage
                id="CreditsFooter.alec"
                defaultMessage="Alec Deitloff"
              />
            </a>
          ),
          sakura: (
            <a
              href="https://www.flaticon.com/packs/chinese-new-year-12"
              target="_blank"
              rel="noopener noreferrer"
            >
              Freepik
            </a>
          ),
          silk: (
            <a
              href="http://www.famfamfam.com/lab/icons/silk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Silk
            </a>
          ),
          vectorIcons: (
            <a
              href="https://www.iconfinder.com/iconsets/core-ui-outlined"
              target="_blank"
              rel="noopener noreferrer"
            >
              Core - UI - Outlined
            </a>
          ),
        }}
      />
    </div>
  );
}

export default CreditsFooter;
