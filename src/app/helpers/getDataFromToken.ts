import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  const token: string = request.cookies.get("token")?.value || "";
  let decodedToken: string | JwtPayload;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
    console.log(decodedToken);
    if (!decodedToken || typeof decodedToken === "string") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return decodedToken.id;
  } catch (error: unknown) {
    throw new Error(`"Something went wrong!": ${error}`);
  }
};
