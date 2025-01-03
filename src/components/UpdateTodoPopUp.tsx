import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Todo } from "@/app/page";

function UpdateTodoPopUp({
  todo,
  handleUpdate,
}: {
  todo: Todo;
  handleUpdate: (id: string, updatedTodo: string) => void;
}) {
  const [updateTodo, setUpdateTodo] = useState<Todo>(todo);

  useEffect(() => {
    setUpdateTodo(todo);
  }, [todo]);

  return (
    <Dialog>
      <DialogTrigger>
        <FaEdit className="text-green-400 text-2xl cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-y-5">
          <DialogTitle>Update your todo...</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between items-center gap-x-5">
          <Input
            type="text"
            required
            value={updateTodo.content}
            onChange={(e) =>
              setUpdateTodo({ ...todo, content: e.target.value })
            }
            placeholder="Update your todo..."
            className="outline-green-400"
          />

          <DialogClose
            type="button"
            onClick={() => handleUpdate(updateTodo.id, updateTodo.content)}
            className="w-[50px] h-[50px] flex justify-center items-center bg-green-400 hover:bg-opacity-90 rounded-full"
          >
            <FaEdit className="text-white text-2xl" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTodoPopUp;
