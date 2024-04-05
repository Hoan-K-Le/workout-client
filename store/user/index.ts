import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// inteface
export interface UserState {
  name: string;
  email: string;
  age: null;
  contactNumber: null;
  _id: string;
  createdProfile: boolean;
  workouts: { _id: string; reps: number; weight: number; name: string }[];
}
export interface UserSettingsState {
  user: UserState;
}
// initial state
const initialState: UserSettingsState = {
  user: {
    name: "",
    email: "",
    contactNumber: null,
    age: null,
    createdProfile: false,
    _id: "",
    workouts: [],
  },
};
// create slice
export const userSettings = createSlice({
  name: "userSettings",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = {
        name: "",
        email: "",
        age: null,
        contactNumber: null,
        _id: "",
        createdProfile: false,
        workouts: [],
      };
    },
  },
});

export const { setUser, clearUser } = userSettings.actions;
export default userSettings;
