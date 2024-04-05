"use client";
import axios from "axios";
import { createContext, useEffect } from "react";
import { useRouter } from "next/navigation"; // Fixed import for useRouter
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store";
import checkProfile from "./utils/authUtils";

interface UserSettings {
  user: null | {
    name: string;
    email: string;
    _id: string;
    age: number | null;
    contactNumber: string | null;
    createdProfile: boolean;
  };
}

export const AuthContext = createContext<UserSettings | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    checkProfile(dispatch, router);

    // check if user is still logged in
    const intervalId = setInterval(checkProfile, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: useAppSelector(state => state.userSettings.user) }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
