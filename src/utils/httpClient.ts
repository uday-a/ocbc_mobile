// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.get["Authorization"] = null;
axios.defaults.headers.post["Authorization"] = null;

axios.interceptors.request.use((config) => {
  config.headers.get["Authorization"] = sessionStorage.getItem("token");
  config.headers.post["Authorization"] = sessionStorage.getItem("token");
  return config;
});
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.data.description === "Invalid token") {
      sessionStorage.removeItem("token");
      location.reload();
    }
    throw error;
  }
);

export { axios as httpClient };
