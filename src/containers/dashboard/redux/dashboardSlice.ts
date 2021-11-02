import { createSlice } from "@reduxjs/toolkit";
import { fetchBalance, fetchTransactions } from "./dashboardAPI";
import { RootState } from "../../../store/store";

export enum EnumTransferType {
  RECEIVE = "receive",
  TRANSFER = "transfer",
}

export interface ITransaction {
  id: string;
  type: EnumTransferType;
  currency: string;
  amount: number;
  description: string | null;
  date: string;
  from?: {
    accountNo: string;
    accountHolderName: string;
  };
  to?: {
    accountNo: string;
    accountHolderName: string;
  };
}
export interface IDashboardState {
  balance: number;
  transactions: ITransaction[];
}

const initialState: IDashboardState = {
  balance: 0,
  transactions: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      });
  },
});

export const selectBalance = (state: RootState) => state.dashboard.balance;
export const selectTransactions = (state: RootState) =>
  state.dashboard.transactions;
const dashboardReduce = dashboardSlice.reducer;
export { dashboardReduce };
