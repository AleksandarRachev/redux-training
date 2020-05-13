import { productConstants } from "../../constants/Product/product.constants";

export const actionTypes = {
  OPEN_CART: "OPEN_CART",
  CLOSE_CART: "CLOSE_CART",
  INCREMENT_ITEM_IN_CART: "INCREMENT_ITEM_IN_CART",
  DECREMENT_ITEM_IN_CART: "DECREMENT_ITEM_IN_CART",
  COUNT_TOTAL_PRODUCTS: "COUNT_TOTAL_PRODUCTS",
}

export const showCart = () => {
  return { type: actionTypes.OPEN_CART };
};

export const closeCart = () => {
  return { type: actionTypes.CLOSE_CART };
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
    type: actionTypes.COUNT_TOTAL_PRODUCTS,
  };
};

export const incrementProductQuantity = (product) => {
  return {
    type: actionTypes.INCREMENT_ITEM_IN_CART,
    payload: {
      product,
    },
  };
};

export const decrementProductQuantity = (product) => {
  return {
    type: actionTypes.DECREMENT_ITEM_IN_CART,
    payload: {
      product,
    },
  };
};
