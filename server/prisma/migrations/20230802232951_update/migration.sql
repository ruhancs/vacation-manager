/*
  Warnings:

  - You are about to alter the column `job_role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- DropIndex
DROP INDEX "user_job_role_key";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "job_role" SET DATA TYPE VARCHAR(100);
