"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function RegisterUser() {
  const [inputVal, setInputVal] = useState({ email: "", password: "" });

  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${process.env.SERVER_SIDE}/auth/signup`;
      const { data } = await axios({
        method: "POST",
        url,
        data: inputVal,
        withCredentials: true,
      });
      setInputVal(prev => ({ ...prev, email: "", password: "" }));
      router.push("/login");
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputVal(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <form
        className="flex flex-col rounded-xl  border shadow-md p-4 gap-4 w-[400px]"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-3xl">Sign Up</p>
        <input
          type="text"
          name="email"
          placeholder="Email..."
          className="border px-4 py-2 rounded-xl"
          onChange={handleOnChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password..."
          className="border px-4 py-2 rounded-xl"
          onChange={handleOnChange}
        />
        <button type="submit" className="bg-info text-white py-1.5 rounded-lg">
          Register
        </button>
        <span className="text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="text-warning">
            Sign in
          </Link>
        </span>
      </form>
    </div>
  );
}
