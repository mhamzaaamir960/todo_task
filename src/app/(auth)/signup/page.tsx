"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface signUpType {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
}

function SignUpPage() {
  const [data, setData] = useState<signUpType>({
    name: "",
    email: "",
    password: "",
  });
  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(
      (prevData: signUpType) => ({ ...prevData, [name]: value } as signUpType)
    );
  };

  const router = useRouter();
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.push("/login");
      } else {
        throw new Error(
          `Failed to post data: ${response.status} - ${response.statusText}`
        );
      }
      setData({
        name: "",
        email: "",
        password: "",
        profilePicture: undefined,
      });
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const handleClick = () => {
    ref.current?.click();
  };

  const handleFileRef = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setData((prevData: signUpType) => ({
          ...prevData,
          profilePicture: fileReader.result as string,
        }));
      };
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

      <div
        id="profile"
        onClick={handleClick}
        className="w-28 h-28 cursor-pointer rounded-full bg-transparent ring-4 ring-blue-400 ring-offset-2
             w-28 h-28 cursor-pointer  bg-transparent ring-4 ring-blue-400 ring-offset-2"
      >
        {data.profilePicture ? (
          <Image
            src={data.profilePicture}
            alt="Profile Picture"
            width={100}
            height={100}
            priority
            className="w-28 h-28 object-fill rounded-full"
          />
        ) : (
          <Image
            src={"/profile.png"}
            alt="Profile Picture"
            width={100}
            height={100}
            className="w-28 h-28   object-fill rounded-full "
          />
        )}
      </div>

      <input
        type="file"
        ref={ref}
        className="hidden"
        onChange={handleFileRef}
      />

      {!data.profilePicture && (
        <label htmlFor="profile" className="text-md">
          Upload Profile Picture
        </label>
      )}
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
      <button
        type="submit"
        className="font-medium text-xl text-white bg-blue-400 hover:bg-blue-400/90 px-10 py-1 rounded-full mt-5"
      >
        Sign Up
      </button>
      <p className="text-md mt-5">
        Already have an account?{" "}
        <Link href={"/login"} className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}

export default SignUpPage;
