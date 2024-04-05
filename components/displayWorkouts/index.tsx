"use client";
import { useEffect, useState } from "react";
import { useAppSelector, AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { getAllWorkout, deleteWorkout } from "@/store/workouts/thunk";

export default function DisplayWorkouts() {
  const dispatch: AppDispatch = useDispatch();
  const user = useAppSelector(state => state.userSettings.user);
  const workouts = useAppSelector(state => state.workoutData.workouts);
  const getWorkout = async () => {
    try {
      await dispatch(getAllWorkout(user._id));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (user?._id) {
      getWorkout();
    }
  }, [user?._id]);

  const handleDeleteWorkout = async (workoutId: string) => {
    await dispatch(deleteWorkout({ id: workoutId, userId: user._id }));
  };

  return (
    <div className="flex flex-col w-2/3 gap-6">
      {workouts &&
        workouts?.map((workout: any) => (
          <div
            className="border bg-white px-6 py-3 rounded flex flex-col gap-4"
            key={workout?._id}
          >
            <div className="flex justify-between items-center">
              <p className="text-accent text-3xl">{workout?.name}</p>
              <button onClick={() => handleDeleteWorkout(workout._id)}>
                trash
              </button>
            </div>
            <p>
              <span className="text-base-content font-semibold">Load(kg):</span>{" "}
              {workout?.reps}
            </p>
            <p>
              <span className="text-content font-semibold">Reps:</span>{" "}
              {workout?.weight}
            </p>
          </div>
        ))}
    </div>
  );
}
