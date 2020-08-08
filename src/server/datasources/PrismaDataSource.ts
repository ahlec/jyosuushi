import { DataSource } from "apollo-datasource";
import {
  BugReportCreateInput,
  PrismaClient,
  SuggestionCreateInput,
  User,
} from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

import { EncryptedPassword } from "@server/authorization/password-encryption";

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

  public async getUserById(userId: string): Promise<User | null> {
    return this.client.user.findOne({
      where: {
        id: userId,
      },
    });
  }

  public async createUser(
    email: string,
    password: EncryptedPassword
  ): Promise<User> {
    return this.client.user.create({
      data: {
        dateRegistered: new Date(),
        email,
        encryptedPassword: password,
        id: uuidv4(),
      },
    });
  }
}
