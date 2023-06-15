/*
  Warnings:

  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `chats` DROP FOREIGN KEY `chats_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_chat_id_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
