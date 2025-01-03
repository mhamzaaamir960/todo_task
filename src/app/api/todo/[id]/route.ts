import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

    const {id} = await params
  try {
    const todo = await db.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found!" }, { status: 404 });
    }

    await db.todo.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Todo Deleted Successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
