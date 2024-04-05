import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: any) => {
    try {
      await axios.post(
        "http://localhost:5173/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);
