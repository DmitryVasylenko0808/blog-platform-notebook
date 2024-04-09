/*
  Warnings:

  - You are about to drop the column `firstname` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `parentId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "parentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "firstname",
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
