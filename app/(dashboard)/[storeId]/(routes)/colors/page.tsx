import React from "react";
import ColorsClient from "./components/client";
import { GetColorsByStoreID } from "@/lib/queries";
import { ColorColumn } from "./components/Columns";
import { format } from "date-fns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await GetColorsByStoreID(params.storeId);

  const formattedColors: ColorColumn[] = colors?.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    store: item.store,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
