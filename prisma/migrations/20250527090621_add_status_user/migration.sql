-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('BANNED', 'ACTIVE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
