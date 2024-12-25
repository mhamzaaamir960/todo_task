import React, { Dispatch, SetStateAction } from "react";
import { MdDelete } from "react-icons/md";
import UpdateTodoPopUp from "./UpdateTodoPopUp";

function AllTodos({
  todos,
  setTodos,
}: {
  todos: string[];
  setTodos: Dispatch<SetStateAction<string[]>>;
}) {
  // Delete Handler
  const handleDelete = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, index) => index !== id));
  };

  // Update Handler
  const handleUpdate = (id: number, updatedTodo: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, index) => (index === id ? updatedTodo : todo))
    );
  };

  return (
    <div className="max-w-[400px] w-full flex flex-col justify-center items-center gap-y-5 mt-10">
      {todos.length > 0 ? (
        todos.map((todo: string, id: number) => (
          <div
            key={id}
            className="w-full h-14 flex justify-between items-center bg-[#F3FBFE] border border-blue-400 rounded-xl p-2"
          >
            <p>{todo}</p>
            <div className="flex justify-center items-center gap-x-2">
              <UpdateTodoPopUp
                todo={todo}
                id={id}
                handleUpdate={handleUpdate} 
              />
              <MdDelete
                onClick={() => handleDelete(id)}
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
