import bcrypt from "bcrypt";

const SALT_ROUNDS = 8;

declare const hasBeenEncrypted: unique symbol;

export type EncryptedPassword = string & {
  [hasBeenEncrypted]: true;
};

export async function encryptPassword(
  password: string
): Promise<EncryptedPassword> {
  const encrypted = await bcrypt.hash(password, SALT_ROUNDS);
  return (encrypted as unknown) as EncryptedPassword;
}
