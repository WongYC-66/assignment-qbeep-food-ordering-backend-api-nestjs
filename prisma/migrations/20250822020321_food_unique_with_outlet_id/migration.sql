/*
  Warnings:

  - A unique constraint covering the columns `[outlet_id,name]` on the table `Food` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Food_outlet_id_name_key" ON "public"."Food"("outlet_id", "name");
