import React from "react";

import { useSubmitBugReportMutation } from "@jyosuushi/graphql/types.generated";

import BaseUserFeedbackForm from "./BaseUserFeedbackForm";

function BugReportForm(): React.ReactElement {
  return (
    <BaseUserFeedbackForm
      explanation="Please describe the bug that you've encountered, including what you were doing when it happened. The more details you give, the more likely we'll be able to fix it."
      mutationHook={useSubmitBugReportMutation}
      successMessage="Your bug report has been submitted."
    />
  );
}

export default BugReportForm;
