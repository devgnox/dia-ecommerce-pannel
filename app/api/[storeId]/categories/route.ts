import prismadb from "@/lib/prismadb";
import {
  CreateCategory,
  GetCategoriesByStoreID,
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
    const { name, billboardId } = body;

    if (!name) return new NextResponse("Name is Required", { status: 400 });
    if (!params.storeId)
      return new NextResponse("Store ID is Required", { status: 400 });
    if (!billboardId)
      return new NextResponse("Billboard ID is Required", { status: 400 });
    if (!userId) return new NextResponse("Unaunthenticated", { status: 401 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const category = await CreateCategory(name, billboardId, params.storeId);

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_POST] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse("Store ID is Required", { status: 400 });

    const categories = await GetCategoriesByStoreID(params.storeId);

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORY_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
