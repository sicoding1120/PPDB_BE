-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "userID" TEXT;

-- CreateTable
CREATE TABLE "User" (
    "ID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "profile_url" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "refreshToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
