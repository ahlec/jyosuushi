export type ValidatedQueryParameters =
  | {
      valid: true;
      code: string;
      email: string;
    }
  | {
      valid: false;
      error: "missing-parameters" | "malformed-parameters";
    };
