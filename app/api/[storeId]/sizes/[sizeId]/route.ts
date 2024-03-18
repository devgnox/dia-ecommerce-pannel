import {
  CheckUserSession,
  DeleteSize,
  GetSizeByID,
  GetStoreByStoreID,
  UpdateSize,
} from "@/lib/queries";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { sizeId: string } }
) => {
  try {
    if (!params.sizeId)
      return new NextResponse("Size ID is Required", { status: 400 });

    const size = await GetSizeByID(params.sizeId);

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const userId = await CheckUserSession();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) return new NextResponse("Unauthenticathed", { status: 401 });
    if (!name) return new NextResponse("Name is Required", { status: 400 });
    if (!value) return new NextResponse("Value is Required", { status: 400 });
    if (!params.sizeId)
      return new NextResponse("Size ID is Required", { status: 400 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const size = await UpdateSize(params.sizeId, {
      name: name,
      value,
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const userId = await CheckUserSession();

    if (!userId) return new NextResponse("Unauthenticathed", { status: 401 });
    if (!params.sizeId)
      return new NextResponse("Size ID is Required", { status: 400 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const size = await DeleteSize(params.sizeId);

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
