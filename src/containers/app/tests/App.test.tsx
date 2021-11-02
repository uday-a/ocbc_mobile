import React from "react";
import { MemoryRouter } from "react-router-dom";
import { App } from "../App";
import { rtlRender, screen } from "../../../test-utils";

const initialState = { auth: { isAuthenticated: true, error: "" } };
const renderComponent = (store = {}, initialEntries = "/") => {
  rtlRender(
    <MemoryRouter initialEntries={[initialEntries]}>
      <App />
    </MemoryRouter>,
    {
      initialState: { ...initialState, ...store },
    }
  );
};
describe("<App/>", () => {
  it("should render login the component when isAuthenticated false", () => {
    renderComponent({ auth: { isAuthenticated: false, error: "" } });
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.queryByText(/Log Out/i)).not.toBeInTheDocument();
  });
  it("should render dashboard the component when isAuthenticated true", () => {
    renderComponent({
      ...initialState,
      dashboard: { transactions: [], balance: 0 },
    });
    expect(screen.queryByText(/Log Out/i)).toBeInTheDocument();
  });
});
