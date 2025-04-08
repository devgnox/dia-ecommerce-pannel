import prismadb from "@/lib/prismadb";
import {
  CheckUserSession,
  DeleteBillboard,
  GetBillboardByID,
  GetStoreByStoreID,
  UpdateBillboard,
} from "@/lib/queries";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { billboardId: string } }
) => {
  try {
    if (!params.billboardId)
      return new NextResponse("Billboard ID is Required", { status: 400 });

    const billboard = await GetBillboardByID(params.billboardId);

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const userId = await CheckUserSession();
    const body = await req.json();

    const { label, imageUrl, textColor, isPrimaryBillboard } = body;

    if (!userId) return new NextResponse("Unauthenticathed", { status: 401 });
    if (!label) return new NextResponse("Label is Required", { status: 400 });
    if (!imageUrl)
      return new NextResponse("Image is Required", { status: 400 });
    if (!params.billboardId)
      return new NextResponse("Billboard ID is Required", { status: 400 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const billboard = await UpdateBillboard(params.billboardId, {
      label,
      imageUrl,
      textColor,
      isPrimaryBillboard,
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const userId = await CheckUserSession();

    if (!userId) return new NextResponse("Unauthenticathed", { status: 401 });
    if (!params.billboardId)
      return new NextResponse("Billboard ID is Required", { status: 400 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const billboard = await DeleteBillboard(params.billboardId);

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
