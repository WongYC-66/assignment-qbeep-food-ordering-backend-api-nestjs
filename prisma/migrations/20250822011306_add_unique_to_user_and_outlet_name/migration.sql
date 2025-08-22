/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Outlet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Outlet_name_key" ON "public"."Outlet"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");
