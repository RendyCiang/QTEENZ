/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `MenuVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "MenuVariant" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "deadline" SET DEFAULT (NOW() + INTERVAL '10 days');
