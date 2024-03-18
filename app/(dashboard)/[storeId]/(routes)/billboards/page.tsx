import React from "react";
import BillboardsClient from "./components/client";
import { GetBillboardsByStoreID } from "@/lib/queries";
import { BillboardColumn } from "./components/Columns";
import { format } from "date-fns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await GetBillboardsByStoreID(params.storeId);

  const formattedBillboards: BillboardColumn[] = billboards?.map((item) => ({
    id: item.id,
    label: item.label,
    image: item.imageUrl,
    textColor: item.textColor,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
