/*
  Warnings:

  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('ISLAM', 'CHRISTIAN', 'CATHOLIC', 'HINDU', 'BUDDHIST', 'CONFUCIAN');

-- CreateEnum
CREATE TYPE "AcademyStatus" AS ENUM ('ACTIVE', 'NONACTIVE');

-- CreateEnum
CREATE TYPE "OrphanStatus" AS ENUM ('NONE', 'YATIM', 'PIATU', 'YATIMPIATU');

-- CreateEnum
CREATE TYPE "ParentStatus" AS ENUM ('ALIVE', 'DEAD');

-- DropTable
DROP TABLE "student";

-- CreateTable
CREATE TABLE "Student" (
    "ID" TEXT NOT NULL,
    "NISN" TEXT NOT NULL,
    "NIK" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "major" "Major" NOT NULL,
    "dateIn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "picture_url" TEXT,
    "religion" "Religion",
    "status" "AcademyStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orphanStatus" "OrphanStatus" NOT NULL DEFAULT 'NONE',
    "parentID" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Parent" (
    "ID" TEXT NOT NULL,
    "father_name" TEXT,
    "mother_name" TEXT,
    "father_job" TEXT,
    "mother_job" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "father_status" "ParentStatus",
    "mother_status" "ParentStatus",

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Payments" (
    "ID" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_NISN_key" ON "Student"("NISN");

-- CreateIndex
CREATE UNIQUE INDEX "Student_NIK_key" ON "Student"("NIK");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "Parent"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
