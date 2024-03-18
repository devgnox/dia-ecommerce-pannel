import prismadb from "@/lib/prismadb";
import { GetBillboardsByStoreID, GetCategoryByID } from "@/lib/queries";
import React from "react";
import CategoryForm from "./components/CategoryForm";

const CategoryPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const category = await GetCategoryByID(params.categoryId);

  const billboards = await GetBillboardsByStoreID(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
