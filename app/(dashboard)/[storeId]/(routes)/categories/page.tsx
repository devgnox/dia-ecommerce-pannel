import React from "react";
import CategoriesClient from "./components/client";
import { GetCategoriesByStoreID } from "@/lib/queries";
import { CategoryColumn } from "./components/Columns";
import { format } from "date-fns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await GetCategoriesByStoreID(params.storeId);

  const formattedCategories: CategoryColumn[] = categories?.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    billboard: item.billboard,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
