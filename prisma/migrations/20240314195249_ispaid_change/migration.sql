/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `OrderAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "isPaid" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "OrderAddress_orderId_key" ON "OrderAddress"("orderId");
