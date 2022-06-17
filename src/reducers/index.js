import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
//import orderReducer from "./order.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
   auth: authReducer,
   user: userReducer,
   category: categoryReducer,
   //order: orderReducer,
   product: productReducer,
});

export default rootReducer;
