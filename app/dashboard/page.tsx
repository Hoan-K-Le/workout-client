"use client";
import React from "react";
import axios from "axios";
import { useAppSelector } from "@/store";
import DisplayWorkouts from "@/components/displayWorkouts";
import AddWorkout from "@/components/addWorkout";
import { clearUser } from "@/store/user";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const styles = {
  headerWrapper: "py-10 px-20 flex justify-between",
  username: "text-4xl",
  subtitle: "text-2xl",
  workoutWrapper:
    "bg-neutral-content py-10 px-20 flex justify-between gap-4 min-h-screen",
};

function Dashboard() {
  const user = useAppSelector(state => state.userSettings.user);
  console.log(user, "userdashboard 21");
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await axios.get(`${process.env.SERVER_SIDE}/auth/logout`, {
        withCredentials: true,
      });

      dispatch(clearUser());
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className={styles.headerWrapper}>
        <div className="">
          <p className={styles.username}>Hello {user?.name}!</p>
          <p className={styles.subtitle}>Check out your workouts!</p>
        </div>
        {user && <button onClick={handleLogOut}>Log Out</button>}
      </div>
      <div className={styles.workoutWrapper}>
        <DisplayWorkouts />
        <AddWorkout />
      </div>
    </div>
  );
}

export default Dashboard;
