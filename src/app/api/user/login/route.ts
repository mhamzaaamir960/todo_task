import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // get data from frontend
    // check user exists
    // compare password
    // return a response

    const { email, password } = await request.json();

    const checkUserExists = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!checkUserExists) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    if (password !== checkUserExists.password) {
      return NextResponse.json(
        { error: "Password does not match!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Login Successfully!", success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
