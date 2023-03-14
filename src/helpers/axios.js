import axios from "axios";
import { api } from "../urlConfig";
import store from "../store";
import { authConstants } from "../actions/constants";

const token = localStorage.getItem("token");

/* Create an instance axios, this prevent us to write headers and the complete URL in every axios request */

const axiosInstance = axios.create({
   baseURL: api,
   headers: {
      Authorization: token ? `Bearer ${token}` : "",
   },
});

axiosInstance.interceptors.request.use((req) => {
   const { auth } = store.getState();
   if (auth.token) {
      req.headers.Authorization = `Bearer ${auth.token}`;
   }
   return req;
});

axiosInstance.interceptors.response.use(
   (res) => {
      return res;
   },
   (error) => {
      const { status } = error.response;
      console.log(error.response);
      if (status === 500 || status === 400) {
         localStorage.clear();
         store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
      }
      return Promise.reject(error);
   }
);

export default axiosInstance;
