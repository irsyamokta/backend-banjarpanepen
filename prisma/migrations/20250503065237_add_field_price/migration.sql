/*
  Warnings:

  - Added the required column `price` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tour` ADD COLUMN `price` INTEGER NOT NULL;
