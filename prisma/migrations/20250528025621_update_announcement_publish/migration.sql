-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "isPublished" BOOLEAN DEFAULT false,
ADD COLUMN     "publishAt" TIMESTAMP(3);
