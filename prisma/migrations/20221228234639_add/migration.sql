/*
  Warnings:

  - You are about to drop the column `is_link` on the `messages` table. All the data in the column will be lost.
  - Added the required column `content_type` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accounts` MODIFY `refresh_token` TEXT NULL,
    MODIFY `access_token` TEXT NULL,
    MODIFY `id_token` TEXT NULL;

-- AlterTable
ALTER TABLE `chats` MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `features` MODIFY `context` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `messages` DROP COLUMN `is_link`,
    ADD COLUMN `content_type` VARCHAR(191) NOT NULL,
    MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `avatar_url` TEXT NOT NULL;
