/*
  Warnings:

  - A unique constraint covering the columns `[documentID]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "documentID" TEXT;

-- CreateTable
CREATE TABLE "Document" (
    "ID" TEXT NOT NULL,
    "fatherKTP_url" TEXT,
    "motherKTP_url" TEXT,
    "familyCard_url" TEXT,
    "Akte_url" TEXT,
    "Ijazah_url" TEXT,
    "studentPicture_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "clientSurvey" (
    "ID" TEXT NOT NULL,
    "name" TEXT,
    "Major" "Major" NOT NULL,
    "message" TEXT,
    "photoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientSurvey_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_documentID_key" ON "Student"("documentID");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_documentID_fkey" FOREIGN KEY ("documentID") REFERENCES "Document"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
