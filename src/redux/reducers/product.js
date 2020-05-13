import { actionTypes } from "../../constants/Product/product.constants";

const productReducer = (
  state = {
    products: [],
    error: null,
    success: null,
    isAddingProduct: false,
  },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products
      };

    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        isAddingProduct: true, // don't call the service here also, just update the UI to show a loader
        // the middleware will dispatch the proper action when the API call is done
      };
      
    case actionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isAddingProduct: false, // hide loader
        success: action.payload.data, // payload.data comes from the action success callback
      };
      
    case actionTypes.ADD_PRODUCT_ERROR:
      return {
        ...state,
        isAddingProduct: false, // also hide loader
        error: action.payload.error
      };

    case actionTypes.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        success: action.payload.success
      };

    case actionTypes.EDIT_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload.error
      };

    case actionTypes.CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
        success: null
      };

    default:
      return state;
  }
};

export default productReducer;
