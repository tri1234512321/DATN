/** @format */

import axios from "../axios";
const shopGetAllProduct = (idInput, access_token) => {
      return axios.get(`/api/shop-get-all-product`, { params: { id: idInput, access_token: access_token } });
};
const createNewItemProduct = (data) => {
      // console.log('check data from service: ', data);
      return axios.post("/api/create-new-item-product", data);
};
const deleteProductService = (id, access_token) => {
      return axios.delete(`/api/delete-item-product`, { params: { id: id, access_token: access_token } });
};
const getItemProduct = (id, access_token) => {
      return axios.get(`/api/shop-get-item-product`, { params: { id: id, access_token: access_token } });
};

const updateProductService = (dataItem) => {
      return axios.post("/api/update-item-product", dataItem);
};

export { shopGetAllProduct, createNewItemProduct, deleteProductService, getItemProduct, updateProductService };
