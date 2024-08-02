/** @format */

import actionTypes from "../actions/actionTypes";

const initialState = {
      isLoggedIn: false,
      userInfo: null,
};

const userReducer = (state = initialState, action) => {
      switch (action.type) {
            case actionTypes.USER_LOGIN_SUCCESS:
                  return {
                        ...state,
                        isLoggedIn: true,
                        userInfo: action.userInfo,
                  };
            case actionTypes.USER_LOGIN_FAIL:
                  return {
                        ...state,
                        isLoggedIn: false,
                        userInfo: null,
                  };
            case actionTypes.PROCESS_LOGOUT:
                  localStorage.setItem("access_token", JSON.stringify("null"));
                  return {
                        ...state,
                        isLoggedIn: false,
                        userInfo: null,
                  };
            default:
                  return state;
      }
};

export default userReducer;
