/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "avatar_url",
ADD COLUMN     "avatarUrl" TEXT;
