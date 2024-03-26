import axios from "axios"
import { authSlice, store } from "@/state_management"
import { authService } from "@/services/auth/auth.service"
import { makeToast } from "@/libs//react-toast"

export const baseURL = "http://localhost:4000/api/v1"

const axiosInstance = axios.create({
    baseURL,
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    // },
    withCredentials: true,
})

let retries = 0

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     async (error) => {
//         const LOGIN_ROUTE = "/auth/login"

//         if (error.response && error.response.status === 401 && retries <= 2) {
//             try {
//                 retries += 1
//                 await authService.refresh_token()
//                 return axiosInstance.request(error.config)
//             } catch (error: any) {
//                 makeToast({
//                     id: "auth-error",
//                     message: error?.response?.data?.message ?? "Api Error, Please Log in",
//                     type: "error",
//                 })

//                 window.history.pushState(null, "", LOGIN_ROUTE)

//                 window.location.replace(LOGIN_ROUTE)

//                 store.dispatch(authSlice.actions.logout())

//                 retries = 0
//             }
//         } else {
//             return Promise.reject(error)
//         }
//     },
// )

export { axios, axiosInstance }
