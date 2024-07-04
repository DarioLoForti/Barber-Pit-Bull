/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `imageUrl`,
    ADD COLUMN `imageAdmin` VARCHAR(191) NULL;
