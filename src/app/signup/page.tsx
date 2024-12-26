import React from "react";
import { Input } from "@/components/ui/input";

function page() {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center gap-y-3 ">
      <h1 className="font-bold text-black text-center text-[35px]">
        SignUp Form
      </h1>
      <Input
        type="text"
        placeholder="Enter your name..."
        className="max-w-[400px] mt-5 "
      />
      <Input
        type="email"
        placeholder="Enter your email..."
        className="max-w-[400px] "
      />
      <Input
        type="password"
        placeholder="Enter your password..."
        className="max-w-[400px]"
      />
      <button className="font-medium text-xl text-white bg-blue-400 hover:bg-blue-400/90 px-10 py-1 rounded-full mt-5">
        Sign Up
      </button>
    </div>
  );
}

export default page;
