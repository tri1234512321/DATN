/** @format */

import { toast } from "react-toastify";
import {
  buyerGetAllProduct,
  buyerAddFoodItem,
  buyerGetAllCart,
  buyerGetAllCartItems,
} from "../../services/buyerService";
import actionTypes from "./actionTypes";

///// GET ALL PRODUCT ITEM BY BUYER
export const fetchAllItemProductByBuyerStart = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await buyerGetAllProduct(id);
      if (res && res.EC === 0) {
        // console.log(res.products.reverse());
        dispatch(fetchAllItemProductByBuyerSuccess(res.products.reverse()));
      } else {
        dispatch(fetchAllItemProductByBuyerFailed());
      }
    } catch (e) {
      console.log("check get all product by buyer failed: ", e);
    }
  };
};

export const fetchAllItemProductByBuyerSuccess = (dataProduct) => ({
  type: actionTypes.FETCH_ALL_ITEM_PRODUCT_BY_BUYER_SUCCESS,
  dataProduct: dataProduct,
});

export const fetchAllItemProductByBuyerFailed = () => ({
  type: actionTypes.FETCH_ALL_ITEM_PRODUCT_BY_BUYER_FAILED,
});

///// GET ALL PRODUCT ITEM BY BUYER
export const fetchAddFoodToCartStart = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await buyerAddFoodItem(data);
      if (res && res.EC === 0) {
        toast.success("Add food to cart successfully!");
        await dispatch(fetchAddFoodToCartSuccess());
        await dispatch(fetchAllCartStart(data.access_token));
      } else {
        toast.error("Add food to cart failed!");
        dispatch(fetchAddFoodToCartFailed());
      }
    } catch (e) {
      console.log("check get all product by buyer failed: ", e);
    }
  };
};

export const fetchAddFoodToCartSuccess = () => ({
  type: actionTypes.FETCH_ADD_FOOD_TO_CART_SUCCESS,
});

export const fetchAddFoodToCartFailed = () => ({
  type: actionTypes.FETCH_ADD_FOOD_TO_CART_FAILED,
});

///// GET ALL CART
export const fetchAllCartStart = (access_token) => {
  return async (dispatch, getState) => {
    try {
      const res = await buyerGetAllCart(access_token);
      let arr = res.allCart;

      let arrCart = [];
      if (res && res.EC === 0) {
        for (let i = 0; i < arr.length; i++) {
          try {
            const res = await buyerGetAllCartItems(arr[i].id, access_token);
            if (res.allCartItem && Array.isArray(res.allCartItem)) {
              res.allCartItem.forEach((item) => {
                if (item.status === 1) {
                  arrCart.push(item);
                }
              });
            }
          } catch (error) {
            console.error(`Error fetching cart items for id ${arr[i].id}:`, error);
          }
        }
        dispatch(fetchAllCartSuccess(arrCart));
      } else {
        dispatch(fetchAllCartFailed());
      }
    } catch (e) {
      console.log("check fetch all cart failed: ", e);
    }
  };
};

export const fetchAllCartSuccess = (allCart) => ({
  type: actionTypes.FETCH_ALL_CART_SUCCESS,
  allCart: allCart,
});

export const fetchAllCartFailed = () => ({
  type: actionTypes.FETCH_ALL_CART_FAILED,
});
