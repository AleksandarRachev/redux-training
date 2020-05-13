import axios from "axios";
import global from "../../global";

export const getAllProducts = () => {
  return axios.get(`${global.backendUrl}/products`);
};

export const addProduct = (data) => {
  return axios.post(`${global.backendUrl}/products`, data);
};

export const editProduct = (data) => {
  return axios.put(`${global.backendUrl}/products`, data);
};

export const deleteProduct = (id) => {
  return axios.delete(`${global.backendUrl}/products/${id}`);
};
