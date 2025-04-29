/*
  Warnings:

  - You are about to drop the column `writerId` on the `article` table. All the data in the column will be lost.
  - Added the required column `writer` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `Article_writerId_fkey`;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `writerId`,
    ADD COLUMN `writer` VARCHAR(191) NOT NULL;
