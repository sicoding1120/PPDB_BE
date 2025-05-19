/*
  Warnings:

  - You are about to drop the `Payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "GraduationStatus" AS ENUM ('PASSED', 'FAILED', 'PENDING');

-- CreateEnum
CREATE TYPE "StatusNotification" AS ENUM ('REJECTED', 'ACCEPTED', 'PENDING', 'VERIFIED', 'UNVERIFIED', 'INFORMATION');

-- DropTable
DROP TABLE "Payments";

-- CreateTable
CREATE TABLE "RegistrationTransaction" (
    "ID" TEXT NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "studentID" TEXT NOT NULL,

    CONSTRAINT "RegistrationTransaction_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Result" (
    "ID" TEXT NOT NULL,
    "math" INTEGER,
    "english" INTEGER,
    "islamic" INTEGER,
    "logic" INTEGER,
    "average" DOUBLE PRECISION,
    "isPassed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentID" TEXT NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "ID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "GraduationStatus" NOT NULL DEFAULT 'PENDING',
    "announcementDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentID" TEXT NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Notification" (
    "ID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "status" "StatusNotification" NOT NULL,
    "studentID" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Result_studentID_key" ON "Result"("studentID");

-- CreateIndex
CREATE UNIQUE INDEX "Announcement_studentID_key" ON "Announcement"("studentID");

-- AddForeignKey
ALTER TABLE "RegistrationTransaction" ADD CONSTRAINT "RegistrationTransaction_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
