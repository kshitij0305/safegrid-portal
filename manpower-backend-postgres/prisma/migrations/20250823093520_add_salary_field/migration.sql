/*
  Warnings:

  - You are about to drop the column `aadharNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gstNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Request" DROP CONSTRAINT "Request_employerId_fkey";

-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "salary" INTEGER;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "aadharNumber",
DROP COLUMN "companyName",
DROP COLUMN "createdAt",
DROP COLUMN "gstNumber",
DROP COLUMN "isVerified",
DROP COLUMN "skills";

-- DropTable
DROP TABLE "public"."Request";
