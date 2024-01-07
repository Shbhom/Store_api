/*
  Warnings:

  - You are about to drop the column `cartId` on the `sneaker` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sneaker" DROP CONSTRAINT "sneaker_cartId_fkey";

-- AlterTable
ALTER TABLE "sneaker" DROP COLUMN "cartId";

-- CreateTable
CREATE TABLE "cartItem" (
    "id" TEXT NOT NULL,
    "sneakerId" TEXT NOT NULL,
    "cartId" TEXT,

    CONSTRAINT "cartItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_sneakerId_fkey" FOREIGN KEY ("sneakerId") REFERENCES "sneaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
