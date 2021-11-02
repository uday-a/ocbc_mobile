import React from "react";
import { Dashboard } from "../Dashboard";
import { getMockStore, rtlRender, screen } from "../../../test-utils";
import { MemoryRouter } from "react-router-dom";
import { EnumTransferType } from "../redux/dashboardSlice";
import { fireEvent } from "@testing-library/react";

const initialState = {
  dashboard: {
    transactions: [
      {
        id: "001a18a2-fb41-46a2-bd20-0c389546ab64",
        type: EnumTransferType.RECEIVE,
        amount: 450,
        currency: "SGD",
        from: { accountNo: "1234-000-1234", accountHolderName: "Max Yee" },
        description: "rental",
        date: "2021-09-11T01:00:03.054Z",
      },
      {
        id: "0541c91f-dce4-4bf9-ba98-5c8c2f7afe62",
        type: EnumTransferType.TRANSFER,
        amount: 23.2,
        currency: "SGD",
        to: { accountNo: "4489-991-0023", accountHolderName: "Jane" },
        description: "cafe",
        date: "2021-09-11T01:00:03.054Z",
      },
    ],
    balance: 1000,
  },
};
const store = getMockStore(initialState);
const renderComponent = (state = {}, initialEntries = "/") => {
  rtlRender(
    <MemoryRouter initialEntries={[initialEntries]}>
      <Dashboard />
    </MemoryRouter>,
    {
      initialState: { ...initialState, ...state },
      store,
    }
  );
};
describe("<Dashboard/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render the dashboard component", () => {
    renderComponent();
    expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
    expect(screen.getByText(/1000/i)).toBeInTheDocument();
    expect(screen.getByText(/Your activity/i)).toBeInTheDocument();
    expect(screen.getByText(/Received from Max Yee/i)).toBeInTheDocument();
    expect(screen.getByText(/Transfer to Jane/i)).toBeInTheDocument();
    expect(screen.getByText(/450/i)).toBeInTheDocument();
    expect(screen.getByText(/-23.2/i)).toBeInTheDocument();
  });
  it("Should invoke the logout", () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Log Out/i));
    const lastAction = store.getActions().pop();
    expect(lastAction.type).toEqual("auth/performLogout");
  });
});
