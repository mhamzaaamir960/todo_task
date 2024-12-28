import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    // get data from frontend
    // check user exists
    // compare password
    // return a response

    const { email, password } = await request.json();

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const validUser = await bcrypt.compare(password, user.password);

    if (!validUser) {
      return NextResponse.json(
        { error: "Password does not match!" },
        { status: 404 }
      );
    }

    const tokenData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfully!",
      success: true,
    });
    
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
