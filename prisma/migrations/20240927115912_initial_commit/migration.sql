-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "RRR" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "paidAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    CONSTRAINT "Admins_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL DEFAULT 'Admin',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isDean" BOOLEAN NOT NULL DEFAULT false,
    "isSupervisor" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_RRR_key" ON "Student"("RRR");

-- CreateIndex
CREATE UNIQUE INDEX "Student_invoiceId_key" ON "Student"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_username_key" ON "Admins"("username");
