import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import Image from "next/image";
import { Color, Store } from "@prisma/client";

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  store: Store;
  createdAt: string;
};

export const Columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2 font-semibold light:text-gray-800">
        {row.original.value}{" "}
        <div
          className="h-6 w-6 rounded-full border "
          style={{ backgroundColor: row.original.value }}
        />
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
