-- CreateTable
CREATE TABLE "BugReport" (
"id" SERIAL,
    "message" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "clientVersion" TEXT NOT NULL,
    "dateReported" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggestion" (
"id" SERIAL,
    "message" TEXT NOT NULL,
    "clientVersion" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActiveUserSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailVerificationCode" (
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateSent" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "UserPasswordResetCode" (
    "firstCode" TEXT NOT NULL,
    "secondCode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateRequested" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("firstCode","secondCode")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "encryptedPassword" TEXT NOT NULL,
    "dateRegistered" TIMESTAMP(3) NOT NULL,
    "dateLastLogin" TIMESTAMP(3),
    "hasVerifiedEmail" BOOLEAN NOT NULL DEFAULT false,
    "datePasswordLastChanged" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ActiveUserSession" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailVerificationCode" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPasswordResetCode" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
