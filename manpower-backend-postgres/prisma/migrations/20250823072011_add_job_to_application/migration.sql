/*
  Warnings:

  - You are about to drop the column `status` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Request` table. All the data in the column will be lost.
  - Added the required column `coverLetter` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `details` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Application" DROP COLUMN "status",
ADD COLUMN     "coverLetter" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "public"."Request" DROP COLUMN "description",
ADD COLUMN     "details" TEXT NOT NULL;
