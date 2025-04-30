/*
  Warnings:

  - You are about to alter the column `price` on the `tourpackage` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `tourpackage` MODIFY `price` INTEGER NULL;
