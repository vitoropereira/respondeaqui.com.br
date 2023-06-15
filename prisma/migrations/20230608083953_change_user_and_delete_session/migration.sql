/*
  Warnings:

  - You are about to drop the column `provider_account_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerAccountId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `accounts_provider_provider_account_id_key` ON `accounts`;

-- DropIndex
DROP INDEX `accounts_user_id_idx` ON `accounts`;

-- AlterTable
ALTER TABLE `accounts` DROP COLUMN `provider_account_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `providerAccountId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `avatar_url`,
    ADD COLUMN `image` TEXT NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT,
    MODIFY `name` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `sessions`;

-- CreateIndex
CREATE INDEX `accounts_userId_idx` ON `accounts`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `accounts_provider_providerAccountId_key` ON `accounts`(`provider`, `providerAccountId`);
