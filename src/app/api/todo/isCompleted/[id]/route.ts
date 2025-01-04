import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // get todo id and isCompleted from frontend
    // update todo completed
    // return a response
    const id = (await params).id;
    const { isCompleted } = await request.json();

    const isTodoCompleted = await db.todo.update({
      where: {
        id: id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(
      {
        message: "Todo updated successfully",
        isCompleted: isTodoCompleted.isCompleted,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
