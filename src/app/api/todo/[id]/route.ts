import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // get updated todo from frontend
    // check todo exits
    // check updated todo is not empty
    // update todo
    // return a response

    const { id } = await params;
    const { updatedTodo } = await request.json();

    const todo = await db.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found!" }, { status: 404 });
    }

    const updateTodo = await db.todo.update({
      where: {
        id: id,
      },
      data: {
        content: updatedTodo,
      },
    });

    return NextResponse.json(
      {
        message: "Todo updated successfully!",
        todo: updateTodo,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
