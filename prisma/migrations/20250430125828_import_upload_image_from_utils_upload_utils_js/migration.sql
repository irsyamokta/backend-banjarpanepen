/*
  Warnings:

  - Added the required column `image` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gallery` ADD COLUMN `image` VARCHAR(191) NOT NULL;
