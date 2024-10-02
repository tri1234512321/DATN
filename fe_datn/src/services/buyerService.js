/** @format */

import axios from "../axios";
const buyerGetAllProduct = (id) => {
  return axios.get(`/api/buyer-get-all-product`, { params: { id: id } });
};

const buyerAddFoodItem = (data) => {
  return axios.post(`/api/buyer-add-food-item`, data);
};

const buyerGetAllCart = (access_token) => {
  return axios.get(`/api/buyer-get-all-cart`, {
    params: { access_token: access_token },
  });
};

const buyerGetAllCartItems = (idCart, access_token) => {
  return axios.get(`/api/get-all-cart-items-by-id`, {
    params: { idCart: idCart, access_token: access_token },
  });
};

const buyerGetDetailFoodById = ({idFood, access_token}) => {
  return axios.get("/api/get-food-detail-by-id" ,{
    params: {
      idFood: idFood, access_token: access_token
    }
  })
}

const buyerGetFoodById = (idFood, access_token) => {
  return axios.get(`/api/get-food-by-id`, {
    params: { idFood: idFood, access_token: access_token },
  });
};

const buyerGetAllCartItemByCarts = (carts, access_token) => {
  return axios.get("/api/get-all-cart-item-by-carts", {
    params: { access_token: access_token, carts: JSON.stringify(carts) },
  });
};

const buyerAddCartItem = (data) => {
  return axios.put("/api/add-cart-item", data);
};

const buyerUpdateCartItem = (data) => {
  return axios.put("/api/update-cart-item", data);
};

const buyerDeleteCartItem = (data) => {
  return axios.delete("/api/delete-cart-item", { data });
};

// const buyerCreateOrder = (access_token, items) => {
//   return axios.post("/api/checkout-cart", { items, params: { access_token: access_token } });
// };

const buyerPaymentAll = (data) => {
  return axios.post("/api/buyer-payment-all", data);
};

const clearCart = (access_token, data) => {
  console.log("access_token", access_token);
  return axios.post("/api/clear-cart", { access_token, data });
};

const createRating = (data) => {
  const obj = {};
  data.forEach((value, key) => {
    obj[key] = value;
  });
  return axios.post("/api/rating", obj);
};

const getRating = ({ access_token, idFood }) => {
  return axios.get("/api/rating", {
    params: { access_token: access_token, idFood: idFood },
  });
};
// getQuestions, postQuestion
const getQuestions = () => {};

const postQuestion = () => {};

// answer rate

const createAnsRate = (data) => {
  const obj = {};
  data.forEach((value, key) => {
    obj[key] = value;
  });
  return axios.post("/api/answer-rating", obj);
};

export {
  buyerGetAllProduct,
  buyerAddFoodItem,
  buyerGetAllCart,
  buyerGetAllCartItems,

  buyerGetDetailFoodById,
  buyerGetFoodById,
  buyerAddCartItem,
  buyerDeleteCartItem,
  buyerUpdateCartItem,
  //   buyerCreateOrder,
  buyerGetAllCartItemByCarts,
  buyerPaymentAll,
  clearCart,
  createRating,
  getRating,
  getQuestions,
  postQuestion,

  //answer rate
  createAnsRate,
};
