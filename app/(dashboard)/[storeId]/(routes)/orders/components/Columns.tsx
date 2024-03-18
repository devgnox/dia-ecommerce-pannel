import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export type OrderColumn = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const Columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid?",
    cell: ({ row }) => (
      <div>
        <Badge
          className="font-bold w-[43px] justify-center"
          variant={row.original.isPaid === false ? "destructive" : "success"}
        >
          {row.original.isPaid ? "Yes" : "No"}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];

export default Columns;
