import axios from "../helpers/axios.js";
import { categoryConstants } from "./constants.js";

export const getAllCategory = () => {
   return async (dispatch) => {
      try {
         dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
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
         const { status, data } = err.response;
         console.log(data);
         if (status === 400) {
            dispatch({
               type: authConstants.LOGIN_FAILURE,
               payload: { err: data.message },
            });
         }
      }
   };
};

export const addCategory = (form) => {
   return async (dispatch) => {
      try {
         dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
         const res = await axios.post("/category/create", form);
         console.log(res);
         if (res.status === 200) {
            dispatch({
               type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
               payload: res.data.category,
            });
            return true;
         }
      } catch (err) {
         const { status, data } = err.response;
         if (status === 400) {
            dispatch({
               type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
               payload: { error: data.message },
            });
            return false;
         }
      }
   };
};

export const updateCategories = (form) => {
   return async (dispatch) => {
      try {
         dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST });
         const res = await axios.post("/category/update", form);
         if (res.status === 201) {
            console.log(res);
            dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS });
            dispatch(getAllCategory());
         }
      } catch (err) {
         const { status } = err.response;
         if (status === 400) {
            dispatch({
               type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
               payload: { error: err.response },
            });
         }
      }
   };
};

export const deleteCategories = (ids) => {
   return async (dispatch) => {
      try {
         const res = await axios.post("/category/delete", {
            payload: {
               ids,
            },
         });
         if (res.status === 200) {
            console.log(res.data, res.status);
            return true;
         } else {
            return false;
         }
      } catch (err) {
         const { status, data } = err.response;
         if (status === 400) {
            console.log(status, data);
         }
      }
   };
};
