/*
  Warnings:

  - You are about to drop the column `endDataTime` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `endDateTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointment` DROP COLUMN `endDataTime`,
    ADD COLUMN `endDateTime` DATETIME(3) NOT NULL;
