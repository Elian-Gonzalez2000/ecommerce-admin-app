import { categoryConstants } from "../actions/constants";

const initialState = {
   categories: [],
   loading: false,
   error: null,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
         state = {
            ...state,
            categories: action.payload.categories,
         };
         break;
   }
   return state;
};
