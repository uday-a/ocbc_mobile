import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchPayees,
  ITransferRequest,
  makeNewTransfer,
} from "./redux/transferAPI";
import { IPayee, selectPayees } from "./redux/transferSlice";
import { Link } from "react-router-dom";

const Transfer: React.FC = () => {
  const dispatch = useAppDispatch();
  const initialState = {
    recipientAccountNo: "",
    amount: 0,
    date: "",
    description: "",
  };
  const [transferDetails, setTransferDetails] =
    useState<ITransferRequest>(initialState);
  useEffect(() => {
    dispatch(fetchPayees());
  }, []);
  const payees = useAppSelector(selectPayees);
  const onSubmit = () => {
    dispatch(makeNewTransfer(transferDetails));
  };
  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTransferDetails({
      ...transferDetails,
      [event.target.id]: event.target.value,
    });
  };
  return (
    <div className={"transfer"}>
      <h2>Make a transfer</h2>
      <div className={"transfer-form"}>
        <div className="form-field">
          <select
            className={"input-field"}
            placeholder={"Recipient"}
            onChange={onChange}
            id={"recipientAccountNo"}
          >
            <option value="">Select Payee</option>
            {payees.map((payee: IPayee) => (
              <option key={payee.id} value={payee.accountNo}>
                {payee.accountHolderName}-{payee.accountNo}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <input
            type={"date"}
            className={"input-field"}
            min={new Date().toISOString().split("T")[0]}
            placeholder={"Date of transfer"}
            onChange={onChange}
            id={"date"}
          />
        </div>
        <div className="form-field">
          <input
            type={"text"}
            className={"input-field"}
            placeholder={"Description"}
            onChange={onChange}
            id={"description"}
          />
        </div>
        <div className="form-field">
          <input
            type={"number"}
            className={"input-field"}
            placeholder={"Amount"}
            onChange={onChange}
            id={"amount"}
          />
        </div>
      </div>
      <div className={"transfer-footer"}>
        <Link to="/">Cancel</Link>
        <button
          onClick={onSubmit}
          className={"transfer-footer"}
          disabled={
            !transferDetails.recipientAccountNo ||
            !transferDetails.amount ||
            !transferDetails.description ||
            !transferDetails.date
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export { Transfer };
