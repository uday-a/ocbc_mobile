import { createSlice } from "@reduxjs/toolkit";
import { performLogin } from "./authAPI";
import { RootState } from "../../../store/store";

const initialState = {
  isAuthenticated: !!sessionStorage.getItem("token"),
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    performLogout: (state) => {
      state.isAuthenticated = false;
      state.error = "";
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performLogin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.error = "";
        sessionStorage.setItem("token", action.payload);
      })
      .addCase(performLogin.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const selectAuthenticatedStatus = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthError = (state: RootState) => state.auth.error;

export const authReducer = authSlice.reducer;
export const { performLogout } = authSlice.actions;
