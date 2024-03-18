import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import Image from "next/image";
import { Billboard } from "@prisma/client";

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  billboard: Billboard;
  createdAt: string;
};

export const Columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => (
      <div className="flex justify-start items-center">
        <div className="rounded-lg border h-[2rem]  mr-2">
          <Image
            width={100}
            height={100}
            className="object-cover  max-w-[360px] h-full rounded-lg"
            src={row.original.billboard.imageUrl}
            alt={row.original.billboardLabel}
          />
        </div>

        {row.original.billboardLabel}
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
