-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "scoreAvg" INTEGER;

-- AlterTable
ALTER TABLE "StudentTest" ADD COLUMN     "announcementID" TEXT;

-- AddForeignKey
ALTER TABLE "StudentTest" ADD CONSTRAINT "StudentTest_announcementID_fkey" FOREIGN KEY ("announcementID") REFERENCES "Announcement"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
