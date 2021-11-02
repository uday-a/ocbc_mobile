import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectAuthenticatedStatus } from "../login/redux/authSlice";

interface IProtectedRoute {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children, ...rest }) => {
  const isAuthenticated = useAppSelector(selectAuthenticatedStatus);
  if (isAuthenticated) {
    return <Route {...rest} render={() => <>{children}</>} />;
  }
  return <Redirect to="/login" />;
};
export { ProtectedRoute };
