import productReducer from "./Product/product.reducer";
import cartReducer from "./Cart/cart.reducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  product: productReducer,
  cart: cartReducer,
});

export default allReducers;
