/*
  Warnings:

  - Added the required column `authorId` to the `chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chats" ADD COLUMN     "authorId" TEXT NOT NULL;
