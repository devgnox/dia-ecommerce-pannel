import {
  CheckUserSession,
  DeleteColor,
  GetColorByID,
  GetStoreByStoreID,
  UpdateColor,
} from "@/lib/queries";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { colorId: string } }
) => {
  try {
    if (!params.colorId)
      return new NextResponse("Color ID is Required", { status: 400 });

    const color = await GetColorByID(params.colorId);

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) => {
  try {
    const userId = await CheckUserSession();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) return new NextResponse("Unauthenticathed", { status: 401 });
    if (!name) return new NextResponse("Name is Required", { status: 400 });
    if (!value) return new NextResponse("Value is Required", { status: 400 });
    if (!params.colorId)
      return new NextResponse("Color ID is Required", { status: 400 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const color = await UpdateColor(params.colorId, {
      name: name,
      value,
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) => {
  try {
    const userId = await CheckUserSession();

    if (!userId) return new NextResponse("Unauthenticathed", { status: 401 });
    if (!params.colorId)
      return new NextResponse("Color ID is Required", { status: 400 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const color = await DeleteColor(params.colorId);

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
