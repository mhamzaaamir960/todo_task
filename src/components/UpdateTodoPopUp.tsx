import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { FaEdit } from "react-icons/fa";
  import { Input } from "./ui/input";
  import { Dispatch, SetStateAction, useState } from "react";
  
  function UpdateTodoPopUp({
    todo,
    id,
    handleUpdate,
  }: {
    todo: string;
    id: number;
    handleUpdate: (id: number, updatedTodo: string) => void;
  }) {
    const [updateTodo, setUpdateTodo] = useState<string>(todo);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUpdateTodo(e.target.value);
    };
  
    return (
      <Dialog>
        <DialogTrigger>
          <FaEdit className="text-green-400 text-2xl cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-y-5">
            <DialogTitle>Update your todo...</DialogTitle>
            <div className="flex justify-between items-center gap-x-5">
              <Input
                type="text"
                required
                value={updateTodo}
                onChange={handleChange}
                placeholder="Update your todo..."
                className="outline-blue-400"
              />
              <button
                onClick={() => handleUpdate(id, updateTodo)}
                className="w-[60px] h-[50px] flex justify-center items-center bg-blue-400 hover:bg-opacity-90 rounded-full"
              >
                <FaEdit className="text-white text-2xl" />
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  
  
  export default UpdateTodoPopUp;
  