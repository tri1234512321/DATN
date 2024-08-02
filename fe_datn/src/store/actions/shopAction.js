/** @format */

import { toast } from "react-toastify";
import {
      shopGetAllProduct,
      createNewItemProduct,
      updateProductService,
      deleteProductService,
} from "../../services/shopService";
import actionTypes from "./actionTypes";
///// CREATE NEW ITEM PRODUCT
export const fetchCreateItemProduct = (data, access_token) => {
      return async (dispatch, getState) => {
            try {
                  setTimeout(async () => {
                        let res = await createNewItemProduct(data);
                        if (res && res.EC === 0) {
                              toast.success("Create new item food successfully!");
                              dispatch(fetchCreateItemProductSuccess());
                              dispatch(fetchAllItemProductStart(access_token));
                        } else {
                              toast.warning("Please check the information again!");
                              dispatch(fetchCreateItemProductFailed());
                        }
                  });
            } catch (e) {
                  toast.error("Create user failed! Please try again!");
                  dispatch(fetchCreateItemProductFailed());
                  console.log("Save user failed, ", e);
            }
      };
};

export const fetchCreateItemProductSuccess = () => ({
      type: actionTypes.CREATE_ITEM_PRODUCT_SUCCESS,
});

export const fetchCreateItemProductFailed = () => ({
      type: actionTypes.CREATE_ITEM_PRODUCT_FAILED,
});

///// GET ALL PRODUCT ITEM WITH ID OR "ALL"
export const fetchAllItemProductStart = (access_token) => {
      return async (dispatch, getState) => {
            try {
                  console.log("check fetchAllItemProductStart: ", access_token);
                  const res = await shopGetAllProduct("All", access_token);
                  if (res && res.EC === 0) {
                        console.log(res.products.reverse());
                        dispatch(fetchAllItemProductSuccess(res.products.reverse()));
                  } else {
                        dispatch(fetchAllItemProductFailed());
                  }
            } catch (e) {
                  console.log("check get all user failed: ", e);
            }
      };
};

export const fetchAllItemProductSuccess = (dataProduct) => ({
      type: actionTypes.FETCH_ALL_ITEM_PRODUCT_SUCCESS,
      dataProduct: dataProduct,
});

export const fetchAllItemProductFailed = () => ({
      type: actionTypes.FETCH_ALL_ITEM_PRODUCT_FAILED,
});

// DELETE PRODUCT ITEM WITH ID
export const deleteProductStart = (id, access_token) => {
      return async (dispatch, getState) => {
            try {
                  const res = await deleteProductService(id, access_token);
                  console.log("deleteProductService: ", res);
                  if (res && res.EC === 0) {
                        toast.success("Product deleted successfully!");
                        dispatch(deleteProductSuccess());
                        dispatch(fetchAllItemProductStart(access_token));
                  } else {
                        toast.error("User delete error!");
                        dispatch(deleteProductFailed());
                  }
            } catch (e) {
                  toast.error("User delete error!");
                  console.log("Error deleting: ", e);
                  dispatch(deleteProductFailed());
            }
      };
};

export const deleteProductSuccess = () => ({
      type: actionTypes.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailed = () => ({
      type: actionTypes.DELETE_PRODUCT_FAILED,
});

// UPDATE PRODUCT ITEM WITH ID
export const updateProductStart = (dataItem) => {
      return async (dispatch, getState) => {
            try {
                  const res = await updateProductService(dataItem);
                  console.log("updateProductService: ", res);
                  if (res && res.EC === 0) {
                        toast.success("Product updated successfully!");
                        dispatch(updateProductSuccess());
                        dispatch(fetchAllItemProductStart(dataItem.access_token));
                  } else {
                        toast.error("Item update error!");
                        dispatch(updateProductFailed());
                  }
            } catch (e) {
                  toast.error("Item update error!");
                  console.log("Error updating: ", e);
                  dispatch(updateProductFailed());
            }
      };
};

export const updateProductSuccess = () => ({
      type: actionTypes.DELETE_PRODUCT_SUCCESS,
});

export const updateProductFailed = () => ({
      type: actionTypes.DELETE_PRODUCT_FAILED,
});
