export interface SendEmailResult {
  success: boolean;
}

export interface AccountCreatedEmailArguments {
  verifyEmailCode: string;
}

export interface ResetPasswordEmailArguments {
  firstCode: string;
  secondCode: string;
}

export interface VerifyEmailArguments {
  code: string;
}

export interface EmailApi {
  sendAccountCreatedEmail(
    emailAddress: string,
    args: AccountCreatedEmailArguments
  ): Promise<SendEmailResult>;

  sendResetPasswordEmail(
    emailAddress: string,
    args: ResetPasswordEmailArguments
  ): Promise<SendEmailResult>;

  sendVerifyEmail(
    emailAddress: string,
    args: VerifyEmailArguments
  ): Promise<SendEmailResult>;
}
