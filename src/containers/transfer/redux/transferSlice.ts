import { createSlice } from "@reduxjs/toolkit";
import { fetchPayees, makeNewTransfer } from "./transferAPI";
import { RootState } from "../../../store/store";

export interface IPayee {
  id: string;
  accountNo: string;
  accountHolderName: string;
}
export interface IPayeeState {
  payees: IPayee[];
}

const initialState: IPayeeState = { payees: [] };
export const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayees.fulfilled, (state, action) => {
        state.payees = action.payload;
      })
      .addCase(fetchPayees.rejected, (state) => {
        state.payees = [];
      })
      .addCase(makeNewTransfer.fulfilled, () => {
        alert("Transfer Successful");
      })
      .addCase(makeNewTransfer.rejected, () => {
        alert("Transfer Failed. Please try again later");
      });
  },
});

export const selectPayees = (state: RootState) => state.transfer.payees;

export const transferReducer = transferSlice.reducer;
