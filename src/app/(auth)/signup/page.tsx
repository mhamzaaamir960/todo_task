"use client";
import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";

interface signUpType {
  name: string;
  email: string;
  password: string;
}

function page() {
  const [data, setData] = useState<signUpType>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(
      (prevData: signUpType) => ({ ...prevData, [name]: value } as signUpType)
    );
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( data ),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to post data: ${response.status} - ${response.statusText}`
        );
      }
      setData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-[80vh] flex flex-col justify-center items-center gap-y-3 "
    >
      <h1 className="font-bold text-black text-center text-[35px]">
        SignUp Form
      </h1>
      <Input
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Enter your name..."
        className="max-w-[400px] mt-5 "
      />
      <Input
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Enter your email..."
        className="max-w-[400px] "
      />
      <Input
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        placeholder="Enter your password..."
        className="max-w-[400px]"
      />
      <button type="submit" className="font-medium text-xl text-white bg-blue-400 hover:bg-blue-400/90 px-10 py-1 rounded-full mt-5">
        Sign Up
      </button>
    </form>
  );
}

export default page;
