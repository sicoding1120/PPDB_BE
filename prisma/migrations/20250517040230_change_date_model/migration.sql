/*
  Warnings:

  - You are about to drop the column `studentID` on the `Father` table. All the data in the column will be lost.
  - You are about to drop the column `studentID` on the `Mother` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Father" DROP CONSTRAINT "Father_studentID_fkey";

-- DropForeignKey
ALTER TABLE "Mother" DROP CONSTRAINT "Mother_studentID_fkey";

-- DropIndex
DROP INDEX "Father_studentID_key";

-- DropIndex
DROP INDEX "Mother_studentID_key";

-- AlterTable
ALTER TABLE "Father" DROP COLUMN "studentID";

-- AlterTable
ALTER TABLE "Mother" DROP COLUMN "studentID";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "fatherID" TEXT,
ADD COLUMN     "motherID" TEXT;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_motherID_fkey" FOREIGN KEY ("motherID") REFERENCES "Mother"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_fatherID_fkey" FOREIGN KEY ("fatherID") REFERENCES "Father"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
