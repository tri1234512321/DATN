/** @format */

import actionTypes from "../actions/actionTypes";
const initialState = {
      allUsers: [],
      // listItemInCart: [],
};

const adminReducer = (state = initialState, action) => {
      switch (action.type) {
            case actionTypes.CREATE_USER_START:
                  console.log("Create user start: ", action);
                  return {
                        ...state,
                  };
            case actionTypes.CREATE_USER_SUCCESS:
                  // console.log('Create user success: ', action);
                  return {
                        ...state,
                  };
            case actionTypes.CREATE_USER_FAILED:
                  console.log("Create user failed: ", action);
                  return {
                        ...state,
                  };
            // get all user
            case actionTypes.FETCH_ALL_USER_START:
                  console.log("Check fetch all user start: ", action);
                  return {
                        ...state,
                  };
            case actionTypes.FETCH_ALL_USER_SUCCESS:
                  // console.log('Check fetch all user success: ', action);
                  state.allUsers = action.dataUsers;
                  return {
                        ...state,
                  };
            // DELETE USER
            case actionTypes.DELETE_USER_START:
                  console.log("Delete user start: ", action);
                  return {
                        ...state,
                  };
            case actionTypes.DELETE_USER_SUCCESS:
                  // console.log('Delete user success: ', action);
                  return {
                        ...state,
                  };
            case actionTypes.DELETE_USER_FAILED:
                  console.log("Delete user failed: ", action);
                  return {
                        ...state,
                  };
            // UPDATE USER
            case actionTypes.UPDATE_USER_START:
                  console.log("Update user start: ", action);
                  return {
                        ...state,
                  };
            case actionTypes.UPDATE_USER_SUCCESS:
                  // console.log('Update user success: ', action);
                  return {
                        ...state,
                  };
            case actionTypes.UPDATE_USER_FAILED:
                  console.log("Update user failed: ", action);
                  return {
                        ...state,
                  };
            default:
                  return state;
      }
};

export default adminReducer;
