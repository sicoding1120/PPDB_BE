/*
  Warnings:

  - A unique constraint covering the columns `[reference]` on the table `RegistrationTransaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminFee` to the `RegistrationTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `RegistrationTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderName` to the `RegistrationTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "RegistrationTransaction" ADD COLUMN     "adminFee" INTEGER NOT NULL,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'SUCCESS',
ADD COLUMN     "reference" TEXT NOT NULL,
ADD COLUMN     "senderName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationTransaction_reference_key" ON "RegistrationTransaction"("reference");
