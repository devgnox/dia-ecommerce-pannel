import prismadb from "@/lib/prismadb";
import { GetSizeByID } from "@/lib/queries";
import React from "react";
import SizeForm from "./components/SizeForm";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await GetSizeByID(params.sizeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
