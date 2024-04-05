// thunk api where we call and grab the data for the workouts so we are able to access the workout across the application and able to get it updated in real time
// imports
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "../user";
import { setWorkout } from ".";
import { CreateWorkoutPayload } from "./workout.interface";

export const createNewWorkout = createAsyncThunk(
  "newWorkout/createNewWorkout",
  async ({ name, load, rep, userId }: CreateWorkoutPayload, { dispatch }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5173/workout/addWorkout",
        {
          name: name,
          weight: load,
          reps: rep,
          userId: userId,
        }
      );
      if (data) {
        await dispatch(getAllWorkout(userId));
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllWorkout = createAsyncThunk(
  "workouts/getAllWorkouts",
  async (userId: string, { dispatch }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5173/workout/getWorkouts",
        {
          withCredentials: true,
          params: {
            userId,
          },
        }
      );
      dispatch(setWorkout(data.user.workouts));
      return data.user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteWorkout = createAsyncThunk(
  "workouts/deleteWorkout",
  async ({ id, userId }: { id: string; userId: string }, { dispatch }) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:5173/workout/deleteworkout",
        {
          data: {
            workoutId: id,
          },
        }
      );
      dispatch(getAllWorkout(userId));
      return data.user;
    } catch (error) {
      console.log(error);
    }
  }
);
