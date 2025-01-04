"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";


function Navbar() {
  const router = useRouter();
  
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/logout");
      if (response.ok) {
        router.push("/login");
      } else {
        console.log("Failed to logout! Please try again");
      }
    } catch (error: unknown) {
      console.error(`Error: ${error}`);
    }
  };
  return (
    <nav className="w-full h-[90px] bg-blue-400 flex justify-center items-center">
      <div className="max-w-[1800px] w-full flex justify-around items-center">
        <Link href={"/"}>
          <p className="font-bold text-white text-2xl ">Todo List</p>
        </Link>
        <button
          onClick={(e) => handleLogout(e)}
          className="font-medium text-xl bg-white hover:bg-white/90 px-4 py-1 rounded-full"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
