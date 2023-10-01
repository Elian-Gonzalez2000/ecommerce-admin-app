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
      console.log(error.response);
      const status = error.response ? error.response.status : 500;
      if (status && status === 500) {
         localStorage.clear();
         store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
      }
      return Promise.reject(error);
   }
);

export default axiosInstance;
