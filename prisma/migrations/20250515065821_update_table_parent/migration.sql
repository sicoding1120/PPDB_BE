/*
  Warnings:

  - You are about to drop the column `parentID` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Parent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_parentID_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "parentID";

-- DropTable
DROP TABLE "Parent";

-- CreateTable
CREATE TABLE "Father" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "job" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "status" "ParentStatus",
    "studentID" TEXT NOT NULL,

    CONSTRAINT "Father_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Mother" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "job" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "status" "ParentStatus",
    "studentID" TEXT NOT NULL,

    CONSTRAINT "Mother_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Father_studentID_key" ON "Father"("studentID");

-- CreateIndex
CREATE UNIQUE INDEX "Mother_studentID_key" ON "Mother"("studentID");

-- AddForeignKey
ALTER TABLE "Father" ADD CONSTRAINT "Father_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mother" ADD CONSTRAINT "Mother_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
