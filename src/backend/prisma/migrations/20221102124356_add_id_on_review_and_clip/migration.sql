/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Clip` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Clip" ADD COLUMN     "id" TEXT NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "id" TEXT NOT NULL DEFAULT gen_random_uuid();

-- CreateIndex
CREATE UNIQUE INDEX "Clip_id_key" ON "Clip"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");
