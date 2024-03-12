/*
  Warnings:

  - Made the column `address2` on table `UserAddress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserAddress" ALTER COLUMN "address2" SET NOT NULL;
