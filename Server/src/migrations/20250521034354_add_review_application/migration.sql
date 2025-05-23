/*
  Warnings:

  - Added the required column `applicationReview` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "deadline" SET DEFAULT (NOW() + INTERVAL '10 days');

-- AlterTable
ALTER TABLE "Review" ADD COLUMN "applicationReview" TEXT NOT NULL DEFAULT '';

