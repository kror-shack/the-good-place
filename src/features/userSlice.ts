import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AddressData } from "../types/types";

interface User {
  uid: string | null;
  isAuthenticated: boolean;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
  userName?: string;
  isAdmin: boolean;
  address: AddressData | null;
  phoneNumber: number | string | null;
  firstName: string | null;
  lastName: string | null;
}

const initialState: User = {
  uid: null,
  isAuthenticated: false,
  email: null,
  photoURL: null,
  displayName: null,
  isAdmin: false,
  address: null,
  phoneNumber: null,
  firstName: null,
  lastName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUserName: (state: User, action: { payload: string }) => {
      state.displayName = action.payload;
      console.log("changed usernmae");
    },

    updateFirstName: (state: User, action: { payload: string }) => {
      state.firstName = action.payload;
      console.log(state.firstName);
    },
    updateLastName: (state: User, action: { payload: string }) => {
      state.lastName = action.payload;
    },
    updateUserEmail: (state: User, action: { payload: string }) => {
      state.email = action.payload;
    },
    updatePhoneNumber: (state: User, action: { payload: string | number }) => {
      state.phoneNumber = action.payload;
    },
    updateAddress: (
      state: User,
      action: {
        payload: {
          addressLineOne: string;
          district: string;
          city: string;
          addressLineTwo: string;
        };
      }
    ) => {
      const { addressLineOne, district, city, addressLineTwo } = action.payload;
      state.address = {
        addressLineOne,
        district,
        city,
        addressLineTwo,
      };
    },

    loginUserWithEmail: (state: Partial<User>, action: { payload: User }) => {
      console.log("succeeded");
      console.log(action);
      state.email = action.payload.email;
      state.isAuthenticated = true;
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
      state.isAuthenticated = true;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
    },
    logoutUser: (state: User) => {
      console.log("logginf out user");
      state.displayName = null;
      state.email = null;
      state.photoURL = null;
      state.isAuthenticated = false;
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
  updateFirstName,
  updateLastName,
  updatePhoneNumber,
  updateUserEmail,
  updateAddress,
} = userSlice.actions;

export default userSlice.reducer;
