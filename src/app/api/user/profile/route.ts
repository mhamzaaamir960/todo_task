import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
      },
    });

    if (!user) {
      return NextResponse.json({ erroe: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
