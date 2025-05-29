-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "delivery_location" TEXT;

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "deadline" SET DEFAULT (NOW() + INTERVAL '10 days');
