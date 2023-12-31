/*
  Warnings:

  - You are about to drop the column `crated_at` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `crated_at`,
    ADD COLUMN `created_at` VARCHAR(30) NULL;
