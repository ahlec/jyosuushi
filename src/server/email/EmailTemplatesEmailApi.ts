import aws from "aws-sdk";
import chalk from "chalk";
import { execFileSync } from "child_process";
import EmailTemplate from "email-templates";
import isWsl from "is-wsl";
import nodemailer from "nodemailer";
import { resolve as pathResolve } from "path";

import {
  AccountCreatedEmailArguments,
  EmailApi,
  ResetPasswordEmailArguments,
  SendEmailResult,
  VerifyEmailArguments,
} from "./types";

export type EmailServiceConfiguration =
  | {
      /**
       * A development-only mode that writes all emails sent to the
       * local disk and opens them. This is powered by the `preview-email`
       * NPM module.
       *
       * NOTE: No emails are sent using this method!!
       */
      mode: "local-filesystem";
    }
  | {
      /**
       * Uses AWS Simple Email Service to send the email.
       *
       * NOTE: Using this configuration expects that `aws-sdk` has already
       * been configured. It will raise a fatal error if it has not been yet.
       */
      mode: "aws-ses";

      /**
       * An email address to use as the sendor's email address. This should be
       * a verified email address (or an email address of a verified domain)
       * that the current AWS credentials have access to.
       */
      fromEmail: string;
    };

function previewEmailUrlTransform(rawFilePath: string): string {
  let filename: string;
  if (isWsl) {
    filename = execFileSync("wslpath", ["-w", rawFilePath]);
  } else {
    filename = rawFilePath;
  }

  return `file://${filename}`;
}

interface OmniPresentLocals {
  clientUrlBase: string;
}

interface EmailTemplatesAndTheirArguments {
  "account-created": {
    email: string;
    verifyEmailCode: string;
  };
}

/**
 * A stub email client that prints everything to the console. This is designed
 * for local development purposes and not for production use.
 */
class EmailTemplatesEmailApi implements EmailApi {
  private readonly emailTemplate: EmailTemplate;
  private readonly omniPresentLocals: OmniPresentLocals;

  public constructor(config: EmailServiceConfiguration) {
    let preview:
      | (EmailTemplate.PreviewEmailOpts & {
          urlTransform: (path: string) => string;
        })
      | false;
    let send: boolean;
    let transport: EmailTemplate.NodeMailerTransportOptions | null;
    switch (config.mode) {
      case "aws-ses": {
        preview = false;
        send = true;
        transport = nodemailer.createTransport({
          SES: new aws.SES({
            apiVersion: "2010-12-01",
          }),
        });
        break;
      }
      case "local-filesystem": {
        preview = {
          dir: pathResolve(__dirname, ".preview"),
          urlTransform: previewEmailUrlTransform,
        };
        send = false;
        transport = null;
        break;
      }
    }

    this.emailTemplate = new EmailTemplate({
      message: {
        from: "donotreply@jyosuushi.com",
      },
      preview,
      send,
      transport: transport || undefined,
      views: {
        root: pathResolve(__dirname, "email-templates"),
      },
    });
    this.omniPresentLocals = {
      clientUrlBase: "https://jyosuushi.com",
    };
  }

  public sendAccountCreatedEmail(
    emailAddress: string,
    args: AccountCreatedEmailArguments
  ): Promise<SendEmailResult> {
    return this.send({
      locals: {
        ...this.omniPresentLocals,
        email: emailAddress,
        verifyEmailCode: args.verifyEmailCode,
      },
      message: {
        to: emailAddress,
      },
      template: "account-created",
    });
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

  private async send<
    TTemplate extends keyof EmailTemplatesAndTheirArguments
  >(options: {
    template: TTemplate;
    message: {
      to: string;
    };
    locals: EmailTemplatesAndTheirArguments[TTemplate] & OmniPresentLocals;
  }): Promise<SendEmailResult> {
    try {
      await this.emailTemplate.send(options);
      return {
        success: true,
      };
    } catch (e) {
      console.error("error:", e);
      return {
        success: false,
      };
    }
  }
}

export default EmailTemplatesEmailApi;
