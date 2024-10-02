import axios from "../axios";
// import * as queryString from 'query-string';

const adminService = {
  /**
   * Đăng nhập hệ thống
   * {
   *  "username": "string",
   *  "password": "string"
   * }
   */
  login(loginBody) {
    return axios.post(`/admin/login`, loginBody);
  },

  createJob(data) {
    return axios.post("/api/create-job", data);
  },
  getAllJob(data) {
    return axios.get("/api/all-job", { params: { access_token: data } });
  },
  editJob(data) {
    return axios.post("/api/edit-job", data);
  },
  deleteJob(data) {
    return axios.post("/api/delete-job", data);
  },
};

export default adminService;
