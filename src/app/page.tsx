"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { TiPlus } from "react-icons/ti";
import AllTodos from "@/components/AllTodos";

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface Todo {
  id: string;
  content: string;
  isCompleted: boolean;
  userId: string;
}

export default function Home() {
  const [todo, setTodo] = useState<Todo>({
    id: "",
    content: "",
    isCompleted: false,
    userId: "",
  });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!todo.content.trim()) return;

    try {
      setTodos((prevTodos) => [...prevTodos, todo]);

      const response = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: todo.content }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);
      setTodo({ ...todo, content: "" });

      return response;
    } catch (error: unknown) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/user/profile");
        const data = await response.json();
        console.log(data);
        setProfileData(data.data);
      } catch (error) {
        console.log("Error fetching profile data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/todo");
        const data = await response.json();
        console.log(data.data);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        setTodos(data.todos);
      } catch (error: unknown) {
        console.log(`Error: ${error}`);
      }
    })();
  }, []);

  return (
    <main className="w-full flex flex-col justify-start items-center gap-y-3 mt-20">
      <h1 className="capitalize font-bold text-black text-center text-[35px]">
        {profileData?.name}, Todo List
      </h1>
      <p className="font-medium text-blue-400 text-center text-[20px]">
        Add your daily todos, update & delete
      </p>
      <div className="max-w-[400px] w-full flex justify-center items-center gap-x-5 mt-10">
        <Input
          type="text"
          required
          value={todo.content}
          onChange={(e) => setTodo({ ...todo, content: e.target.value })}
          placeholder="Add your todo..."
          className="outline-blue-400"
        />
        <button
          onClick={handleAdd}
          className="w-[60px] h-[50px] flex justify-center items-center bg-blue-400 hover:bg-opacity-90 rounded-full"
        >
          <TiPlus className="text-white text-2xl" />
        </button>
      </div>
      <AllTodos todos={todos} setTodos={setTodos} />
    </main>
  );
}
