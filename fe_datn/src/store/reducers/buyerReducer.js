/** @format */

import actionTypes from "../actions/actionTypes";
const initialState = {
      dataProduct: [],
      allCart: [],
      allCartItem: [],
};

const buyerReducer = (state = initialState, action) => {
      switch (action.type) {
            // buyer get all product item
            case actionTypes.FETCH_ALL_ITEM_PRODUCT_BY_BUYER_START:
                  console.log("Check fetch all item product start: ", action);
                  return {
                        ...state,
                  };
            case actionTypes.FETCH_ALL_ITEM_PRODUCT_BY_BUYER_SUCCESS:
                  // console.log('Check fetch all user success: ', action);
                  state.dataProduct = action.dataProduct;
                  // console.log("check dataProduct buyerReducer: ", action.dataProduct);
                  return {
                        ...state,
                  };
            case actionTypes.FETCH_ALL_ITEM_PRODUCT_BY_BUYER_FAILED:
                  console.log("Check fetch all item product by buyer failed: ", action);
                  return {
                        ...state,
                  };
            // buyer add food item to cart item
            case actionTypes.FETCH_ADD_FOOD_TO_CART_START:
                  console.log("Check fetch add food item to cart start", action);
                  return {
                        ...state,
                  };
            case actionTypes.FETCH_ADD_FOOD_TO_CART_SUCCESS:
                  console.log("Check fetch add food item to cart success");
                  return {
                        ...state,
                  };
            case actionTypes.FETCH_ADD_FOOD_TO_CART_FAILED:
                  console.log("Check fetch add food item to cart failed", action);
                  return {
                        ...state,
                  };
            // buyer get all cart
            case actionTypes.FETCH_ALL_CART_START:
                  console.log("Check fetch all cart start", action);
                  return {
                        ...state,
                  };
            case actionTypes.FETCH_ALL_CART_SUCCESS:
                  state.allCart = action.allCart;
                  console.log("Check fetch all cart success");
                  return {
                        ...state,
                  };
            case actionTypes.FETCH_ALL_CART_FAILED:
                  console.log("Check fetch all cart failed", action);
                  return {
                        ...state,
                  };
            default:
                  return state;
      }
};

export default buyerReducer;
