import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import { Environment } from "@server/environment";

import { validateSessionById } from "./session-validation";
import { AuthorizationCookie, UserTokenValidation, UserSession } from "./types";

const COOKIE_NAME = "auth";

class ExpressAuthorizationCookie implements AuthorizationCookie {
  public static async load(
    environment: Environment,
    request: Request,
    response: Response,
    prisma: PrismaClient
  ): Promise<ExpressAuthorizationCookie> {
    const authCookieValue = request.cookies[COOKIE_NAME];
    let current: UserTokenValidation | null;
    if (authCookieValue) {
      current = await validateSessionById(authCookieValue, prisma);
    } else {
      current = null;
    }

    return new ExpressAuthorizationCookie(current, response, environment);
  }

  private constructor(
    public readonly current: UserTokenValidation | null,
    private readonly response: Response,
    private readonly environment: Environment
  ) {}

  public set(session: UserSession): void {
    this.response.cookie(COOKIE_NAME, session.sessionId, {
      httpOnly: true,
      sameSite: "strict",
      secure: this.environment.canUseSecureCookies,
    });
  }

  public delete(): void {
    this.response.clearCookie(COOKIE_NAME);
  }
}

export default ExpressAuthorizationCookie;
