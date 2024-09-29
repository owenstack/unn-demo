/*
  Warnings:

  - You are about to drop the column `username` on the `Admins` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "Admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Admins" ("email", "id", "password", "roleId") SELECT "email", "id", "password", "roleId" FROM "Admins";
DROP TABLE "Admins";
ALTER TABLE "new_Admins" RENAME TO "Admins";
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");
CREATE UNIQUE INDEX "Admins_password_key" ON "Admins"("password");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
