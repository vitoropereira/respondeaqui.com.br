-- RenameIndex
ALTER TABLE `chats` RENAME INDEX `chats_user_id_fkey` TO `chats_user_id_idx`;

-- RenameIndex
ALTER TABLE `messages` RENAME INDEX `messages_chat_id_fkey` TO `messages_chat_id_idx`;

-- RenameIndex
ALTER TABLE `messages` RENAME INDEX `messages_user_id_fkey` TO `messages_user_id_idx`;

-- RenameIndex
ALTER TABLE `sessions` RENAME INDEX `sessions_user_id_fkey` TO `sessions_user_id_idx`;
