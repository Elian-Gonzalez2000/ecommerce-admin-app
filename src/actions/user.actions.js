import { authConstants, userConstants } from "./constants";
import axios from "../helpers/axios.js";

export const signup = (user) => {
   return async (dispatch) => {
      dispatch({ type: userConstants.USER_REGISTER_REQUEST });
      const res = await axios.post("/admin/signup", {
         ...user,
      });
      //console.log(res);
      if (res.status === 201) {
         const { message } = res.data;
         dispatch({
            type: userConstants.USER_REGISTER_SUCCESS,
            payload: { message },
         });
      } else {
         if (res.status === 400) {
            dispatch({
               type: userConstants.USER_REGISTER_FAILURE,
               payload: { error: res.data.message },
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
