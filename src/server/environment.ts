import convict from "convict";
import convictFormatWithValidator from "convict-format-with-validator";
import { cosmiconfigSync } from "cosmiconfig";
import { existsSync } from "fs";

interface HttpServerConfiguration {
  protocol: "http";

  /**
   * The port number that the server should listen on.
   */
  portNumber: number;
}

interface HttpsServerConfiguration {
  protocol: "https";

  /**
   * The port number that the server should listen on.
   */
  portNumber: number;

  /**
   * The file on the local filesystem that holds the contents of the
   * private key. This should be readable by this process, so that the
   * private key can be read in and used for signing the server responses.
   *
   * This file should be in PEM format.
   */
  privateKeyFile: string;

  /**
   * The file on the local filesystem that holds the contents of the
   * certificate. This should be readable by this process, so that the
   * certificate can be read in and used for signing the server responses.
   *
   * This file should be in PEM format.
   */
  certificateFile: string;

  /**
   * The file on the local filesystem that holds the CA certificate for the
   * authority certifying the certificate. This should be readable by this
   * process, so that the CA can be read in and used for signing the server
   * responses.
   *
   * This file should be in PEM format.
   */
  caFile: string;
}

export type ServerConfig = HttpServerConfiguration | HttpsServerConfiguration;

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
   * The config object for the kind of server that should be used to back HTTP
   * requests.
   */
  serverConfig: ServerConfig;

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

convict.addFormat({
  name: "filepath",
  validate: (value): void => {
    if (typeof value !== "string") {
      throw new Error("Value must be a string.");
    }

    if (!value) {
      throw new Error("Value cannot be empty.");
    }

    if (!existsSync(value)) {
      throw new Error("Value is not a path to an existing file.");
    }
  },
});

const HTTP_SERVER_CONFIG_VALIDATOR = convict<HttpServerConfiguration>({
  portNumber: {
    default: 4000,
    doc: "The port number that this HTTP server should listen on.",
    format: "port",
  },
  protocol: {
    default: "http",
    doc: "<Discriminated union field>",
    format: (value): void => {
      if (value !== "http") {
        throw new Error(
          `Hardcoded discriminated union field not met with value '${value}'`
        );
      }
    },
  },
});

const HTTPS_SERVER_CONFIG_VALIDATOR = convict<HttpsServerConfiguration>({
  caFile: {
    default: null,
    doc: "The filename for the PEM-format CA file for the SSL certificate.",
    format: "filepath",
    sensitive: true,
  },
  certificateFile: {
    default: null,
    doc:
      "The filename for th PEM-format certificate file for the SSL certificate.",
    format: "filepath",
    sensitive: true,
  },
  portNumber: {
    default: 4000,
    doc: "The port number that this HTTPS server should listen on.",
    format: "port",
  },
  privateKeyFile: {
    default: null,
    doc: "The filename for the PEM private key file for the SSL certificate.",
    format: "filepath",
    sensitive: true,
  },
  protocol: {
    default: "https",
    doc: "<Discriminated union field>",
    format: (value): void => {
      if (value !== "https") {
        throw new Error(
          `Hardcoded discriminated union field not met with value '${value}'`
        );
      }
    },
  },
});

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
  serverConfig: {
    default: {
      portNumber: 4000,
      protocol: "http",
    },
    doc:
      "The config object for the HTTP or HTTPS server created to listen and respond to requests.",
    format: (value): void => {
      if (typeof value !== "object" || !value) {
        throw new Error("Value must be an object.");
      }

      switch (value["protocol"]) {
        case "http": {
          HTTP_SERVER_CONFIG_VALIDATOR.load(value).validate();
          break;
        }
        case "https": {
          HTTPS_SERVER_CONFIG_VALIDATOR.load(value).validate();
          break;
        }
        default: {
          throw new Error(
            `Unrecognized protocol value '${
              value["protocol"]
            } (typeof ${typeof value["protocol"]})`
          );
        }
      }
    },
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
