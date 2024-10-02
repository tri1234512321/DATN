import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./HomeShop.scss";
import shopService from "../../../services/shopService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { toast } from "react-toastify";
import { Buffer } from "buffer";
import ModalRemove from "../../Admin/ModalRemove";

class HomeShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageShop: null,
      imageShopSecond: null,
      introduction: "",
      introductionSecond: "",
      listIntroduceExtra: [],
      moreInfo: [],
      startTime: "08:00",
      endTime: "22:00",
      voucherDish: "all", // Món ăn áp dụng cho voucher
      voucherQuantity: 1, // Số lượng voucher
      typeVoucher: "normal", // Loại voucher
      discount: "", // Phần trăm giảm giá
      voucherStartTime: "", // Thời gian bắt đầu áp dụng voucher
      voucherEndTime: "", // Thời gian kết thúc hiệu lực voucher,
      loading: false,
      isIntroduce: false,
      isIntroduceSecond: false,
      allVoucher: [],
      idUpdateShopExtra: null,
      isImageModalOpen: false,
      selectedImage: "",
      isModalRemoveOpen: false,
      idDeleted: null,
    };
  }

  async componentDidMount() {
    if (this.props.userInfo.data.user.roleId !== "SHOP") {
      const { navigate } = this.props;
      navigate("/page-not-found");
    }

    const access_token = localStorage.getItem("access_token");
    this.getDataIntroduceShop(access_token);
    this.handleGetAllExtraShop();
    let resultVoucher = await shopService.getAllVoucher(access_token);
    this.setState({
      allVoucher: resultVoucher,
    });
  }

  handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ imageShop: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  handleImageSecond = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          imageShopSecond: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  handleDescriptionChange = (e) => {
    this.setState({ introduction: e.target.value });
  };
  handleDescriptionChangeSecond = (e) => {
    this.setState({ introductionSecond: e.target.value });
  };

  handleAddMoreInfo = () => {
    const { introduction, moreInfo } = this.state;
    if (introduction.trim()) {
      this.setState({
        moreInfo: [...moreInfo, introduction],
        introduction: "",
      });
    }
  };

  clearDataIntroduce = () => {
    this.setState({
      imageShop: "",
      introduction: "",
      startTime: "08:00",
      endTime: "21:00",
    });
  };
  clearDataIntroduceExtra = () => {
    this.setState({
      idUpdateShopExtra: null,
      imageShopSecond: "",
      introductionSecond: "",
    });
  };

  getDataIntroduceShop = async (access_token) => {
    const dataIntroduce = await shopService.getIntroduce(access_token);
    // console.log("dataIntroduce: ", dataIntroduce);
    // introduce shop is exist
    if (dataIntroduce?.EC === 0) {
      this.setState({
        isIntroduce: true,
      });
      let imageBase64 = "";
      if (dataIntroduce.data.imageShop) {
        imageBase64 = new Buffer(
          dataIntroduce.data.imageShop,
          "base64"
        ).toString("binary");
      }

      this.setState({
        imageShop: imageBase64,
        introduction: dataIntroduce?.data?.introduction,
        startTime: dataIntroduce?.data?.startTime,
        endTime: dataIntroduce?.data?.endTime,
      });
    } else {
      this.setState({
        isIntroduce: false,
      });
    }
  };

  handleSave = async () => {
    const { imageShop, introduction, startTime, endTime } = this.state;
    const access_token = localStorage.getItem("access_token");
    const shopInfo = {
      access_token,
      imageShop,
      introduction,
      startTime: startTime,
      endTime: endTime,
    };
    let data = await shopService.createIntroduceShop(shopInfo);
    if (data.EC === 0) {
      // call func clear data
      // this.clearDataIntroduce();
      this.setState({
        isIntroduce: true,
      });
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
    console.log("Lưu ảnh chính:", shopInfo);
  };

  handleGetAllExtraShop = async () => {
    const access_token = localStorage.getItem("access_token");
    let data = await shopService.getIntroduceExtra("all", access_token);
    this.setState({
      listIntroduceExtra: data.data,
    });
    console.log("data extra: ", data);
  };

  handleSaveExtra = async () => {
    const { imageShopSecond, introductionSecond } = this.state;
    const access_token = localStorage.getItem("access_token");
    const shopInfoExtra = {
      access_token,
      secondImageFood: imageShopSecond,
      desc: introductionSecond,
    };
    // if have idExtra, execute update with idExtra
    if (this.state.idUpdateShopExtra) {
      shopInfoExtra.id = this.state.idUpdateShopExtra;
    }
    let data = await shopService.createIntroduceExtra(shopInfoExtra);
    console.log("data:", data);
    if (data.EC === 0) {
      // call func clear data
      this.clearDataIntroduceExtra();
      this.handleGetAllExtraShop();
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
    console.log("Lưu ảnh phụ:", shopInfoExtra);
  };
  hanleUpdateExtra = (id) => {
    // get data with id
    let dataUpdate = this.state.listIntroduceExtra.filter(
      (intro) => intro.id === id
    )[0];
    let imageString = new Buffer(dataUpdate.secondImageFood, "base64").toString(
      "binary"
    );
    this.setState({
      introductionSecond: dataUpdate.desc,
      imageShopSecond: imageString,
      idUpdateShopExtra: id,
    });
    // imageShopSecond
    //introductionSecond
  };
  handleDeleteExtra = async () => {
    try {
      const id = this.state.idDeleted;
      const access_token = localStorage.getItem("access_token");
      let data = await shopService.deleteIntroduceExtra(id, access_token);
      if (data.EC === 0) {
        toast.success(data.EM);
        this.handleGetAllExtraShop();
      } else {
        toast.error(data.EM);
      }
      this.setState({
        idDeleted: null,
      });
      this.setState({ isModalRemoveOpen: false });
    } catch (e) {
      console.error(e);
    }
  };
  handleCancelRemove = () => {
    this.setState({ isModalRemoveOpen: false });
  };

  generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  handleVoucherSave = async () => {
    this.setState({ loading: true }); // Bật loading
    const access_token = localStorage.getItem("access_token");
    const {
      voucherDish,
      voucherQuantity,
      typeVoucher,
      discount,
      voucherStartTime,
      voucherEndTime,
    } = this.state;
    let idFoodused;
    if (voucherDish === "all") {
      idFoodused = 0;
    } else {
      idFoodused = Number(voucherDish);
    }
    const codes = Array.from({ length: voucherQuantity }, () =>
      this.generateRandomString(12)
    );

    const voucherData = {
      access_token: access_token,
      idFoodused: idFoodused,
      code: codes,
      typeVoucher: typeVoucher,
      discount: discount,
      startTime: voucherStartTime,
      endTime: voucherEndTime,
    };

    try {
      let result = await shopService.createVoucher(voucherData);
      if (result.EC === 0) {
        toast.success(result.EM);
      } else {
        toast.error(result.EM);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      this.setState({ loading: false }); // Tắt loading
    }
  };

  openPreview = (imageUrl) => {
    if (imageUrl) {
      this.setState({
        isImageModalOpen: true,
        selectedImage: imageUrl,
      });
    }
  };

  render() {
    const {
      imageShop,
      imageShopSecond,
      introduction,
      listIntroduceExtra,
      introductionSecond,
      startTime,
      endTime,
      voucherDish,
      voucherQuantity,
      typeVoucher,
      discount,
      voucherStartTime,
      voucherEndTime,
      loading,
      allVoucher,
    } = this.state;

    return (
      <Fragment>
        {this.state.isImageModalOpen && (
          <div
            className="image-modal"
            onClick={() => this.setState({ isImageModalOpen: false })}
          >
            <div className="image-modal-content">
              <img src={this.state.selectedImage} alt="Preview" />
            </div>
          </div>
        )}
        {this.state.isModalRemoveOpen && (
          <ModalRemove
            isModalRemoveOpen={this.state.isModalRemoveOpen}
            handleRemove={this.handleDeleteExtra}
            handleCancelRemove={this.handleCancelRemove}
          />
        )}
        <div className="shop-container-infor mx-4">
          {/* Ảnh và thông tin chính */}
          <div className="wrap-container my-4 mx-4 rounded-lg p-4 px-5 shadow-lg">
            {/* Form thông tin cửa hàng */}
            {/* Chọn ảnh chính */}
            <h1 className="text-center text-3xl font-bold text-gray-900 mb-4">
              Thông tin giới thiệu chính
            </h1>
            <div className="attraction">
              <div className="avatar-shop">
                <div className="avatar">
                  {imageShop ? (
                    <img
                      src={imageShop}
                      alt="Avatar"
                      className="avatar-image"
                    />
                  ) : (
                    "Avatar shop"
                  )}
                </div>
                <div className="update-new-avatar-shop">
                  <button
                    type="button"
                    disabled={this.state.isIntroduce} // Khóa nút khi isIntroduce === true
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    } // Kích hoạt chọn file
                    className={`cursor-pointer border border-gray-300 inline-block px-3 py-1.5 mt-2 rounded-md bg-gray-200 ${
                      this.state.isIntroduce === true
                        ? "pointer-events-none opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Chọn ảnh chính
                  </button>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={this.handleAvatarChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="desc-attract">
                <textarea
                  value={introduction}
                  onChange={this.handleDescriptionChange}
                  placeholder="Mô tả shop của bạn"
                  disabled={this.state.isIntroduce}
                  className={`${
                    this.state.isIntroduce === true
                      ? "pointer-events-none opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                />
                <div
                  className={`working-hours ${
                    this.state.isIntroduce === true
                      ? "pointer-events-none opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <label>
                    Giờ bắt đầu:
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) =>
                        this.setState({ startTime: e.target.value })
                      }
                      min="08:00"
                      max="22:00"
                      disabled={this.state.isIntroduce}
                    />
                  </label>
                  <label>
                    Giờ kết thúc:
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) =>
                        this.setState({ endTime: e.target.value })
                      }
                      min="08:00"
                      max="22:00"
                      disabled={this.state.isIntroduce}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="btn-save">
              {this.state.isIntroduce === false ? (
                <button onClick={this.handleSave} className="save-button">
                  Lưu thông tin
                </button>
              ) : (
                <button
                  onClick={() => this.setState({ isIntroduce: false })}
                  className="update-button"
                >
                  Thay đổi thông tin
                </button>
              )}
            </div>
          </div>
          {/* Ảnh và thông tin phụ */}
          <div className="wrap-container my-4 mx-4 rounded-lg p-4 px-5 shadow-lg">
            {/* Form thông tin cửa hàng */}
            {/* Chọn ảnh chính */}
            <h1 className="text-center text-3xl font-bold text-gray-900 mb-4">
              Các thông tin giới thiệu thêm
            </h1>
            <div className="wrap-info-extra">
              <div className="form-create">
                <div className="attraction-extra">
                  <div className="image-extra">
                    <div className="image">
                      {imageShopSecond ? (
                        imageShopSecond.type === "Buffer" ? (
                          <div
                            className="bg-center bg-cover mr-2 h-full p-1 rounded-lg border-2 border-gray-300"
                            style={{
                              backgroundImage: `url(${new Buffer(
                                imageShopSecond,
                                "base64"
                              ).toString("binary")})`,
                            }}
                          ></div>
                        ) : (
                          <img
                            src={imageShopSecond}
                            alt="Ảnh mô tả thêm"
                            className="introduce-image-extra"
                          />
                        )
                      ) : (
                        <div className="image-placeholder flex flex-col items-center justify-center h-full text-gray-500">
                          <FontAwesomeIcon
                            className="icon-image text-6xl"
                            icon={icon({
                              name: "image",
                            })}
                          />
                          <p>Chọn ảnh mô tả thêm về cửa hàng</p>
                        </div>
                      )}
                    </div>
                    <div className="update-extra mt-2">
                      <button
                        type="button"
                        // disabled={this.state.isIntroduceSecond}
                        onClick={() =>
                          document.getElementById("file-upload-second").click()
                        }
                        className={`flex items-center justify-center border border-gray-300 px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 transition-all`}
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6M9 16h6M9 8h6"
                          />
                        </svg>
                        {/* {this.state.isIntroduceSecond
                          ? "Chọn ảnh mô tả thêm"
                          : "Chọn ảnh mô tả thêm"} */}
                        Chọn ảnh mô tả thêm
                      </button>
                      <input
                        id="file-upload-second"
                        type="file"
                        accept="image/*"
                        onChange={this.handleImageSecond}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                  <div className="desc-attract-extra">
                    <textarea
                      value={introductionSecond}
                      onChange={this.handleDescriptionChangeSecond}
                      placeholder="Mô tả thêm về cửa hàng của bạn"
                      // disabled={this.state.isIntroduceSecond}
                      // className={`${
                      //   this.state.isIntroduceSecond === true
                      //     ? "pointer-events-none opacity-50 cursor-not-allowed"
                      //     : ""
                      // }`}
                    />
                  </div>
                </div>
                <div className="btn-save">
                  <button
                    onClick={this.handleSaveExtra}
                    className="save-button"
                  >
                    Lưu thông tin
                  </button>
                </div>
                <div className="list-extra-introduce mt-10">
                  {listIntroduceExtra &&
                    listIntroduceExtra.map((introExtra) => {
                      let imageBase64 = "";
                      if (introExtra.secondImageFood) {
                        imageBase64 = new Buffer(
                          introExtra.secondImageFood,
                          "base64"
                        ).toString("binary");
                      }
                      return (
                        <div
                          className="border border-gray-300 rounded-lg m-2 py-4 px-0"
                          key={introExtra.id}
                        >
                          <div className="info-extra flex justify-between">
                            <div
                              className="extra-image-introduce"
                              onClick={() => this.openPreview(imageBase64)}
                              style={{
                                backgroundImage: `url('${imageBase64}')`,
                              }}
                            >
                              <div className="overlay">
                                <FontAwesomeIcon
                                  icon={icon({ name: "expand" })}
                                  className="expand-icon"
                                />
                              </div>
                            </div>
                            <div className="desc-extra">
                              {introExtra?.desc || "Không có dữ liệu"}
                            </div>
                          </div>
                          <div className="wrap-btn flex justify-center">
                            <div className="flex justify-between w-[200px]">
                              <button
                                className="edit-btn"
                                onClick={() =>
                                  this.hanleUpdateExtra(introExtra.id)
                                }
                              >
                                {" "}
                                Chỉnh sửa
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() =>
                                  this.setState({
                                    isModalRemoveOpen: true,
                                    idDeleted: introExtra.id,
                                  })
                                }
                              >
                                {" "}
                                Xoá
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          {/* Form tạo voucher */}
          <div className="voucher-form">
            <h3>Tạo Voucher</h3>
            <label>
              Món ăn áp dụng:
              <select
                value={voucherDish}
                onChange={(e) => this.setState({ voucherDish: e.target.value })}
              >
                <option value="all">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>
            <label>
              Số lượng voucher:
              <input
                type="number"
                value={voucherQuantity}
                onChange={(e) =>
                  this.setState({ voucherQuantity: e.target.value })
                }
                min="1"
              />
            </label>
            <label>
              Loại voucher:
              <select
                value={typeVoucher}
                onChange={(e) => this.setState({ typeVoucher: e.target.value })}
              >
                <option value="vip">Giảm giá đặc biệt</option>
                <option value="normal">Giảm giá thường</option>
              </select>
            </label>
            <label>
              Phần trăm giảm giá:
              <input
                type="number"
                value={discount}
                onChange={(e) => this.setState({ discount: e.target.value })}
                min="0"
                max="100"
              />
            </label>
            <label>
              Thời gian bắt đầu:
              <input
                type="datetime-local"
                value={voucherStartTime}
                onChange={(e) =>
                  this.setState({ voucherStartTime: e.target.value })
                }
              />
            </label>
            <label>
              Thời gian kết thúc:
              <input
                type="datetime-local"
                value={voucherEndTime}
                onChange={(e) =>
                  this.setState({ voucherEndTime: e.target.value })
                }
              />
            </label>
            <div className="btn-save">
              <button
                onClick={this.handleVoucherSave}
                className="save-button"
                disabled={loading} // Disable nút khi loading
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Save Voucher"
                )}
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeShop);
