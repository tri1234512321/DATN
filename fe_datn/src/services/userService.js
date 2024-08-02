/** @format */

import axios from "../axios";

const handleLoginApi = (yourEmail, yourPassword) => {
      return axios.post("/api/login", { email: yourEmail, password: yourPassword });
};

const adminGetAllusers = (idInput, access_token) => {
      return axios.get(`/api/admin-get-all-users`, { params: { id: idInput, access_token: access_token } });
};

const adminGetAllShops = (idInput, access_token) => {
      return axios.get(`/api/admin-get-all-shops`, { params: { id: idInput, access_token: access_token } });
};
const adminGetAllShippers = (idInput, access_token) => {
      return axios.get(`/api/admin-get-all-shippers`, { params: { id: idInput, access_token: access_token } });
};
const adminGetAllBuyers = (idInput, access_token) => {
      return axios.get(`/api/admin-get-all-buyers`, { params: { id: idInput, access_token: access_token } });
};

const createNewUserService = (data) => {
      console.log("check data from service: ", data);
      return axios.post("/api/create-new-user", data);
};

const editUserService = (data) => {
      return axios.put("/api/edit-user", data);
};

const changePasswordService = (data) => {
      return axios.put("/api/change-password", data);
};
const deleteUserService = (userId) => {
      return axios.delete("/api/delete-user", {
            data: {
                  id: userId,
            },
      });
};

const changeStatusUser = (userId, status) => {
      return axios.put("/api/change-status-user", {
            data: {
                  id: userId,
                  status: status,
            },
      });
};

const getLocationById = (idLocation) => {
      return axios.get(`/api/get-location-by-id?idLocation=${idLocation}`);
};
const getSensorById = (idSensor) => {
      return axios.get(`/api/get-sensor?idSensor=${idSensor}`);
};

const changeSensorById = (data) => {
      return axios.put("/api/update-sensor", data);
};

const getDeviceById = (idDevice) => {
      return axios.get(`/api/get-device?idDevice=${idDevice}`);
};

const getAllHistoryById = (idEquipt, type) => {
      return axios.get(`/api/get-all-history?idEquipt=${idEquipt}&type=${type}`);
};

const changeStatusDevice = (id, status) => {
      return axios.put("/api/set-status-device", {
            data: {
                  id: id,
                  status: status,
            },
      });
};
export {
      handleLoginApi,
      adminGetAllusers,
      adminGetAllShops,
      adminGetAllShippers,
      adminGetAllBuyers,
      createNewUserService,
      editUserService,
      changePasswordService,
      deleteUserService,
      changeStatusUser,
      getLocationById,
      getSensorById,
      changeSensorById,
      getDeviceById,
      getAllHistoryById,
      changeStatusDevice,
};
