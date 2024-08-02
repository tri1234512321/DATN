/** @format */

import actionTypes from "../actions/actionTypes";
const initialState = {
      dataProduct: [],
};

const shopReducer = (state = initialState, action) => {
      switch (action.type) {
            case actionTypes.CREATE_ITEM_PRODUCT_START:
                  console.log("Create item product start: ", action);
                  return {
                        ...state,
                  };
            case actionTypes.CREATE_ITEM_PRODUCT_SUCCESS:
                  console.log("Create item product success: ", action);
                  return {
                        ...state,
                  };
            case actionTypes.CREATE_ITEM_PRODUCT_FAILED:
                  console.log("Create item product failed: ", action);
                  return {
                        ...state,
                  };
            // get all user
            case actionTypes.FETCH_ALL_ITEM_PRODUCT_START:
                  console.log("Check fetch all item product start: ", action);
                  return {
                        ...state,
                  };
            case actionTypes.FETCH_ALL_ITEM_PRODUCT_SUCCESS:
                  // console.log('Check fetch all user success: ', action);
                  state.dataProduct = action.dataProduct;
                  console.log("check dataProduct shopReducer: ", action.dataProduct);
                  return {
                        ...state,
                  };
            case actionTypes.FETCH_ALL_ITEM_PRODUCT_FAILED:
                  console.log("Check fetch all user failed: ", action);
                  return {
                        ...state,
                  };
            // delete product item
            case actionTypes.DELETE_PRODUCT_START:
                  console.log("Delete user start: ", action);
                  return {
                        ...state,
                  };
            case actionTypes.DELETE_PRODUCT_SUCCESS:
                  // console.log('Delete user success: ', action);
                  return {
                        ...state,
                  };
            case actionTypes.DELETE_PRODUCT_FAILED:
                  console.log("Delete product failed: ", action);
                  return {
                        ...state,
                  };
            // UPDATE ITEM
            case actionTypes.UPDATE_PRODUCT_START:
                  console.log("Update item start: ", action);
                  return {
                        ...state,
                  };
            case actionTypes.UPDATE_PRODUCT_SUCCESS:
                  // console.log('Update user success: ', action);
                  return {
                        ...state,
                  };
            case actionTypes.UPDATE_PRODUCT_FAILED:
                  console.log("Update product failed: ", action);
                  return {
                        ...state,
                  };
            default:
                  return state;
      }
};

export default shopReducer;
