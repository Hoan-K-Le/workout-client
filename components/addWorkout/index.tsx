"use client";
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useAppSelector, AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { createNewWorkout } from "@/store/workouts/thunk";

export default function AddWorkout() {
  const [workoutData, setWorkoutData] = useState({
    load: "",
    exerciseName: "",
    reps: "",
  });
  const dispatch: AppDispatch = useDispatch();
  const user = useAppSelector(state => state.userSettings.user);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        createNewWorkout({
          name: workoutData.exerciseName,
          load: Number(workoutData.load),
          rep: Number(workoutData.reps),
          userId: user._id,
        })
      );

      setWorkoutData(prev => ({
        ...prev,
        load: "",
        exerciseName: "",
        reps: "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkoutData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/3 pl-10 flex flex-col gap-3">
      <p className="text-2xl font-semibold">Add A New Workout</p>
      <label htmlFor="exerciseName">Exercise Name</label>
      <input
        type="text"
        name="exerciseName"
        className="py-1 px-2 rounded"
        value={workoutData.exerciseName}
        onChange={handleChange}
      />
      <label htmlFor="load">Load(in Kg)</label>
      <input
        type="text"
        name="load"
        className="py-1 px-2 rounded"
        onChange={handleChange}
        value={workoutData.load}
      />
      <label htmlFor="reps">Reps</label>
      <input
        type="text"
        name="reps"
        className="py-1 px-2 rounded"
        onChange={handleChange}
        value={workoutData.reps}
      />
      <button
        type="submit"
        className="bg-accent self-start px-2 py-1 rounded-lg text-white"
      >
        Add Workout
      </button>
    </form>
  );
}
