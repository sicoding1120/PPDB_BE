-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('LK', 'PR');

-- CreateEnum
CREATE TYPE "Major" AS ENUM ('TKJ', 'RPL');

-- CreateTable
CREATE TABLE "student" (
    "ID" TEXT NOT NULL,
    "NISN" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "major" "Major" NOT NULL,
    "dateIn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");
