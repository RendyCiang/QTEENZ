-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'defaultPassword',
ALTER COLUMN "deadline" SET DEFAULT (NOW() + INTERVAL '10 days');
