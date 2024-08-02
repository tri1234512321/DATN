/** @format */

import axios from "../axios";
const buyerGetAllProduct = (id) => {
    return axios.get(`/api/buyer-get-all-product`, { params: { id: id } });
};

const buyerAddFoodItem = (data) => {
    return axios.post(`/api/buyer-add-food-item`, data);
};

const buyerGetAllCart = (access_token) => {
    return axios.get(`/api/buyer-get-all-cart`, { params: { access_token: access_token } });
};

const buyerGetAllCartItems = (idCart, access_token) => {
    return axios.get(`/api/get-all-cart-items-by-id`, { params: { idCart: idCart, access_token: access_token } });
};

const buyerGetFoodById = (idFood, access_token) => {
    return axios.get(`/api/get-food-by-id`, { params: { idFood: idFood, access_token: access_token } });
};

// const buyerAddCartItem = (data) => {
//       return axios.put("/api/add-cart-item", data);
// };

// const buyerUpdateCartItem = (data) => {
//       return axios.put("/api/update-cart-item", data);
// };

// const buyerDeleteCartItem = (data) => {
//       return axios.put("/api/delete-cart-item", data);
// };

// const buyerCreateOrder = (access_token) => {
//       return axios.post("/api/delete-cart-item", { params: { access_token: access_token } });
// };

export {
    buyerGetAllProduct,
    buyerAddFoodItem,
    buyerGetAllCart,
    buyerGetAllCartItems,
    buyerGetFoodById,
    //   buyerGetAllCarts,
    //   buyerAddCartItem,
    //   buyerUpdateCartItem,
    //   buyerDeleteCartItem,
    //   buyerCreateOrder,
};
