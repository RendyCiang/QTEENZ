-- AlterTable
ALTER TABLE "MenuVariant" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "deadline" SET DEFAULT (NOW() + INTERVAL '10 days');
