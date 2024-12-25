import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="w-full h-[90px] bg-blue-400 flex justify-center items-center">
      <div className="max-w-[1800px] w-full flex justify-around items-center">
        <Link href={"/"}>
          <p className="font-bold text-white text-2xl ">Todo List</p>
        </Link>
        <button className="font-medium text-xl bg-white hover:bg-white/90 px-4 py-1 rounded-full">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
