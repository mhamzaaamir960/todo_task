import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    // get name, email and password from frontend
    // check name email and password are not empty
    // check already user exists
    // hash password
    // create new user
    // return a next response

    const { name, email, password, profilePicture } = await request.json();

    // check fields are not empty
    if ([name, email, password].some((field) => field?.trim() === "")) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // check user already exists
    const userExists = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        profilePicture: profilePicture,
      },
    });

    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      newUser,
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
