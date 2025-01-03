import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { todo } = await request.json();
    if (!todo || todo.trim() === "") {
      return NextResponse.json({ error: "Todo is empty!" }, { status: 400 });
    }

    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized request!" },
        { status: 401 }
      );
    }

    const addTodo = await db.todo.create({
      data: {
        content: todo,
        user: { connect: { id: userId } },
      },
    });

    return NextResponse.json(
      {
        message: "Todo added Successfully!",
        success: true,
        todo: addTodo,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const todos = await db.todo.findMany({
      where: {
        user: { id: userId },
      },
    });

    if (todos.length === 0) {
      return NextResponse.json({ error: "Todos not found!" }, { status: 401 });
    }

    return NextResponse.json(
      {
        message: "Todos fetched successfully!",
        todos: todos,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
