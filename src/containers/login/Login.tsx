import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectAuthenticatedStatus, selectAuthError } from "./redux/authSlice";
import { performLogin } from "./redux/authAPI";

const Login: React.FC = () => {
  const isAuthenticated = useAppSelector(selectAuthenticatedStatus);
  const authError = useAppSelector(selectAuthError);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login-container">
      <div>
        <div className="form-field">
          <input
            type={"text"}
            className={"input-field"}
            placeholder={"Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-field">
          <input
            type={"password"}
            className={"input-field"}
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={"btn btn-secondary btn-curve login-btn"}
          disabled={!username || !password}
          onClick={() => {
            dispatch(performLogin({ username, password }));
          }}
        >
          Login
        </button>
        <p className={"error-message"}>{authError}</p>
      </div>
    </div>
  );
};
export { Login };
