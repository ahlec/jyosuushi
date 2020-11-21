import React, { useMemo } from "react";
import { Redirect } from "react-router-dom";

import { useAuthenticatedProfileQueryQuery } from "@jyosuushi/graphql/types.generated";

import LoadingSpinner from "@jyosuushi/ui/components/LoadingSpinner";

import ProfilePage from "./ProfilePage";
import { ProfileData } from "./types";

import styles from "./ProfilePageWrapper.scss";

function ProfilePageWrapper(): React.ReactElement {
  const { data, loading, error } = useAuthenticatedProfileQueryQuery();

  // Coerce the GraphQL data into a memoized version of the profile data
  // object
  const profileData = useMemo((): ProfileData | null => {
    if (loading || !data || error || !data.activeUser) {
      return null;
    }

    return {
      dateRegistered: data.activeUser.dateRegistered,
      email: data.activeUser.username,
      passwordLastChanged: data.activeUser.passwordLastChanged,
    };
  }, [data, error, loading]);

  // If we're still loading, then we'll render the loading spinner while we
  // wait to resolve to authenticated/not authenticated.
  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <LoadingSpinner color="blue" />
      </div>
    );
  }

  // Redirect to the login screen if we aren't authenticated (we don't have
  // an active user)
  if (!profileData) {
    return <Redirect to="/login" />;
  }

  // Render the profile page once we've confirmed that we are authenticated.
  return <ProfilePage data={profileData} />;
}

export default ProfilePageWrapper;
