import axios from "../helpers/axios.js";
import {
   initialDataConstants,
   categoryConstants,
   productConstants,
} from "./constants";

export const getInitialData = () => {
   return async (dispatch) => {
      try {
         const res = await axios.post("/initialData");
         if (res.status === 200) {
            const { categories, products } = res.data;
            dispatch({
               type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
               payload: { categories },
            });
            dispatch({
               type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
               payload: { products },
            });
            console.log(res);
         }
      } catch (err) {
         const { status, data } = err.response;
         console.log(data);
         if (status === 400) {
            dispatch({
               type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
               payload: { err: data.message },
            });
            dispatch({
               type: productConstants.GET_ALL_PRODUCTS_FAILURE,
               payload: { err: data.message },
            });
         }
      }
   };
};
