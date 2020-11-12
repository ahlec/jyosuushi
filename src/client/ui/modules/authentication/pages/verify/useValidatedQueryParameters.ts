import { useMemo } from "react";
import { useLocation } from "react-router";
import { validate as validateUuid } from "uuid";

import { ValidatedQueryParameters } from "./types";

function useValidatedQueryParameters(): ValidatedQueryParameters {
  // Connect to the rest of the app
  const { search } = useLocation();

  // Parse the query string (if it exists) and pull out the unvalidated args
  const params = new URLSearchParams(search);
  const queryCode = params.get("code");
  const queryEmail = params.get("email");

  // Get a memoized response for processing all of the query parameters
  return useMemo((): ValidatedQueryParameters => {
    if (!queryCode || !queryEmail) {
      return {
        error: "missing-parameters",
        valid: false,
      };
    }

    if (!validateUuid(queryCode)) {
      return {
        error: "malformed-parameters",
        valid: false,
      };
    }

    return {
      code: queryCode,
      email: queryEmail,
      valid: true,
    };
  }, [queryCode, queryEmail]);
}

export default useValidatedQueryParameters;
