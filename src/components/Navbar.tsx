"use client";
import Link from "next/link";
import React, { ChangeEvent } from "react";

interface Data {
  id: string;
  email: string;
  name: string;
}

const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  try {
    const response = await fetch("/api/user/logout");
    console.log(response);
    return response;
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};

function Navbar() {
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
