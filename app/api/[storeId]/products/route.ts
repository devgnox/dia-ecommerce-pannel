import prismadb from "@/lib/prismadb";
import {
  CreateProduct,
  GetAllProductsByStoreID,
  GetStoreByStoreID,
} from "@/lib/queries";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
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
    if (!userId) return new NextResponse("Unaunthenticated", { status: 401 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const product = await CreateProduct(
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      isFeatured,
      isArchived,
      params.storeId,
      images
    );

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;

    if (!params.storeId)
      return new NextResponse("Store ID is Required", { status: 400 });

    const products = await GetAllProductsByStoreID(params.storeId, {
      categoryId,
      colorId,
      sizeId,
      isFeatured,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
