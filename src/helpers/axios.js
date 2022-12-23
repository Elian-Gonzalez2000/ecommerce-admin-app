import axios from "axios";
import { api } from "../urlConfig";

const token = localStorage.getItem("token");

/* Create an instance axios, this prevent us to write headers and the complete URL in every axios request */

const axiosInstance = axios.create({
   baseURL: api,
   headers: {
      Authorization: token ? `Bearer ${token}` : "",
   },
});

export default axiosInstance;
