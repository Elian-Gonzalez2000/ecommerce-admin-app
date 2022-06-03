import { authConstants } from "../actions/constants";

const initialState = {
   name: "Riz",
};

export default (state = initialState, action) => {
   switch (action.type) {
      case authConstants.LOGIN_REQUEST:
         state = {
            ...state,
            ...action,
         };
         break;
   }
   return state;
};
