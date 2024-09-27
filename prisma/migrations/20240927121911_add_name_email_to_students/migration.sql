/*
  Warnings:

  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "RRR" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "paidAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Student" ("RRR", "id", "invoiceId", "paidAt") SELECT "RRR", "id", "invoiceId", "paidAt" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
CREATE UNIQUE INDEX "Student_RRR_key" ON "Student"("RRR");
CREATE UNIQUE INDEX "Student_invoiceId_key" ON "Student"("invoiceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
