"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import Image from "next/image";
import { ProfileData } from "@/app/page";

function Navbar() {
  const [data, setData] = useState<ProfileData | null>(null);
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

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/user/profile");
        const data = await response.json();
        console.log(data.data);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        setData(data.data);
      } catch (error: unknown) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <nav className="w-full h-[90px] bg-blue-400 flex justify-center items-center">
      <div className="max-w-[1800px] w-full flex justify-around items-center">
        <Link href={"/"}>
          <p className="font-bold text-white text-2xl ">Todo List</p>
        </Link>

        {data?.profilePicture && (
          <Image
            src={data?.profilePicture}
            alt="Profile Image"
            width={100}
            height={100}
            priority
            className="w-16 w-16  object-fill rounded-full border-2 border-blue-400 ring-4 ring-white "
          />
        )}
        <button
          onClick={(e) => handleLogout(e)}
          className=" bg-white hover:bg-white/90 px-4 py-1 rounded-full"
        >
          <CiLogin className="font-medium text-3xl" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
