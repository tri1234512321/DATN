/** @format */

import axios from "axios";
// import _ from 'lodash';

const instance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      // withCredentials: true
});
//change  cookie
instance.defaults.withCredentials = true;

instance.interceptors.response.use(
      (response) => {
            // const {data} = response;
            return response.data;
      },
      function (error) {
            const status = (error && error.response && error.response.status) || 500;
            switch (status) {
                  // authentication (token related issues)
                  case 401: {
                        return Promise.reject(error, 409);
                  }

                  // forbidden (permission related issues)
                  case 403: {
                        return Promise.reject(error, 409);
                  }

                  // bad request
                  case 400: {
                        return Promise.reject(error, 400);
                  }

                  // not found
                  case 404: {
                        return Promise.reject(error, 404);
                  }

                  // conflict
                  case 409: {
                        return Promise.reject(error, 409);
                  }

                  // unprocessable
                  case 422: {
                        return Promise.reject(error, 422);
                  }

                  // generic api error (server related) unexpected
                  default: {
                        return Promise.reject(error, 500);
                  }
            }
      },
);

export default instance;
