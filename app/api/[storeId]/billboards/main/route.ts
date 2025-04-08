import { GetMainBillboardByStoreID } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse("Store ID is Required", { status: 400 });

    const billboard = await GetMainBillboardByStoreID(params.storeId);

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
