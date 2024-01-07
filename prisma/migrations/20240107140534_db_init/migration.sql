-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sneaker" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "Brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "Gender" TEXT NOT NULL,
    "cartId" TEXT,
    "imagesUrl" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "sneaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "size_Color_Quantity" (
    "id" TEXT NOT NULL,
    "sneakerId" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "size_Color_Quantity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" TEXT NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "size_Color_Quantity_color_key" ON "size_Color_Quantity"("color");

-- AddForeignKey
ALTER TABLE "sneaker" ADD CONSTRAINT "sneaker_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "size_Color_Quantity" ADD CONSTRAINT "size_Color_Quantity_sneakerId_fkey" FOREIGN KEY ("sneakerId") REFERENCES "sneaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
