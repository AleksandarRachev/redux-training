import * as productService from "../../services/Product/product.service";

export const actionTypes = {
  GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",
  ADD_PRODUCT: "ADD_PRODUCT",
  ADD_PRODUCT_SUCCESS: "ADD_PRODUCT_SUCCESS",
  ADD_PRODUCT_ERROR: "ADD_PRODUCT_ERROR",
  CLEAR_MESSAGES: "CLEAR_MESSAGES",
  ADD_PRODUCT_TO_CART: "ADD_PRODUCT_TO_CART",
  REMOVE_PRODUCT_FROM_CART: "REMOVE_PRODUCT_FROM_CART",
  EDIT_PRODUCT_SUCCESS: "EDIT_PROdUCT_SUCCESS",
  EDIT_PRODUCT_ERROR: "EDIT_PRODUCT_ERROR",
  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",
  DELETE_PRODUCT_ERROR: "DELETE_PRODUCT_ERROR",
}

export const getProducts = () => (dispatch) => {
  productService.getAllProducts().then((response) => {
    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: {
        products: response.data,
      },
    });
  });
};

// make a backend service that accepts a URL, SUCCESS_ACTION_TYPE, FAIL_ACTION_TYPE and optionally data
// to abstract away the fact that each time here you need to call .then(successCallback, failCallback)
// don't call services here in the action call the service in a middleware and from the action only provide the needed data
// NOTE: research redux middlewares and probably 'thunk'
// something similar to:
export const addProduct2 = (product) => {
  return {
    type: actionTypes.ADD_PRODUCT, // means you have started trying to add a product, probably show a loader on this event
    payload: {
      product, // if you don't use this in the reducer you can skip the entire payload part
    },
    meta: {
      url: 'http://backend.service/product', // some URL best from config, or everybody's favourite constants :P
      method: 'POST', // also best to come from some constants
      body: product,
      onSuccess: (data) => ({ // the service calls this callback to dispatch a success action by passing the data from the API
        type: actionTypes.ADD_PRODUCT_SUCCESS, // on this action hide loader and display message
        payload: {
          data,
        },
      }),
      onError: (error) => ({ // the service calls this callback to dispatch an error action by passing the error from the API
        type: actionTypes.ADD_PRODUCT_ERROR, // on this action hide loader and display error
        payload: {
          error,
        },
      }),
    }
  }
};

export const addProduct = (product) => (dispatch) => {
  productService.addProduct(product).then(
    (response) => {
      dispatch({
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        payload: {
          success: "Product successfully added",
        },
      });
    },
    (error) => {
      dispatch({
        type: actionTypes.ADD_PRODUCT_ERROR,
        payload: {
          error: error.response.data.message,
        },
      });
    }
  );
};

export const editProduct = (product) => (dispatch) => {
  productService.editProduct(product).then(
    (response) => {
      dispatch({
        type: actionTypes.EDIT_PRODUCT_SUCCESS,
        payload: {
          success: "Product successfully edited",
        },
      });
    },
    (error) => {
      dispatch({
        type: actionTypes.EDIT_PRODUCT_ERROR,
        payload: {
          error: error.response.data.message,
        },
      });
    }
  );
};

export const deleteProduct = (id) => (dispatch) => {
  productService.deleteProduct(id).then(
    (response) => {
      dispatch({
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        payload: {
          success: response.data,
        },
      });
      window.location.reload()
    },
    (error) => {
      dispatch({
        type: actionTypes.DELETE_PRODUCT_ERROR,
        payload: {
          error: "Error deleting",
        },
      });
    }
  );
};

export const clearMessages = () => {
  return {
    type: actionTypes.CLEAR_MESSAGES,
  };
};
