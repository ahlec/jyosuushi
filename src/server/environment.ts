import convict from "convict";
import convictFormatWithValidator from "convict-format-with-validator";
import { cosmiconfigSync } from "cosmiconfig";

export interface Environment {
  /**
   * The AWS region that should be used when interacting with AWS services.
   *
   * This will only be validated if {@link Environment.useAws} is true. If
   * that field is true and this is empty or an invalid valid, it will produce
   * a fatal error.
   */
  awsRegion: string;

  /**
   * If true, cookies for authentication or other security purposes
   * will be marked with `Secure`, meaning they require HTTPS in order
   * to work. If developing or using a non-HTTPS environment, this should
   * be false in order to allow cookies to still be set. (But these
   * environments should also not be public-facing since it isn't secure).
   */
  canUseSecureCookies: boolean;

  /**
   * An array of valid origins that should be used to configure CORS for the
   * server.
   *
   * This should be an array of values that are able to work with the `cors`
   * NPM package: {@url https://expressjs.com/en/resources/middleware/cors.html}
   */
  corsOrigins: readonly string[];

  /**
   * The email address that the server will use to send emails.
   */
  fromEmailAddress: string;

  /**
   * The port number that this server should be set up on.
   */
  serverPort: number;

  /**
   * If true, navigating to the server URL will display the Apollo Playground
   * sandbox environment that allows for viewing documentation and executing
   * arbitrary queries and mutations against the server.
   *
   * It's STRONGLY recommended to make sure that this is turned off for
   * production builds.
   */
  shouldProvidePlayground: boolean;

  /**
   * If true, emails will be sent via AWS Simple Email Service (SES). Otherwise,
   * emails will not be sent but will be logged in a local directory as files and
   * opened.
   *
   * For production, this should be expected to be true.
   */
  useAwsSimpleEmailService: boolean;

  /**
   * The base URL that the web client is being hosted from. This can be used to
   * provide links to the web client (such as in emails sent by the server that
   * link back to the web client).
   *
   * NOTE: This should not end in a `/` (it should end with the TLD and nothing
   * following). It should, however, include the protocol and any subdomain.
   */
  webClientBaseUrl: string;
}

convict.addFormats(convictFormatWithValidator);

const VALIDATOR = convict<Environment>({
  awsRegion: {
    default: "us-east-1",
    doc:
      "The AWS region that the services (such as EC2 instance or SES account) are located in.",
    format: String,
  },
  canUseSecureCookies: {
    default: false,
    doc:
      "Whether cookies set by this server can be configured with `Secure` or not (localhost cookies cannot be).",
    format: Boolean,
  },
  corsOrigins: {
    default: ["http://localhost:8080"],
    doc:
      "An array of `cors` module origins that should be considered for CORS configuration.",
    format: (value): void => {
      if (!Array.isArray(value)) {
        throw new Error("Value is expected to be an array of strings.");
      }

      if (!value.length) {
        // Empty arrays are always valid
        return;
      }

      if (value.some((el): boolean => typeof el !== "string")) {
        throw new Error("Value must be an array that only contains strings.");
      }
    },
  },
  fromEmailAddress: {
    default: "donotreply@jyosuushi.com",
    doc: "The email address that emails should be sent from.",
    format: "email",
  },
  serverPort: {
    default: 4000,
    doc:
      "The port number that the server should be accessible from/should listen on.",
    format: "port",
  },
  shouldProvidePlayground: {
    default: true,
    doc:
      "Whether navigating to the server URL should provide access to the Apollo Playground or not.",
    format: Boolean,
  },
  useAwsSimpleEmailService: {
    default: false,
    doc:
      "Whether the AWS Simple Email Service (SES) should be used to send emails or not. If false, no email will be sent.",
    format: Boolean,
  },
  webClientBaseUrl: {
    default: "http://localhost:8080",
    doc:
      "The full URL that the client corresponding to this server is accessible at. This should NOT end with a trailing slash.",
    format: "url",
  },
});

// Getting the types to line up between `cosmiconfig` and `convict` is really
// messy, so the easiest way is to (INTERNALLY ONLY) use `any`.
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function getRawConfig(): any {
  const loader = cosmiconfigSync("jyosuushi");
  const configFile = loader.search();
  if (!configFile || !configFile.config) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "Cannot run the server in production mode without an explicit cosmisconfig specification."
      );
    }

    return {};
  }

  return configFile.config;
}

export function loadEnvironment(): Environment {
  const validated = VALIDATOR.load(getRawConfig()).validate();
  return validated.getProperties();
}
