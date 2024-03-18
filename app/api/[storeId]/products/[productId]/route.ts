import prismadb from "@/lib/prismadb";
import {
  CheckUserSession,
  DeleteProduct,
  GetProductByID,
  GetStoreByStoreID,
  UpdateProduct,
} from "@/lib/queries";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { productId: string } }
) => {
  try {
    if (!params.productId)
      return new NextResponse("Product ID is Required", { status: 400 });

    const product = await GetProductByID(params.productId);

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) => {
  try {
    const userId = await CheckUserSession();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!name) return new NextResponse("Name is Required", { status: 400 });
    if (!price) return new NextResponse("Price is Required", { status: 400 });
    if (!colorId)
      return new NextResponse("Color ID is Required", { status: 400 });
    if (!sizeId)
      return new NextResponse("Size ID is Required", { status: 400 });
    if (!categoryId)
      return new NextResponse("Category ID is Required", { status: 400 });

    if (!params.storeId)
      return new NextResponse("Store ID is Required", { status: 400 });
    if (!images || !images.length)
      return new NextResponse("Image is Required", { status: 400 });

    if (!params.productId)
      return new NextResponse("Product ID is Required", { status: 400 });
    if (!userId) return new NextResponse("Unaunthenticated", { status: 401 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const product = await UpdateProduct(params.productId, {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      isFeatured,
      isArchived,
      images,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) => {
  try {
    const userId = await CheckUserSession();

    if (!userId) return new NextResponse("Unauthenticathed", { status: 401 });
    if (!params.productId)
      return new NextResponse("Product ID is Required", { status: 400 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const product = await DeleteProduct(params.productId);

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
