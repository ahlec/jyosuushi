export interface Environment {
  /**
   * If true, cookies for authentication or other security purposes
   * will be marked with `Secure`, meaning they require HTTPS in order
   * to work. If developing or using a non-HTTPS environment, this should
   * be false in order to allow cookies to still be set. (But these
   * environments should also not be public-facing since it isn't secure).
   */
  canUseSecureCookies: boolean;
}
