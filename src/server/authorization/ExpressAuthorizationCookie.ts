import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import { validateSessionById } from "./session-validation";
import { AuthorizationCookie, UserTokenValidation, UserSession } from "./types";

const COOKIE_NAME = "auth";

class ExpressAuthorizationCookie implements AuthorizationCookie {
  public static async load(
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

    return new ExpressAuthorizationCookie(current, response);
  }

  private constructor(
    public readonly current: UserTokenValidation | null,
    private response: Response
  ) {}

  public set(session: UserSession): void {
    this.response.cookie(COOKIE_NAME, session.sessionId, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  }

  public delete(): void {
    this.response.clearCookie(COOKIE_NAME);
  }
}

export default ExpressAuthorizationCookie;
