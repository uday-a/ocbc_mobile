import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { performLogout } from "../login/redux/authSlice";
import {
  EnumTransferType,
  ITransaction,
  selectBalance,
  selectTransactions,
} from "./redux/dashboardSlice";
import { fetchBalance, fetchTransactions } from "./redux/dashboardAPI";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchTransactions());
  }, []);
  const transactions = useAppSelector(selectTransactions);
  const balance = useAppSelector(selectBalance);
  return (
    <div className={"dashboard"}>
      <div>
        <div className={"log-out"}>
          <button className={"a-btn"} onClick={() => dispatch(performLogout())}>
            Log Out
          </button>
        </div>

        <div className={"dashboard-info"}>
          <h3>You have</h3>
          <h2>SGD {balance}</h2>
          <p>in your account</p>
        </div>
        <div className={"dashboard-activity"}>
          <h3>Your activity</h3>
          <div className={"dashboard-activity-list"}>
            {transactions.map((transaction: ITransaction) => (
              <div
                key={transaction.id}
                className={"dashboard-activity-list-item"}
              >
                <p className={"dates"}>
                  {new Intl.DateTimeFormat("en-GB", {
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(transaction.date))}{" "}
                </p>
                {transaction.from && (
                  <p>Received from {transaction.from.accountHolderName} </p>
                )}
                {transaction.to && (
                  <p> Transfer to {transaction.to.accountHolderName} </p>
                )}
                <p className={`count-${transaction.type}`}>
                  {transaction.type === EnumTransferType.TRANSFER && "-"}
                  {transaction.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={"dashboard-footer"}>
        <Link to="/transfer">Make a transfer</Link>
      </div>
    </div>
  );
};
export { Dashboard };
