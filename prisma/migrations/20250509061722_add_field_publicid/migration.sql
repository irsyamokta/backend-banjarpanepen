-- AlterTable
ALTER TABLE `article` ADD COLUMN `publicId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `publicId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `gallery` ADD COLUMN `publicId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tour` ADD COLUMN `publicId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tourpackage` ADD COLUMN `publicId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `publicId` VARCHAR(191) NULL;
