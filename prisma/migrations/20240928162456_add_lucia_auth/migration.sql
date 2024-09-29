/*
  Warnings:

  - You are about to drop the column `password` on the `Admins` table. All the data in the column will be lost.
  - Added the required column `hashedPassword` to the `Admins` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Admins" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "Admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Admins" ("email", "id", "roleId") SELECT "email", "id", "roleId" FROM "Admins";
DROP TABLE "Admins";
ALTER TABLE "new_Admins" RENAME TO "Admins";
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");
CREATE UNIQUE INDEX "Admins_hashedPassword_key" ON "Admins"("hashedPassword");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
