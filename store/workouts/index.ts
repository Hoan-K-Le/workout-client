import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createNewWorkout, getAllWorkout, deleteWorkout } from "./thunk";

// interface
interface WorkoutDataState {
  reps: number;
  load: number;
  _id: string;
  name: string;
}
interface WorkoutState {
  workouts: WorkoutDataState[];
  isLoading: boolean;
}

// initial state
const initialState: WorkoutState = {
  workouts: [],
  isLoading: false,
};

// create slice
const workoutData = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    setWorkout(state, action: PayloadAction<WorkoutDataState[]>) {
      state.workouts = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createNewWorkout.pending, state => {
        state.isLoading = true;
      })
      .addCase(createNewWorkout.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(createNewWorkout.rejected, state => {
        state.isLoading = false;
      })
      .addCase(getAllWorkout.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllWorkout.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(getAllWorkout.rejected, state => {
        state.isLoading = false;
      })
      .addCase(deleteWorkout.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteWorkout.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(deleteWorkout.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default workoutData;
export const { setWorkout } = workoutData.actions;
