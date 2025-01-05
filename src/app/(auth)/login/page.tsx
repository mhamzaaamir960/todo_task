"use client";
import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface loginType {
  email: string;
  password: string;
}

function LogInPage() {
  const [data, setData] = useState<loginType>({
    email: "",
    password: "",
  });
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData: loginType) => ({ ...prevData, [name]: value }));
  };

  const router = useRouter();
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.push("/");
      } else {
        throw new Error(
          `Failed to post data: ${response.status} - ${response.statusText}`
        );
      }
      setData({
        email: "",
        password: "",
      });
      console.log(response.statusText);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-[80vh] flex flex-col justify-center items-center gap-y-3 "
    >
      <h1 className="font-bold text-black text-center text-[35px]">
        Login Form
      </h1>
      <Input
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Enter your email..."
        className="max-w-[400px] mt-5 "
      />
      <Input
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        placeholder="Enter your password..."
        className="max-w-[400px]"
      />
      <button
        type="submit"
        className="font-medium text-xl text-white bg-blue-400 hover:bg-blue-400/90 px-10 py-1 rounded-full mt-5"
      >
        Login
      </button>

      <p className="text-md mt-5">
        Don{"'"}t have an account?{" "}
        <Link href={"/signup"} className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export default LogInPage;
