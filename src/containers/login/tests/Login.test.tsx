import React from "react";
import { Login } from "../Login";
import { getMockStore, rtlRender, screen } from "../../../test-utils";
import { MemoryRouter } from "react-router-dom";
import { fireEvent } from "@testing-library/react";

const initialState = { auth: { isAuthenticated: false, error: "" } };
const store = getMockStore(initialState);
const renderComponent = (state = {}, initialEntries = "/") => {
  rtlRender(
    <MemoryRouter initialEntries={[initialEntries]}>
      <Login />
    </MemoryRouter>,
    {
      initialState: { ...initialState, ...state },
      store,
    }
  );
};
describe("<Login/>", () => {
  it("should render login the component when isAuthenticated false", () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/Username/i)).toBeEmpty();
    expect(screen.getByPlaceholderText(/Password/i)).toBeEmpty();
    expect(screen.getByText(/Login/i)).toBeDisabled();
  });
  it("login button should be enable when  username and password entered", () => {
    renderComponent();
    const loginButton = screen.getByText(/Login/i);
    const username = screen.getByPlaceholderText(/Username/i);
    const password = screen.getByPlaceholderText(/Password/i);

    expect(username).toBeEmpty();
    expect(password).toBeEmpty();
    expect(loginButton).toBeDisabled();

    fireEvent.change(username, { target: { value: "name" } });
    fireEvent.change(password, { target: { value: "pass" } });
    expect(username).toHaveValue("name");
    expect(password).toHaveValue("pass");
    expect(loginButton).not.toBeDisabled();

    fireEvent.click(loginButton);
    expect(store.getActions()[0].type).toEqual("auth/login/pending");
  });
});
