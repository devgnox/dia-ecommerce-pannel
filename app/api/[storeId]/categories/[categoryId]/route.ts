import prismadb from "@/lib/prismadb";
import {
  CheckUserSession,
  DeleteCategory,
  GetCategoryByID,
  GetStoreByStoreID,
  UpdateCategory,
} from "@/lib/queries";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { categoryId: string } }
) => {
  try {
    if (!params.categoryId)
      return new NextResponse("Category ID is Required", { status: 400 });

    const category = await GetCategoryByID(params.categoryId);

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const userId = await CheckUserSession();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) return new NextResponse("Unauthenticathed", { status: 401 });
    if (!name) return new NextResponse("Name is Required", { status: 400 });
    if (!billboardId)
      return new NextResponse("Billboard ID is Required", { status: 400 });
    if (!params.categoryId)
      return new NextResponse("Category ID is Required", { status: 400 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const category = await UpdateCategory(params.categoryId, {
      name: name,
      billboardId,
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const userId = await CheckUserSession();

    if (!userId) return new NextResponse("Unauthenticathed", { status: 401 });
    if (!params.categoryId)
      return new NextResponse("Category ID is Required", { status: 400 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const category = await DeleteCategory(params.categoryId);

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
