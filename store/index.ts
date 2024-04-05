import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import userSettings from "./user";
import workoutData from "./workouts";

export const store = configureStore({
  reducer: {
    userSettings: userSettings.reducer,
    workoutData: workoutData.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
