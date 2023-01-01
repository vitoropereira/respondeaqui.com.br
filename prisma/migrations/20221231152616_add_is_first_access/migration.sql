/*
  Warnings:

  - You are about to drop the `features` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `features` DROP FOREIGN KEY `features_user_id_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `isFirstAccess` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `features`;
