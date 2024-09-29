/*
  Warnings:

  - Added the required column `email` to the `Admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Admins` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    CONSTRAINT "Admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Admins" ("id", "roleId", "username") SELECT "id", "roleId", "username" FROM "Admins";
DROP TABLE "Admins";
ALTER TABLE "new_Admins" RENAME TO "Admins";
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");
CREATE UNIQUE INDEX "Admins_password_key" ON "Admins"("password");
CREATE UNIQUE INDEX "Admins_username_key" ON "Admins"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
