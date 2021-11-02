import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../../utils/httpClient";

export const fetchBalance = createAsyncThunk(
  "dashboard/fetchBalance",
  async () => {
    const response = await httpClient.get("account/balances");
    return response.data.balance;
  }
);
export const fetchTransactions = createAsyncThunk(
  "dashboard/fetchTransactions",
  async () => {
    const response = await httpClient.get("account/transactions");
    return response.data.data;
  }
);
