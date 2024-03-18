import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import Image from "next/image";

export type ProductColumn = {
  id: string;
  name: string;
  isFeatured: boolean;
  isArchived: boolean;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
  image: string;
};

export const Columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="flex justify-start items-center">
        <div className="rounded-lg h-[3rem] w-[3rem] mr-2">
          <Image
            width={100}
            height={100}
            className="object-cover w-[42px] h-[42px] rounded-lg"
            src={row.original.image}
            alt={row.original.name}
            unoptimized
          />
        </div>
      </div>
    ),
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => (row.original.isArchived == true ? "Yes" : "No"),
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => (row.original.isFeatured == true ? "Yes" : "No"),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => row.original.price,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category,
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => row.original.size,
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2 font-semibold light:text-gray-800">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border "
          style={{ backgroundColor: row.original.color }}
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
