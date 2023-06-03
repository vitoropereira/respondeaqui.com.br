-- AlterTable
ALTER TABLE `users` ADD COLUMN `emailVerified` DATETIME(3) NULL,
    ADD COLUMN `hashedPassword` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `avatar_url` TEXT NULL;

-- RenameIndex
ALTER TABLE `accounts` RENAME INDEX `accounts_user_id_fkey` TO `accounts_user_id_idx`;
