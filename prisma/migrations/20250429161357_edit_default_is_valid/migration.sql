-- AlterTable
ALTER TABLE `event` MODIFY `price` BIGINT NULL;

-- AlterTable
ALTER TABLE `gallery` MODIFY `caption` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `session` MODIFY `refreshToken` LONGTEXT NOT NULL,
    MODIFY `userAgent` VARCHAR(191) NULL,
    MODIFY `ipAddress` VARCHAR(191) NULL,
    MODIFY `isValid` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `user` MODIFY `isVerified` BOOLEAN NOT NULL DEFAULT false;
