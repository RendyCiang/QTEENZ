-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "updateAcceptedAt" TIMESTAMP(3),
ADD COLUMN     "updatePickedUpAt" TIMESTAMP(3),
ADD COLUMN     "updateReadyAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "deadline" SET DEFAULT (NOW() + INTERVAL '10 days');
