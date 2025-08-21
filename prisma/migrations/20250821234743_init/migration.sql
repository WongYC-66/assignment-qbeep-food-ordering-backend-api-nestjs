-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Outlet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Outlet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Food" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "outlet_id" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "outlet_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderedItems" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderedItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Outlet" ADD CONSTRAINT "Outlet_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Food" ADD CONSTRAINT "Food_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "public"."Outlet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "public"."Outlet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderedItems" ADD CONSTRAINT "OrderedItems_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderedItems" ADD CONSTRAINT "OrderedItems_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "public"."Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
