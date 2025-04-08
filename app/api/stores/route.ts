import prismadb from "@/lib/prismadb";
import { CreateStore } from "@/lib/queries";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!name) return new NextResponse("Name is Required", { status: 400 });

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const store = await CreateStore(name, userId);
    
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
