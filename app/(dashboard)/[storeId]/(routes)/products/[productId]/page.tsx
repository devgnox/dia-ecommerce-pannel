import prismadb from "@/lib/prismadb";
import {
  GetCategoriesByStoreID,
  GetColorsByStoreID,
  GetProductByID,
  GetSizesByStoreID,
} from "@/lib/queries";
import React from "react";
import ProductForm from "./components/ProductForm";

const ProductPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  const product = await GetProductByID(params.productId);
  const categories = await GetCategoriesByStoreID(params.storeId);
  const sizes = await GetSizesByStoreID(params.storeId);
  const colors = await GetColorsByStoreID(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          sizes={sizes}
          categories={categories}
          colors={colors}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
