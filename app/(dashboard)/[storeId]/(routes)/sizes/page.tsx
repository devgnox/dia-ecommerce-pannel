import React from "react";
import SizesClient from "./components/client";
import { GetSizesByStoreID } from "@/lib/queries";
import { SizeColumn } from "./components/Columns";
import { format } from "date-fns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await GetSizesByStoreID(params.storeId);

  const formattedSizes: SizeColumn[] = sizes?.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    store: item.store,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
