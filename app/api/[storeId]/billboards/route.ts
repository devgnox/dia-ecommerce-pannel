import {
  CreateBillboard,
  GetAllBillboardsByStoreID,
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
    const { label, imageUrl, textColor } = body;

    if (!label) return new NextResponse("Name is Required", { status: 400 });
    if (!params.storeId)
      return new NextResponse("Store ID is Required", { status: 400 });
    if (!imageUrl)
      return new NextResponse("Image is Required", { status: 400 });
    if (!userId) return new NextResponse("Unaunthenticated", { status: 401 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const billboard = await CreateBillboard(
      label,
      imageUrl,
      textColor,
      params.storeId
    );

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_POST] ", error);
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

    const billboards = await GetAllBillboardsByStoreID(params.storeId);

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARD_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
