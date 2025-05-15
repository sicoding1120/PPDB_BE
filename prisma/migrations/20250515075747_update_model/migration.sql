/*
  Warnings:

  - Added the required column `dateOfBirth` to the `Father` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education` to the `Father` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeOfBirth` to the `Father` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Father` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Mother` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education` to the `Mother` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeOfBirth` to the `Mother` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Mother` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A', 'B', 'AB', 'O');

-- AlterTable
ALTER TABLE "Father" ADD COLUMN     "citizenship" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "education" TEXT NOT NULL,
ADD COLUMN     "placeOfBirth" TEXT NOT NULL,
ADD COLUMN     "religion" "Religion",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Mother" ADD COLUMN     "citizenship" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "education" TEXT NOT NULL,
ADD COLUMN     "placeOfBirth" TEXT NOT NULL,
ADD COLUMN     "religion" "Religion",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "Brothers" INTEGER,
ADD COLUMN     "blood_type" "BloodType",
ADD COLUMN     "child_number" INTEGER,
ADD COLUMN     "citizenship" TEXT,
ADD COLUMN     "from_school" TEXT NOT NULL DEFAULT '';
