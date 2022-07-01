import { authConstants } from "../actions/constants";

const initialState = {
   token: null,
   user: {
      firstName: "",
      lastName: "",
      email: "",
      picture: "",
   },
   authenticate: false,
   authenticating: false,
   loading: false,
   error: null,
   message: "",
};

export default (state = initialState, action) => {
   //console.log(action);
   switch (action.type) {
      case authConstants.LOGIN_REQUEST:
         state = {
            ...state,
            authenticating: true,
         };
         break;

      case authConstants.LOGIN_SUCCESS:
         state = {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            authenticate: true,
            authenticating: false,
         };
         break;

      case authConstants.LOGOUT_REQUEST:
         state = {
            ...initialState,
            loading: true,
         };
         break;

      case authConstants.LOGOUT_SUCCESS:
         state = {
            ...initialState,
         };
         break;

      case authConstants.LOGOUT_FAILURE:
         state = {
            ...initialState,
            error: action.payload.error,
            loading: false,
         };
         break;
   }
   return state;
};
