import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import Image from "next/image";

export type BillboardColumn = {
  id: string;
  label: string;
  image: string;
  textColor: string;
  createdAt: string;
};

export const Columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "textColor",
    header: "Label Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2 font-semibold light:text-gray-800">
        <div
          className="rounded-md w-[30px] h-[30px] border border-gray-400"
          style={{ backgroundColor: row.original.textColor }}
        />
        {row.original.textColor}
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="flex justify-start items-center">
        <div className="rounded-lg border h-[4rem] w-[12rem] mr-2">
          <Image
            width={100}
            height={100}
            className="object-cover w-full h-full rounded-lg"
            src={row.original.image}
            alt={row.original.label}
            unoptimized
          />
        </div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export default Columns;
