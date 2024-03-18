import prismadb from "@/lib/prismadb";
import { GetColorByID } from "@/lib/queries";
import React from "react";
import ColorForm from "./components/ColorForm";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  const color = await GetColorByID(params.colorId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
