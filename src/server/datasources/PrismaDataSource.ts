import { DataSource } from "apollo-datasource";
import {
  BugReportCreateInput,
  PrismaClient,
  SuggestionCreateInput,
  User,
  ActiveUserSession,
} from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

import { EncryptedPassword } from "@server/authorization/password-encryption";

export type DatabaseUser = Omit<User, "encryptedPassword"> & {
  encryptedPassword: EncryptedPassword;
};

function castUserToDatabaseUser(user: User): DatabaseUser {
  // Use this function safely and conservatively, and never leave this file!!
  // But afaik there's no way right now to have Prisma use our opaque password
  // type.
  return (user as unknown) as DatabaseUser;
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
}
