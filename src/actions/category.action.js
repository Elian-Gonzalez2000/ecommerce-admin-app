import axios from "../helpers/axios.js";
import { categoryConstants } from "./constants.js";

export const getAllCategory = () => {
   return async (dispatch) => {
      try {
         dispatch({ type: categoryConstants });
         const res = await axios.get("category/getcategory");
         console.log(res);

         if (res.status === 200) {
            const { categoryList } = res.data;
            dispatch({
               type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
               payload: { categories: categoryList },
            });
         }
      } catch (err) {
         const { status, data } = error.response;
         if (status === 400) {
            dispatch({
               type: authConstants.LOGIN_FAILURE,
               payload: { error: data.message },
            });
         }
      }
   };
};
