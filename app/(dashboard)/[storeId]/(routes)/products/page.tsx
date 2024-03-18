import React from "react";
import ProductsClient from "./components/client";
import { GetProductsByStoreID } from "@/lib/queries";
import { ProductColumn } from "./components/Columns";
import { format } from "date-fns";
import { priceFormatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await GetProductsByStoreID(params.storeId);

  const formattedProducts: ProductColumn[] = products?.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: priceFormatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    image: item.images[0]?.url,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
