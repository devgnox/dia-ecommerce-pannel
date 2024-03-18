import prismadb from "@/lib/prismadb";
import { CheckUserSession, DeleteStore, UpdateStore } from "@/lib/queries";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const userId = await CheckUserSession();
    const body = await req.json();

    const { name } = body;

    if (!userId) return new NextResponse("Unauthenticathed", { status: 401 });
    if (!name) return new NextResponse("Name is Required", { status: 400 });
    if (!params.storeId)
      return new NextResponse("Store ID is Required", { status: 400 });

    const store = await UpdateStore(params.storeId, userId, name);

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_PATCH] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const userId = await CheckUserSession();

    if (!userId) return new NextResponse("Unauthenticathed", { status: 401 });
    if (!params.storeId)
      return new NextResponse("Store ID is Required", { status: 400 });

    const store = await DeleteStore(params.storeId, userId);

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_DELETE] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
