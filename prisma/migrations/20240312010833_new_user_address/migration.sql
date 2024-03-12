/*
  Warnings:

  - You are about to drop the column `postalCode` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `zipCode` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "postalCode",
ADD COLUMN     "zipCode" TEXT NOT NULL;
