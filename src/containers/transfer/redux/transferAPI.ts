import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { push } from "connected-react-router";

export interface ITransferRequest {
  recipientAccountNo: string;
  amount: number;
  description: string;
  date: string;
}
export const fetchPayees = createAsyncThunk(
  "transfer/fetchPayees",
  async () => {
    const response = await axios.get("account/payees");
    return response.data.data;
  }
);
export const makeNewTransfer = createAsyncThunk(
  "transfer/makeNewTransfer",
  async (payload: ITransferRequest, { dispatch }) => {
    await axios.post("transfer", payload);
    dispatch(push("/"));
  }
);
