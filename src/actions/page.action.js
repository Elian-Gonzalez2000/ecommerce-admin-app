import axios from "../helpers/axios";
import { pageConstants } from "./constants";

export const createPage = (form) => {
   return async (dispatch) => {
      dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });
      try {
         const res = await axios.post("/page/create", form);
         if (res.status === 201) {
            dispatch({
               type: pageConstants.CREATE_PAGE_SUCCESS,
               payload: { page: res.data.page },
            });
         }
      } catch (err) {
         if (err.response.status === 400) {
            dispatch({
               type: pageConstants.CREATE_PAGE_FAILURE,
               payload: { error: err.response },
            });
         }
      }
   };
};
