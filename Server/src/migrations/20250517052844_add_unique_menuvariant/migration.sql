/*
  Warnings:

  - A unique constraint covering the columns `[menuId,name]` on the table `MenuVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "deadline" SET DEFAULT (NOW() + INTERVAL '10 days');

-- CreateIndex
CREATE UNIQUE INDEX "MenuVariant_menuId_name_key" ON "MenuVariant"("menuId", "name");
