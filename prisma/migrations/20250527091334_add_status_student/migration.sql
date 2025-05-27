/*
  Warnings:

  - The `status` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('PENDING', 'PASSED', 'FAILED');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "AcademyStatus" "AcademyStatus" NOT NULL DEFAULT 'ACTIVE',
DROP COLUMN "status",
ADD COLUMN     "status" "StudentStatus" NOT NULL DEFAULT 'PENDING';
