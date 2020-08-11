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
   * If true, AWS will be loaded and configured and various pieces that make
   * use of AWS services can be enabled (by other environment flags).
   *
   * Simply having this set to true will not enable usage of any other service
   * (eg SES). However, this must be true in order for those other fields to be
   * true.
   *
   * If this is false, aws-sdk will not be loaded and configured. If this is true,
   * it will be loaded and configured, and will produce a fatal error if the
   * configuration failed.
   */
  useAws: boolean;

  /**
   * If true, emails will be sent via AWS Simple Email Service (SES).
   *
   * This property requires {@link Environment.useAws} to be true; it is a fatal
   * error for this to true with the other property being false.
   */
  useAwsSimpleEmailService: boolean;
}
