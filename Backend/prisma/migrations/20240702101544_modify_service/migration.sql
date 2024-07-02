/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `service` DROP COLUMN `imageUrl`,
    ADD COLUMN `imageService` VARCHAR(191) NULL;
