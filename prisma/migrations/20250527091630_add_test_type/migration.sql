-- CreateEnum
CREATE TYPE "TestType" AS ENUM ('ONLINE', 'OFFLINE');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "testType" "TestType" NOT NULL DEFAULT 'OFFLINE';
