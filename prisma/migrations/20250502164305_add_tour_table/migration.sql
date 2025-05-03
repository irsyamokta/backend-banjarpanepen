-- CreateTable
CREATE TABLE `Tour` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `about` LONGTEXT NOT NULL,
    `operational` VARCHAR(191) NOT NULL,
    `start` VARCHAR(191) NULL,
    `end` VARCHAR(191) NULL,
    `facility` VARCHAR(191) NOT NULL,
    `maps` VARCHAR(191) NULL,
    `thumbnail` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
