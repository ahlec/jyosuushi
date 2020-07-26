import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import useLocale from "@jyosuushi/i18n/useLocale";
import { StudyPack } from "@jyosuushi/interfaces";

import { STUDY_PACKS } from "@data/studyPacks";

import { getStudyPackLink } from "./pathing";

import styles from "./AllStudyPacks.scss";

const INTL_MESSAGES = defineMessages({
  packSize: {
    defaultMessage: "{size, plural, one {# counter} other {# counters}}",
    id: "explorePage.AllStudyPacks.studyPackSizeLabel",
  },
  pageHeader: {
    defaultMessage: "Study Packs",
    id: "explorePage.AllStudyPacks.pageHeader",
  },
});

function AllStudyPacks(): React.ReactElement {
  // Connect to the rest of the app
  const locale = useLocale();

  // Render the component
  return (
    <div className={styles.allStudyPacks}>
      <FormattedMessage {...INTL_MESSAGES.pageHeader} tagName="h3" />
      <div className={styles.list}>
        {STUDY_PACKS.map(
          (studyPack: StudyPack): React.ReactNode => {
            return (
              <Link
                key={studyPack.packId}
                className={styles.studyPackLink}
                to={getStudyPackLink(studyPack)}
              >
                <div className={styles.name}>
                  {locale.dataLocalizers.getStudyPackName(studyPack)}
                </div>
                <FormattedMessage
                  {...INTL_MESSAGES.packSize}
                  values={{
                    size: studyPack.counters.length,
                  }}
                >
                  {(text) => <div className={styles.count}>{text}</div>}
                </FormattedMessage>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}

export default AllStudyPacks;
