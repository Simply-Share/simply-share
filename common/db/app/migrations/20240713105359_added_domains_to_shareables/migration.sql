/*
  Warnings:

  - A unique constraint covering the columns `[shareable_id]` on the table `domains` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shareable_id` to the `domains` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "domains" ADD COLUMN     "shareable_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "domains_shareable_id_key" ON "domains"("shareable_id");

-- AddForeignKey
ALTER TABLE "domains" ADD CONSTRAINT "domains_shareable_id_fkey" FOREIGN KEY ("shareable_id") REFERENCES "shareables"("shareable_id") ON DELETE RESTRICT ON UPDATE CASCADE;
