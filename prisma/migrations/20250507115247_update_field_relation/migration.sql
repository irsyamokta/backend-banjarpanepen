/*
  Warnings:

  - You are about to drop the column `image` on the `image` table. All the data in the column will be lost.
  - Added the required column `referenceId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `image`,
    ADD COLUMN `referenceId` VARCHAR(191) NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Image_referenceId_idx` ON `Image`(`referenceId`);

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_referenceId_fkey` FOREIGN KEY (`referenceId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
