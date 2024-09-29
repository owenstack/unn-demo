/*
  Warnings:

  - Added the required column `fullName` to the `Admins` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "Admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Admins" ("email", "hashedPassword", "id", "roleId") SELECT "email", "hashedPassword", "id", "roleId" FROM "Admins";
DROP TABLE "Admins";
ALTER TABLE "new_Admins" RENAME TO "Admins";
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");
CREATE UNIQUE INDEX "Admins_hashedPassword_key" ON "Admins"("hashedPassword");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
