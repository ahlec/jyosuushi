import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import DatabaseBackedUserToken from "./DatabaseBackedUserToken";
import { AuthorizationCookie, UserToken, UserSession } from "./types";

const COOKIE_NAME = "auth";

class ExpressAuthorizationCookie implements AuthorizationCookie {
  public readonly current: UserToken | null;

  public constructor(
    request: Request,
    private response: Response,
    prisma: PrismaClient
  ) {
    const authCookieValue = request.cookies[COOKIE_NAME];
    if (authCookieValue) {
      this.current = new DatabaseBackedUserToken(authCookieValue, prisma);
    } else {
      this.current = null;
    }
  }

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
