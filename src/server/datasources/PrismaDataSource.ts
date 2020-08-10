import { DataSource } from "apollo-datasource";
import {
  BugReportCreateInput,
  PrismaClient,
  SuggestionCreateInput,
  User,
  ActiveUserSession,
  UserPasswordResetCode,
  PrismaClientKnownRequestError,
} from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

import { EncryptedPassword } from "@server/authentication/password-encryption";

export type DatabaseUser = Omit<User, "encryptedPassword"> & {
  encryptedPassword: EncryptedPassword;
};

function castUserToDatabaseUser(user: User): DatabaseUser {
  // Use this function safely and conservatively, and never leave this file!!
  // But afaik there's no way right now to have Prisma use our opaque password
  // type.
  return (user as unknown) as DatabaseUser;
}

export type EmailVerificationRedemptionResult =
  | {
      success: true;
      user: DatabaseUser;
    }
  | {
      success: false;
      error: "email-already-verified" | "email-code-pair-not-found";
    };

export interface CreatePasswordResetResults {
  firstCode: string;
  secondCode: string;
}

export class PrismaDataSource extends DataSource {
  public constructor(private readonly client: PrismaClient) {
    super();
  }

  public async addBugReport(bugReport: BugReportCreateInput): Promise<void> {
    await this.client.bugReport.create({ data: bugReport });
  }

  public async addSuggestion(suggestion: SuggestionCreateInput): Promise<void> {
    await this.client.suggestion.create({ data: suggestion });
  }

  public async doesAccountExistForEmail(email: string): Promise<boolean> {
    const numUsers = await this.client.user.count({
      where: {
        email,
      },
    });
    return numUsers > 0;
  }

  public async getUserById(userId: string): Promise<DatabaseUser | null> {
    const raw = await this.client.user.findOne({
      where: {
        id: userId,
      },
    });
    if (!raw) {
      return null;
    }

    return castUserToDatabaseUser(raw);
  }

  public async getUserByEmail(email: string): Promise<DatabaseUser | null> {
    const raw = await this.client.user.findOne({
      where: {
        email,
      },
    });
    if (!raw) {
      return null;
    }

    return castUserToDatabaseUser(raw);
  }

  public async createUser(
    email: string,
    password: EncryptedPassword
  ): Promise<DatabaseUser> {
    const user = await this.client.user.create({
      data: {
        dateRegistered: new Date(),
        email,
        encryptedPassword: password,
        id: uuidv4(),
      },
    });
    return castUserToDatabaseUser(user);
  }

  public async startUserSession(
    userId: string,
    expiration: Date
  ): Promise<ActiveUserSession> {
    await this.client.user.update({
      data: {
        dateLastLogin: new Date(),
      },
      where: {
        id: userId,
      },
    });

    return this.client.activeUserSession.create({
      data: {
        User: {
          connect: {
            id: userId,
          },
        },
        expiration,
        id: uuidv4(),
      },
    });
  }

  public async endUserSession(sessionId: string): Promise<void> {
    await this.client.activeUserSession.delete({
      where: {
        id: sessionId,
      },
    });
  }

  public async createEmailVerificationCode(userId: string): Promise<string> {
    const { code } = await this.client.emailVerificationCode.create({
      data: {
        User: {
          connect: {
            id: userId,
          },
        },
        code: uuidv4(),
        dateSent: new Date(),
      },
    });
    return code;
  }

  public async redeemEmailVerificationCode(
    email: string,
    code: string
  ): Promise<EmailVerificationRedemptionResult> {
    const codeDatabaseEntry = await this.client.emailVerificationCode.findOne({
      where: {
        code,
      },
    });
    if (!codeDatabaseEntry) {
      return {
        error: "email-code-pair-not-found",
        success: false,
      };
    }

    const user = await this.client.user.findOne({
      where: {
        id: codeDatabaseEntry.userId,
      },
    });
    if (!user || user.email !== email) {
      return {
        error: "email-code-pair-not-found",
        success: false,
      };
    }

    if (user.hasVerifiedEmail) {
      return {
        error: "email-already-verified",
        success: false,
      };
    }

    await this.client.user.update({
      data: {
        hasVerifiedEmail: true,
      },
      where: {
        id: user.id,
      },
    });

    await this.client.emailVerificationCode.delete({
      where: {
        code,
      },
    });

    return {
      success: true,
      user: castUserToDatabaseUser(user),
    };
  }

  public async changeUserPassword(
    userId: string,
    password: EncryptedPassword
  ): Promise<void> {
    await this.client.user.update({
      data: {
        encryptedPassword: password.toString(),
      },
      where: {
        id: userId,
      },
    });
  }

  public async createPasswordResetCode(
    email: string
  ): Promise<CreatePasswordResetResults | null> {
    try {
      const entry = await this.client.userPasswordResetCode.create({
        data: {
          User: {
            connect: {
              email,
            },
          },
          dateRequested: new Date(),
          firstCode: uuidv4(),
          secondCode: uuidv4(),
        },
      });
      return {
        firstCode: entry.firstCode,
        secondCode: entry.secondCode,
      };
    } catch {
      return null;
    }
  }

  public async redeemPasswordReset(
    firstCode: string,
    secondCode: string,
    password: EncryptedPassword
  ): Promise<DatabaseUser | null> {
    let resetCode: UserPasswordResetCode;
    try {
      resetCode = await this.client.userPasswordResetCode.delete({
        where: {
          firstCode_secondCode: {
            firstCode,
            secondCode,
          },
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2016") {
        // "Record to delete does not exist."
        return null;
      }

      throw e;
    }

    const user = await this.client.user.update({
      data: {
        encryptedPassword: password,
      },
      where: {
        id: resetCode.userId,
      },
    });
    return castUserToDatabaseUser(user);
  }
}
