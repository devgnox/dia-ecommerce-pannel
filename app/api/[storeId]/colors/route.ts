import {
  CreateColor,
  GetColorsByStoreID,
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
    const { name, value } = body;

    if (!name) return new NextResponse("Name is Required", { status: 400 });
    if (!params.storeId)
      return new NextResponse("Store ID is Required", { status: 400 });
    if (!value) return new NextResponse("Value is Required", { status: 400 });
    if (!userId) return new NextResponse("Unaunthenticated", { status: 401 });

    const storeByUserID = await GetStoreByStoreID(params.storeId, userId);
    if (!storeByUserID)
      return new NextResponse("Unauthorized", { status: 403 });

    const color = await CreateColor(name, value, params.storeId);

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_POST] ", error);
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

    const colors = await GetColorsByStoreID(params.storeId);

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
