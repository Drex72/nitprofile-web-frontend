import axios from "axios"
import { authSlice } from "@/state_management"

export const baseURL = "http://localhost:6000/api/v1"

// const logoutAction = authSlice.actions.logout();

const axiosInstance = axios.create({
    baseURL,
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    // },
})

export { axios, axiosInstance }

// let retries = 0;

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const LOGIN_ROUTE = "/auth/login";

//     if (error.response && error.response.status === 401 && retries <= 2) {
//       try {
//         retries += 1;
//         await Services.Auth.refreshAccessToken();
//         return axiosInstance.request(error.config);
//       } catch (error) {
//         window.history.pushState(null, "", LOGIN_ROUTE);
//         window.location.replace(LOGIN_ROUTE);
//         store.dispatch(logoutAction);
//       }
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );
