import { DataSource } from "apollo-datasource";
import { BugReportCreateInput, PrismaClient } from "@prisma/client";

export class PrismaDataSource extends DataSource {
  public constructor(private readonly client: PrismaClient) {
    super();
  }

  public async addBugReport(bugReport: BugReportCreateInput): Promise<void> {
    await this.client.bugReport.create({ data: bugReport });
  }
}
