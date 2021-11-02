import * as React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Store } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { RootState } from "./store/store";

interface ExtendedRenderOptions extends RenderOptions {
  initialState: Partial<RootState>;
  store?: Store<Partial<RootState>>;
}

const rtlRender = (
  component: React.ReactElement,
  {
    initialState,
    store = configureStore<Partial<RootState>>([thunk])(initialState),
    ...renderOptions
  }: ExtendedRenderOptions = {
    initialState: { auth: { isAuthenticated: true, error: "" } },
  }
) => {
  return render(component, {
    wrapper: TestWrapper(store),
    ...renderOptions,
  });
};

const TestWrapper =
  (store: Store) =>
  ({ children }: { children?: React.ReactNode }) =>
    <Provider store={store}>{children}</Provider>;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMockStore: any = (state: any) => mockStore({ ...state });

export * from "@testing-library/react";
export { rtlRender };
