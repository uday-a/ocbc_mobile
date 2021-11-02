import React from "react";
import { Transfer } from "../Transfer";
import { getMockStore, rtlRender, screen } from "../../../test-utils";
import { MemoryRouter } from "react-router-dom";
import { fireEvent } from "@testing-library/react";

const initialState = {
  auth: { isAuthenticated: true, error: "" },
  transfer: {
    payees: [
      {
        id: "8a6da1a4-6f5f-4b53-9b90-0f8c57661a5d",
        accountNo: "8013-777-3232",
        accountHolderName: "Jason",
      },
      {
        id: "19bbc716-ddc3-48d1-a6f9-bb7b96749826",
        accountNo: "4489-991-0023",
        accountHolderName: "Jane",
      },
    ],
  },
};
const store = getMockStore(initialState);
const renderComponent = (state = {}, initialEntries = "/") => {
  rtlRender(
    <MemoryRouter initialEntries={[initialEntries]}>
      <Transfer />
    </MemoryRouter>,
    {
      initialState: { ...initialState, ...state },
      store,
    }
  );
};
describe("<App/>", () => {
  it("should render the component", () => {
    renderComponent();
    expect(screen.getByText("Make a transfer")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Recipient")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Date of transfer")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeDefined();
  });

  it("Should make the new transfer", () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("Recipient"), {
      target: { value: "8013-777-3232" },
    });

    fireEvent.change(screen.getByPlaceholderText("Date of transfer"), {
      target: { value: "2022-01-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: 10 },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "desc" },
    });
    const submitButton = screen.getByText("Submit");
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);
    expect(store.getActions()[2].type).toEqual(
      "transfer/makeNewTransfer/pending"
    );
  });
});
