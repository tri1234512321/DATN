/** @format */

// import { get } from "lodash";
// import { escapeRegExp } from 'lodash';
import { toast } from "react-toastify";
import { adminGetAllusers, createNewUserService, editUserService, deleteUserService } from "../../services/userService";
import actionTypes from "./actionTypes";
///// CREATE NEW USER
export const fetchCreateUserStart = (data, access_token) => {
      return async (dispatch, getState) => {
            try {
                  setTimeout(async () => {
                        let res = await createNewUserService(data);
                        if (res && res.EC === 0) {
                              toast.success("Create new user successfully!");
                              dispatch(fetchCreateUserSuccess());
                              dispatch(fetchAllUserStart(access_token));
                        } else {
                              toast.warning("Please check the information again!");
                              dispatch(fetchCreateUserFailed());
                        }
                  });
            } catch (e) {
                  toast.error("Create user failed! Please try again!");
                  dispatch(fetchCreateUserFailed());
                  console.log("Save user failed, ", e);
            }
      };
};

export const fetchCreateUserSuccess = () => ({
      type: actionTypes.CREATE_USER_SUCCESS,
});

export const fetchCreateUserFailed = () => ({
      type: actionTypes.CREATE_USER_FAILED,
});
///// GET ALL USER WITH ID OR "ALL"
export const fetchAllUserStart = (access_token) => {
      return async (dispatch, getState) => {
            try {
                  const res = await adminGetAllusers("All", access_token);
                  if (res && res.EC === 0) {
                        console.log(res.users.reverse());
                        dispatch(fetchAllUserSuccess(res.users.reverse()));
                  } else {
                        dispatch(fetchAllUserFailed());
                  }
            } catch (e) {
                  console.log("check get all user failed: ", e);
            }
      };
};

export const fetchAllUserSuccess = (dataUsers) => ({
      type: actionTypes.FETCH_ALL_USER_SUCCESS,
      dataUsers: dataUsers,
});

export const fetchAllUserFailed = () => ({
      type: actionTypes.FETCH_ALL_USER_FAILED,
});

// DELETE USER WITH ID
export const deleteUserStart = (id, access_token) => {
      return async (dispatch, getState) => {
            try {
                  const res = await deleteUserService(id);
                  if (res && res.EC === 0) {
                        toast.success("User deleted successfully!");
                        dispatch(deleteUserSuccess());
                        dispatch(fetchAllUserStart(access_token));
                  } else {
                        toast.error("User delete error!");
                        dispatch(deleteUserFailed());
                  }
            } catch (e) {
                  toast.error("User delete error!");
                  console.log("Error deleting: ", e);
                  dispatch(deleteUserFailed());
            }
      };
};

export const deleteUserSuccess = () => ({
      type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
      type: actionTypes.DELETE_USER_FAILED,
});
//UPDATE USER
export const updateUserStart = (user, access_token) => {
      return async (dispatch, getState) => {
            try {
                  let res = await editUserService(user);
                  // console.log('res: ', res.errCode);
                  if (res && res.EC === 0) {
                        toast.success("Update user successfully!");
                        dispatch(updateUserSuccess());
                        dispatch(fetchAllUserStart(access_token));
                  } else {
                        toast.error("Update user failed! Please try again later!");
                        dispatch(updateUserFailed());
                  }
            } catch (e) {
                  toast.error("Update user failed! Please try again later!");
                  dispatch(updateUserFailed());
            }
      };
};

export const updateUserSuccess = () => ({
      type: actionTypes.UPDATE_USER_SUCCESS,
});

export const updateUserFailed = () => ({
      type: actionTypes.UPDATE_USER_FAILED,
});
