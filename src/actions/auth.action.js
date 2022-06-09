import { authConstants } from "./constants";
import axios from "../helpers/axios.js";

export const login = (user) => {
   return async (dispatch) => {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const res = await axios.post("/admin/signin", {
         ...user,
      });

      if (res.status === 200) {
         const { token, user } = res.data;
         localStorage.setItem("token", token);
         loaclStorage.setItem("user", JSON.stringify(user));
         dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: { token, user },
         });
      } else {
         if (res.status === 400) {
            dispatch({
               type: authConstants.LOGIN_FAILURE,
               payload: { error: res.data.error },
            });
         }
      }

      dispatch({
         type: authConstants.LOGIN_REQUEST,
         payload: {
            ...user,
         },
      });
   };
};

export const isUserLoggedIn = () => {
   return async (dispatch) => {
      const token = localStorage.getItem("token");

      if (token) {
         const user = JSON.parse(localStorage.getItem("user"));
         dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: { token, user },
         });
      } else {
         dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { error: "Fail to login" },
         });
      }
   };
};
