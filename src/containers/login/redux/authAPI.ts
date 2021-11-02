import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IUserCredentials {
  username: string;
  password: string;
}

export const performLogin = createAsyncThunk(
  "auth/login",
  async (userCredentials: IUserCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("authenticate/login", userCredentials);
      return response.data.token;
    } catch (error) {
      return rejectWithValue(error.response.data.description);
    }
  }
);
