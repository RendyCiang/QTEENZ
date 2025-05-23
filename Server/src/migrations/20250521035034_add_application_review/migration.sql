-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "deadline" SET DEFAULT (NOW() + INTERVAL '10 days');

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "applicationReview" DROP NOT NULL,
ALTER COLUMN "applicationReview" DROP DEFAULT;
