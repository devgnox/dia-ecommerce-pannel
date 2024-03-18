import React from "react";
import OrdersClient from "./components/client";
import { GetOrdersByStoreID } from "@/lib/queries";
import { OrderColumn } from "./components/Columns";
import { format } from "date-fns";
import { priceFormatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await GetOrdersByStoreID(params.storeId);

  const formattedOrders: OrderColumn[] = orders?.map((item) => ({
    id: item.id,
    customerName: item.customerName,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: priceFormatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
