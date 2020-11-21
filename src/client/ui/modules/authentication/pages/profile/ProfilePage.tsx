import React, { useCallback, useState } from "react";
import { FormattedDate, FormattedMessage, defineMessages } from "react-intl";

import { AUTH_MUTATION_REFETCH_QUERIES } from "@jyosuushi/graphql/authentication";
import { useLogoutMutation } from "@jyosuushi/graphql/types.generated";

import AuthPageLayout from "@jyosuushi/ui/modules/authentication/components/AuthPageLayout";

import ChangePasswordModal from "./change-password/ChangePasswordModal";
import ProfilePageField from "./ProfilePageField";
import { ProfileData } from "./types";

import styles from "./ProfilePage.scss";

const INTL_MESSAGES = defineMessages({
  changePasswordButtonLabel: {
    defaultMessage: "Change Password",
    id: "profile-page.fields.password.open-modal-button-label",
  },
  headerDateRegistered: {
    defaultMessage: "Date Registered",
    id: "profile-page.fields.date-registered.header",
  },
  headerEmail: {
    defaultMessage: "Email",
    id: "profile-page.fields.email.header",
  },
  headerPassword: {
    defaultMessage: "Password",
    id: "profile-page.fields.password.header",
  },
  logoutButtonLabel: {
    defaultMessage: "Logout",
    id: "profile-page.logout.button-label",
  },
  pagePurpose: {
    defaultMessage: "Manage your account details and track your progress.",
    id: "profile-page.page-purpose",
  },
  pageTitle: {
    defaultMessage: "Your Profile",
    id: "profile-page.page-title",
  },
  passwordLastChangedLabel: {
    defaultMessage: "Date last changed: {date}",
    id: "profile-page.fields.password.last-changed-label",
  },
});

interface ComponentProps {
  data: ProfileData;
}

function ProfilePage({ data }: ComponentProps): React.ReactElement {
  // Define state
  const [changePasswordModal, setChangePasswordModal] = useState<
    "open" | "closed"
  >("closed");

  // Connect with GraphQL
  const [logoutMutation] = useLogoutMutation({
    refetchQueries: AUTH_MUTATION_REFETCH_QUERIES,
  });

  // Handle events
  const handleChangePasswordClick = useCallback((): void => {
    setChangePasswordModal("open");
  }, []);

  const handleRequestCloseChangePassword = useCallback((): void => {
    setChangePasswordModal("closed");
  }, []);

  const handleLogoutClick = useCallback((): void => {
    logoutMutation();
  }, [logoutMutation]);

  // Render the component that performs the verification
  return (
    <AuthPageLayout
      title={INTL_MESSAGES.pageTitle}
      purpose={INTL_MESSAGES.pagePurpose}
    >
      <div className={styles.grid}>
        <ProfilePageField header={INTL_MESSAGES.headerEmail}>
          {data.email}
        </ProfilePageField>
        <ProfilePageField header={INTL_MESSAGES.headerDateRegistered}>
          <FormattedDate value={data.dateRegistered} />
        </ProfilePageField>
        <ProfilePageField
          className={styles.doubleColumnField}
          header={INTL_MESSAGES.headerPassword}
        >
          <button onClick={handleChangePasswordClick}>
            <FormattedMessage {...INTL_MESSAGES.changePasswordButtonLabel} />
          </button>
          <span className={styles.passwordLastChangedLabel}>
            <FormattedMessage
              {...INTL_MESSAGES.passwordLastChangedLabel}
              values={{
                date: (
                  <span className={styles.passwordLastChangedDate}>
                    <FormattedDate value={data.passwordLastChanged} />
                  </span>
                ),
              }}
            />
          </span>
          {changePasswordModal === "open" && (
            <ChangePasswordModal
              onRequestClose={handleRequestCloseChangePassword}
              username={data.email}
            />
          )}
        </ProfilePageField>
      </div>
      <div className={styles.logoutButtonContainer}>
        <button className={styles.logoutButton} onClick={handleLogoutClick}>
          <FormattedMessage {...INTL_MESSAGES.logoutButtonLabel} />
        </button>
      </div>
    </AuthPageLayout>
  );
}

export default ProfilePage;
