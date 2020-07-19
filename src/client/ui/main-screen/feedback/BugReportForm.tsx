import React, { useState } from "react";

import { useSubmitBugReportMutation } from "@jyosuushi/graphql/types.generated";

function BugReportForm(): React.ReactElement {
  // Define state
  const [message] = useState<string>("Hello world, this is from the client!");

  //
  const [reportBug, { data: loading, error }] = useSubmitBugReportMutation();

  // Handle events
  const handleSubmit = async (): Promise<void> => {
    reportBug({
      variables: {
        clientVersion: JYOSUUSHI_CURRENT_SEMVER,
        message,
        userAgent: navigator.userAgent,
      },
    });
  };

  // Render form
  return (
    <div>
      {loading ? (
        "Loading..."
      ) : error ? (
        error
      ) : (
        <button onClick={handleSubmit}>Click to test</button>
      )}
    </div>
  );
}

export default BugReportForm;
