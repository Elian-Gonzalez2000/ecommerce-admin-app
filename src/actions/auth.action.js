import { authContants } from "./constants";

export const login = (user) => {
   return (dispatch) => {
      dispatch({
         type: authContants.LOGIN_REQUEST,
         payload: {
            ...user,
         },
      });
   };
};
