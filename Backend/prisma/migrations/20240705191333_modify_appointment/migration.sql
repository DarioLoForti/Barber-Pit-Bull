/*
  Warnings:

  - Added the required column `endDataTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointment` ADD COLUMN `endDataTime` DATETIME(3) NOT NULL;
