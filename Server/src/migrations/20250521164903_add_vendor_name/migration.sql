/*
  Warnings:

  - Added the required column `vendor_name` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "deadline" SET DEFAULT (NOW() + INTERVAL '10 days');

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "vendor_name" TEXT NOT NULL;
