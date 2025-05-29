/*
  Warnings:

  - A unique constraint covering the columns `[midtransPaymentUrl]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "midtransPaymentUrl" TEXT;

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "deadline" SET DEFAULT (NOW() + INTERVAL '10 days');

-- CreateIndex
CREATE UNIQUE INDEX "Order_midtransPaymentUrl_key" ON "Order"("midtransPaymentUrl");
