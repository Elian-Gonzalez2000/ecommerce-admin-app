import { authConstants } from "./constants";
import axios from "../helpers/axios.js";

export const login = (user) => {
   return async (dispatch) => {
      try {
         dispatch({ type: authConstants.LOGIN_REQUEST });
         const res = await axios.post("/admin/signin", {
            ...user,
         });
         //console.log(res);
         if (res.status === 200) {
            /* Take the token and user from the response, then save in localStorage with setItem, this permite use the token easly in the application */
            const { token, user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({
               type: authConstants.LOGIN_SUCCESS,
               payload: { token, user },
            });
         }
      } catch (error) {
         if (error.response.status === 400) {
            dispatch({
               type: authConstants.LOGIN_FAILURE,
               payload: { error: error.response.data.message },
            });
         }
      }
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

export const signout = () => {
   return async (dispatch) => {
      dispatch({ type: authConstants.LOGOUT_REQUEST });
      const res = await axios.post("/admin/signout");

      if (res.status === 200) {
         localStorage.clear();
         dispatch({
            type: authConstants.LOGOUT_SUCCESS,
         });
      } else {
         dispatch({
            type: authConstants.LOGOUT_FAILURE,
            payload: { error: res.data.error },
         });
      }
   };
};
