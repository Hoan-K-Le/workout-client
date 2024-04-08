"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAppSelector } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setUser } from "@/store/user";
import { useDispatch } from "react-redux";

function CreateProfile() {
  const [profileData, setProfileData] = useState<any>({
    name: "",
    age: "",
    gender: "",
    contact: "",
  });
  const router = useRouter();
  const user = useAppSelector(state => state.userSettings.user);
  const dispatch = useDispatch();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/createProfile`,
        {
          name: profileData?.name,
          age: Number(profileData?.age),
          gender: profileData?.gender,
          phoneNumber: profileData?.contact,
          userId: user?._id,
        }
      );

      if (data.user) {
        dispatch(setUser(data.user));
        toast.success("Successfully created a profile.");
        router.push("/dashboard");
      }
      return data.user;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border w-[400px] gap-4 p-4 rounded-xl"
      >
        <p className="text-2xl text-center">Create Profile</p>
        <input
          type="text"
          value={profileData?.name}
          name="name"
          placeholder="Name..."
          className="border px-4 py-2 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          value={profileData?.age}
          placeholder="Age..."
          name="age"
          className="border px-4 py-2 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          value={profileData?.contact}
          placeholder="Contact..."
          name="contact"
          className="border px-4 py-2 rounded"
          onChange={handleChange}
        />

        <select name="gender" onChange={handleChange}>
          <option>Choose Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <button type="submit" className="bg-info py-2 rounded-xl">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateProfile;
