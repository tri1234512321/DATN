import axios from "../axios";

const shopService = {
  /**
   * Lấy tất cả sản phẩm của shop
   * @param {string} idInput
   * @param {string} access_token
   */
  shopGetAllProduct(idInput, access_token) {
    return axios.get(`/api/shop-get-all-product`, {
      params: { id: idInput, access_token: access_token },
    });
  },

  /**
   * Tạo sản phẩm mới
   * @param {Object} data
   */
  createNewItemProduct(data) {
    return axios.post("/api/create-new-item-product", data);
  },

  /**
   * Xóa sản phẩm
   * @param {string} id
   * @param {string} access_token
   */
  deleteProductService(id, access_token) {
    return axios.delete(`/api/delete-item-product`, {
      params: { id: id, access_token: access_token },
    });
  },

  /**
   * Lấy thông tin sản phẩm
   * @param {string} id
   * @param {string} access_token
   */
  getItemProduct(id, access_token) {
    return axios.get(`/api/shop-get-item-product`, {
      params: { id: id, access_token: access_token },
    });
  },

  /**
   * Cập nhật sản phẩm
   * @param {Object} dataItem
   */
  updateProductService(dataItem) {
    return axios.post("/api/update-item-product", dataItem);
  },

  createIntroduceExtra(data) {
    return axios.post("/api/create-introduce-extra", data);
  },

  getIntroduceExtra(id, access_token) {
    return axios.get("/api/get-introduce-extra", {
      params: { id: id, access_token: access_token },
    });
  },

  createIntroduceShop(data) {
    return axios.post("/api/create-introduce-shop", data);
  },
  getIntroduce(access_token) {
    return axios.get("/api/get-introduce", {
      params: { access_token: access_token },
    });
  },
  deleteIntroduceExtra(id, access_token) {
    return axios.delete("/api/delete-introduce-extra", {
      params: { id: id, access_token: access_token },
    });
  },
  createVoucher(data) {
    return axios.post("/api/create-voucher", data);
  },
  getAllVoucher(access_token) {
    return axios.get("/api/get-all-vourcher-shop", {
      params: { access_token: access_token },
    });
  },
};

export default shopService;
