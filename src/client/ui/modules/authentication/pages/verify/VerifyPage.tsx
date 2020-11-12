import React, { useCallback, useState } from "react";
import { Redirect } from "react-router-dom";

import useAuthenticationStatus, {
  AuthenticationStatus,
} from "@jyosuushi/hooks/useAuthenticationStatus";

import VerificationPerformer from "./VerificationPerformer";
import useValidatedQueryParameters from "./useValidatedQueryParameters";

function VerifyPage(): React.ReactElement {
  const authStatus = useAuthenticationStatus();
  const validatedParams = useValidatedQueryParameters();

  // Manage state
  const [redirectDestination, setRedirectDestination] = useState<
    "login" | "profile" | null
  >(null);

  // Handle events
  const handleRedirectToProfile = useCallback((): void => {
    setRedirectDestination("profile");
  }, []);

  const handleRedirectToLogin = useCallback((): void => {
    setRedirectDestination("login");
  }, []);

  // Redirect to the profile page if we're supposed to
  if (
    authStatus === AuthenticationStatus.Authenticated ||
    redirectDestination === "profile"
  ) {
    return <Redirect to="/profile" />;
  }

  // Redirect to the login screen if we have an error that requires
  // redirection
  if (!validatedParams.valid || redirectDestination === "login") {
    return <Redirect to="/login" />;
  }

  // Render the component that performs the verification
  return (
    <VerificationPerformer
      code={validatedParams.code}
      email={validatedParams.email}
      onRedirectToLogin={handleRedirectToLogin}
      onRedirectToProfile={handleRedirectToProfile}
    />
  );
}

export default VerifyPage;
