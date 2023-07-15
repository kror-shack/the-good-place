import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

export const provider = new GoogleAuthProvider();

interface User {
  uid: string | null;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
  userName?: string;
  isAdmin: boolean;
}

type Action = {
  payload: string;
};

type Builder = typeof ActionReducerMapBuilder;

const initialState: User = {
  uid: null,
  email: null,
  photoURL: null,
  displayName: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUserName: (
      state: User,
      action: { payload: { userName: string } }
    ) => {
      state.userName = action.payload.userName;
    },
    loginUserWithEmail: (state: Partial<User>, action: { payload: User }) => {
      console.log("succeeded");
      console.log(action);
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
    },
    setAdmin: (state: User) => {
      state.isAdmin = true;
    },

    loginUser: (state: User, action: { payload: User }) => {
      console.log("succeeded");
      console.log(action);
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
    },
    logoutUser: (state: User) => {
      console.log("logginf out user");
      state.displayName = null;
      state.email = null;
      state.photoURL = null;
      state.uid = null;
      state.isAdmin = false;
    },
  },
});

export const {
  changeUserName,
  setAdmin,
  loginUser,
  logoutUser,
  loginUserWithEmail,
} = userSlice.actions;

export default userSlice.reducer;
