/*
  Warnings:

  - You are about to alter the column `roleId` on the `Admins` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isAdmin` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `isDean` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `isSupervisor` on the `Role` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "Admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Admins" ("email", "id", "password", "roleId", "username") SELECT "email", "id", "password", "roleId", "username" FROM "Admins";
DROP TABLE "Admins";
ALTER TABLE "new_Admins" RENAME TO "Admins";
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");
CREATE UNIQUE INDEX "Admins_password_key" ON "Admins"("password");
CREATE UNIQUE INDEX "Admins_username_key" ON "Admins"("username");
CREATE TABLE "new_Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL DEFAULT 'Admin'
);
INSERT INTO "new_Role" ("id", "role") SELECT "id", "role" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
