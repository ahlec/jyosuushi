import chalk from "chalk";

import {
  AccountCreatedEmailArguments,
  EmailApi,
  ResetPasswordEmailArguments,
  SendEmailResult,
  VerifyEmailArguments,
} from "./types";

/**
 * A stub email client that prints everything to the console. This is designed
 * for local development purposes and not for production use.
 */
class ConsoleLogEmailApi implements EmailApi {
  public async sendAccountCreatedEmail(
    emailAddress: string,
    args: AccountCreatedEmailArguments
  ): Promise<SendEmailResult> {
    console.group(`📧 ${chalk.cyanBright("account created")}`);
    console.log(chalk.bold("email:"), emailAddress);
    console.log(chalk.bold("verification code:", args.verifyEmailCode));
    console.groupEnd();

    return {
      success: true,
    };
  }

  public async sendResetPasswordEmail(
    emailAddress: string,
    args: ResetPasswordEmailArguments
  ): Promise<SendEmailResult> {
    console.group(`📧 ${chalk.cyanBright("reset password")}`);
    console.log(chalk.bold("email:"), emailAddress);
    console.log(chalk.bold("first code:", args.firstCode));
    console.log(chalk.bold("second code:", args.secondCode));
    console.groupEnd();

    return {
      success: true,
    };
  }

  public async sendVerifyEmail(
    emailAddress: string,
    args: VerifyEmailArguments
  ): Promise<SendEmailResult> {
    console.group(`📧 ${chalk.cyanBright("verify email")}`);
    console.log(chalk.bold("email:"), emailAddress);
    console.log(chalk.bold("verification code:", args.code));
    console.groupEnd();

    return {
      success: true,
    };
  }
}

export default ConsoleLogEmailApi;
