import { productConstants } from "../../constants/Product/product.constants";
import * as productService from "../../services/Product/product.service";

export const getProducts = () => (dispatch) => {
  productService.getAllProducts().then((response) => {
    dispatch({
      type: productConstants.GET_PRODUCTS_SUCCESS,
      payload: {
        products: response.data,
      },
    });
  });
};

export const addProduct = (product) => (dispatch) => {
  productService.addProduct(product).then(
    (response) => {
      dispatch({
        type: productConstants.ADD_PRODUCT_SUCCESS,
        payload: {
          success: "Product successfully added",
        },
      });
    },
    (error) => {
      dispatch({
        type: productConstants.ADD_PRODUCT_ERROR,
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
        type: productConstants.EDIT_PRODUCT_SUCCESS,
        payload: {
          success: "Product successfully edited",
        },
      });
    },
    (error) => {
      dispatch({
        type: productConstants.EDIT_PRODUCT_ERROR,
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
        type: productConstants.DELETE_PRODUCT_SUCCESS,
        payload: {
          success: response.data,
        },
      });
      window.location.reload()
    },
    (error) => {
      dispatch({
        type: productConstants.DELETE_PRODUCT_ERROR,
        payload: {
          error: "Error deleting",
        },
      });
    }
  );
};

export const clearMessages = () => {
  return {
    type: productConstants.CLEAR_MESSAGES,
  };
};
