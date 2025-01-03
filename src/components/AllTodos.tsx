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
      const response = await fetch(`/api/todo/${id}`, { method: "DELETE" });
      console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }
  };

  const handleUpdate = (id: string, updatedTodo: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, content: updatedTodo } : todo
      )
    );
  };

  return (
    <div className="max-w-[400px] w-full flex flex-col justify-center items-center gap-y-5 mt-10">
      {todos.length > 0 ? (
        todos.map((todo: Todo) => (
          <div
            key={todo.id}
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
