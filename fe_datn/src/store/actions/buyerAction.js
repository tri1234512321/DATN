/** @format */

import { toast } from "react-toastify";
import { buyerGetAllProduct, buyerAddFoodItem, buyerGetAllCart } from "../../services/buyerService";
import actionTypes from "./actionTypes";

///// GET ALL PRODUCT ITEM BY BUYER
export const fetchAllItemProductByBuyerStart = () => {
      return async (dispatch, getState) => {
            try {
                  const res = await buyerGetAllProduct("All");
                  // console.log("check fetchAllItemProductByBuyerStart: ", res);

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
                  console.log("check fetchAllItemProductByBuyerStart: ", res);

                  if (res && res.EC === 0) {
                        toast.success("Add food to cart successfully");
                        await dispatch(fetchAddFoodToCartSuccess());
                        await dispatch(fetchAllCartStart(data.access_token));
                  } else {
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
                  console.log("check fetch all cart start ", res);

                  if (res && res.EC === 0) {
                        console.log("res.allCart: ", res.allCart);
                        dispatch(fetchAllCartSuccess(res.allCart));
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
