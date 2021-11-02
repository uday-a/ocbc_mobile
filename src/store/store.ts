import { createBrowserHistory, History } from "history";
import { configureStore } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { dashboardReduce } from "../containers/dashboard/redux/dashboardSlice";
import { authReducer } from "../containers/login/redux/authSlice";
import { transferReducer } from "../containers/transfer/redux/transferSlice";

const history = createBrowserHistory();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (history: History<any>) => ({
  dashboard: dashboardReduce,
  auth: authReducer,
  transfer: transferReducer,
  router: connectRouter(history),
});

const preloadedState = {};
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)),
  reducer: rootReducer(history),

  preloadedState,
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export { history };
