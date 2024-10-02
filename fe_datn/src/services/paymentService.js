/** @format */

import axios from "../axios";
const paymentBill = (data) => {
  return axios.post(`/api/payment/payment`, data);
};

export {
  paymentBill,
}