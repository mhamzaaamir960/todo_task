"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { TiPlus } from "react-icons/ti";
import AllTodos from "@/components/AllTodos";

interface ProfileData {
  id: string;
  name: string;
  email: string;
}

export default function Home() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (todo.trim() === "") return;
    if (todos.includes(todo)) {
      alert("Todo already exists!");
      return;
    }
    setTodos((prevTodos) => [todo, ...prevTodos]);
    setTodo("");
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/user/profile");
        const data = await response.json();
        console.log(data);
        setProfileData(data.data);
        if (!data) return;
      } catch (error) {
        console.log("Error fetching profile data:", error);
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
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
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
