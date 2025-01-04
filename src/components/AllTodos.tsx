import React, { Dispatch, SetStateAction } from "react";
import { MdDelete } from "react-icons/md";
import UpdateTodoPopUp from "./UpdateTodoPopUp";
import { Todo } from "@/app/page";

function AllTodos({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}) {
  const handleDelete = async (id: string) => {
    try {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      const response = await fetch(`/api/todo/${id}`, { method: "DELETE" });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to delete the todo");
      }
    } catch (error: unknown) {
      console.log(`Error: ${error}`);
      setTodos((prevTodos: Todo[]) => [
        ...prevTodos,
        todos.find((todo: Todo) => todo.id === id)!,
      ]);
    }
  };

  const handleUpdate = async (id: string, updatedTodo: string) => {
    try {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, content: updatedTodo } : todo
        )
      );

      const response = await fetch(`/api/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Conetnt-Type": "application/json",
        },
        body: JSON.stringify({ updatedTodo }),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo!");
      }
      const data = await response.json();
      console.log(data);
    } catch (error: unknown) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div className="max-w-[400px] w-full flex flex-col justify-center items-center gap-y-5 mt-10">
      {todos.length > 0 ? (
        todos.map((todo: Todo) => (
          <div
            key={todo.id+2}
            className="w-full h-14 flex justify-between items-center bg-[#F3FBFE] border border-blue-400 rounded-xl p-2"
          >
            <p>{todo.content}</p>
            <div className="flex justify-center items-center gap-x-2">
              <UpdateTodoPopUp todo={todo} handleUpdate={handleUpdate} />
              <MdDelete
                onClick={() => handleDelete(todo.id)}
                className="text-red-500 text-2xl cursor-pointer"
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No todos available. Add a new one!</p>
      )}
    </div>
  );
}

export default AllTodos;
