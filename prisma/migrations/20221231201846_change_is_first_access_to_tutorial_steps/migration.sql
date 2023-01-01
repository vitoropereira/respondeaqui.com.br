/*
  Warnings:

  - You are about to drop the column `isFirstAccess` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `isFirstAccess`,
    ADD COLUMN `tutorial_steps` INTEGER NOT NULL DEFAULT 0;
