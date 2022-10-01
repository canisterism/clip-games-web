/*
  Warnings:

  - You are about to drop the column `name` on the `game_genres` table. All the data in the column will be lost.
  - You are about to drop the column `publisher` on the `games` table. All the data in the column will be lost.
  - Added the required column `publisherId` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "game_genres_name_key";

-- AlterTable
ALTER TABLE "game_genres" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "games" DROP COLUMN "publisher",
ADD COLUMN     "publisherId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "publishers" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "publishers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "publishers_name_key" ON "publishers"("name");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "publishers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
