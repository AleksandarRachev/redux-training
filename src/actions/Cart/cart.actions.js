import { cartConstants } from "../../constants/Cart/cart.constants";
import { productConstants } from "../../constants/Product/product.constants";

export const showCart = () => {
  return { type: cartConstants.OPEN_CART };
};

export const closeCart = () => {
  return { type: cartConstants.CLOSE_CART };
};

export const addProductToCart = (product) => {
  return {
    type: productConstants.ADD_PRODUCT_TO_CART,
    payload: {
      product,
    },
  };
};

export const countTotalProducts = () => {
  return {
    type: cartConstants.COUNT_TOTAL_PRODUCTS,
  };
};

export const incrementProductQuantity = (product) => {
  return {
    type: cartConstants.INCREMENT_ITEM_IN_CART,
    payload: {
      product,
    },
  };
};

export const decrementProductQuantity = (product) => {
  return {
    type: cartConstants.DECREMENT_ITEM_IN_CART,
    payload: {
      product,
    },
  };
};
