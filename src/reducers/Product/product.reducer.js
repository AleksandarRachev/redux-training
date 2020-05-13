import { productConstants } from "../../constants/Product/product.constants";

const productReducer = (
  state = { products: [], error: null, success: null },
  action
) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload.products };
    case productConstants.ADD_PRODUCT_SUCCESS:
      return { ...state, success: action.payload.success };
    case productConstants.ADD_PRODUCT_ERROR:
      return { ...state, error: action.payload.error };
    case productConstants.EDIT_PRODUCT_SUCCESS:
      return { ...state, success: action.payload.success };
    case productConstants.EDIT_PRODUCT_ERROR:
      return { ...state, error: action.payload.error };
    case productConstants.CLEAR_MESSAGES:
      return { ...state, error: null, success: null };
    default:
      return state;
  }
};

export default productReducer;
