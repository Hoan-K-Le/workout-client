"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { toast } from "react-toastify";
import { login } from "@/store/user/thunk";
import { AppDispatch } from "@/store";
import checkProfile from "@/components/utils/authUtils";

export default function Login() {
  const [inputVal, setInputVal] = useState({ email: "", password: "" });
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await dispatch(
        login({ email: inputVal.email, password: inputVal.password })
      );
      if (data) {
        toast.success("Successfully logged in!");
        await checkProfile(dispatch, router);
      }
    } catch (error) {
      console.log(error);
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
        <p className="text-center text-3xl">Sign In</p>
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
        <Link href="#" className="text-warning">
          Forgot password?
        </Link>
        <button type="submit" className="bg-info text-white py-1.5 rounded-lg">
          Log in
        </button>
        <span className="text-center">
          Already have an account?{" "}
          <Link href={"/register"} className="text-warning">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
}
