/** @format */
import React, { Component, Fragment } from "react";
import { Buffer } from "buffer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import CommonUtils from "../../../utils/CommonUtils";
import ModalRemove from "../../Admin/ModalRemove";
import shopService from "../../../services/shopService";
import "./ManageFood.scss";

class ManageFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      previewImage: "",
      imageItem: "",
      secondImageFood: [],
      isModalRemoveOpen: false,
      idProductDeleted: "",
      isUpdateItem: false,
      idItemUpdate: "",
      isImageModalOpen: false,
      selectedImage: "",
    };
    this.priceItemRef = React.createRef();
    this.foodNameRef = React.createRef();
    this.descItemRef = React.createRef();
  }

  async componentDidMount() {
    const access_token = this.props.userInfo.data.access_token;
    await this.props.getAllProduct(access_token);
  }

  handleCheckIvalide = () => {
    if (!this.state.imageItem) {
      alert("Missing image food!");
      return false;
    }
    const fields = [
      { ref: this.priceItemRef, message: "Missing price!" },
      { ref: this.foodNameRef, message: "Missing name food!" },
      { ref: this.descItemRef, message: "Missing description food!" },
    ];

    for (let field of fields) {
      if (!field.ref.current.value) {
        alert(field.message);
        return false;
      }
    }

    return true;
  };

  handleCreateItem = async () => {
    if (!this.handleCheckIvalide()) return;
    let priceItem = this.priceItemRef.current.value;
    let foodName = this.foodNameRef.current.value;
    let descItem = this.descItemRef.current.value;

    const access_token = this.props.userInfo.data.access_token;
    const data = {
      priceItem: priceItem,
      foodName: foodName,
      descItem: descItem,
      imageItem: this.state.imageItem,
      secondImageFood: this.state.secondImageFood,
      access_token,
    };
    console.log("check data: ", data);
    await this.props.createItemProduct(data, access_token);
    this.priceItemRef.current.value = "";
    this.foodNameRef.current.value = "";
    this.descItemRef.current.value = "";
    this.setState({
      imageItem: "",
      previewImage: "",
      secondImageFood: [], // Reset ảnh phụ
    });
  };

  handleUpdateItemProduct = async () => {
    const access_token = this.props.userInfo.data.access_token;

    let priceItem = this.priceItemRef.current.value;
    let foodName = this.foodNameRef.current.value;
    let descItem = this.descItemRef.current.value;

    const dateItem = {
      id: this.state.idItemUpdate,
      price: priceItem,
      foodName: foodName,
      descFood: descItem,
      primaryImage: this.state.imageItem,
      secondImageFood: this.state.secondImageFood,
      access_token,
    };
    await this.props.updateItemProduct(dateItem);
    this.priceItemRef.current.value = "";
    this.foodNameRef.current.value = "";
    this.descItemRef.current.value = "";
    this.setState({
      idItemUpdate: "",
      imageItem: "",
      previewImage: "",
      secondImageFood: [], // Reset ảnh phụ
    });
  };

  toggleUpdateItemProduct = async (id) => {
    const access_token = this.props.userInfo.data.access_token;
    const item = await shopService.getItemProduct(id, access_token);
    console.log("items: ", item);
    let imageBase64 = "";
    if (item.item.primaryImage) {
      imageBase64 = new Buffer(item.item.primaryImage, "base64").toString(
        "binary"
      );
    }
    this.priceItemRef.current.value = item.item.price;
    this.foodNameRef.current.value = item.item.foodName;
    this.descItemRef.current.value = item.item.descFood;
    this.setState({
      isUpdateItem: true,
      idItemUpdate: id,
      previewImage: imageBase64,
      secondImageFood: item.item.secondImageFood,
      imageItem: item.item.imageItem,
    });
  };

  handleCancel = () => {
    this.setState({
      descItem: "",
      priceItem: "",
      foodName: "",
      imageItem: "",
      previewImage: "",
      isUpdateItem: false,
    });
  };

  handleDeleteProduct = async () => {
    try {
      const idProductDeleted = this.state.idProductDeleted;
      const access_token = this.props.userInfo.data.access_token;
      await this.props.deleteProduct(idProductDeleted, access_token);
      this.setState({ isModalRemoveOpen: false });
    } catch (e) {
      console.error(e);
    }
  };

  handleCancelRemove = () => {
    this.setState({ isModalRemoveOpen: false });
  };

  openPreview = (imageUrl) => {
    if (imageUrl) {
      this.setState({
        isImageModalOpen: true,
        selectedImage: imageUrl,
      });
    }
  };

  handleChangeInput = (event, id) => {
    this.setState({ [id]: event.target.value });
  };

  handleChooseAvatar = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const objectURL = URL.createObjectURL(file);
      this.setState({ previewImage: objectURL, imageItem: base64 });
    }
  };
  handleChooseSecondaryImages = async (event) => {
    let files = Array.from(event.target.files);
    let base64Array = [];
    for (let file of files) {
      let base64 = await CommonUtils.getBase64(file);
      base64Array.push(base64);
    }

    // Kết hợp ảnh mới với ảnh phụ hiện tại
    this.setState((prevState) => ({
      secondImageFood: [...prevState.secondImageFood, ...base64Array],
    }));
  };
  renderSecondaryImages = () => {
    return this.state.secondImageFood.map((image, index) => {
      let imageSecond = "";
      if (image?.secondImageFood?.type === "Buffer") {
        imageSecond = new Buffer(image.secondImageFood, "base64").toString(
          "binary"
        );
      }
      return (
        <div key={index} className="secondary-image-preview relative">
          {image?.secondImageFood?.type === "Buffer" ? (
            <div
              className="imageSecond"
              style={{ backgroundImage: `url(${imageSecond})` }}
            ></div>
          ) : (
            <img src={image} alt={`Ảnh phụ ${index + 1}`} />
          )}
          <button
            type="button"
            className="absolute top-[2px] right-[10px] text-white bg-gray-800 rounded-full p-1 hover:bg-gray-600"
            onClick={() => this.handleRemoveSecondaryImage(index)}
          >
            <FontAwesomeIcon
              className="pt-[1px] px-[3px]"
              icon={icon({ name: "times" })}
            />
          </button>
        </div>
      );
    });
  };

  handleRemoveSecondaryImage = (index) => {
    this.setState((prevState) => ({
      secondImageFood: prevState.secondImageFood.filter((_, i) => i !== index),
    }));
  };
  handleClearSecondaryImages = () => {
    this.setState({
      secondImageFood: [],
    });
  };

  handleUpdateStateProduct = async (idProduct, available) => {
    const access_token = this.props.userInfo.data.access_token;
    const dateItem = {
      id: idProduct,
      available: available ? 0 : 1,
      access_token,
    };
    console.log("data: ", dateItem);
    await this.props.updateItemProduct(dateItem);
  };

  render() {
    const { dataProduct } = this.props;
    console.log("this.seconimage: ", this.state.secondImageFood);
    const lastProduct = dataProduct[0];
    let imageLastProduct = "";
    if (lastProduct) {
      imageLastProduct = new Buffer(
        lastProduct.primaryImage,
        "base64"
      ).toString("binary");
    }
    return this.props?.userInfo?.data?.user.enable === "TRUE" ? (
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

        <div className="manage-food-container">
          <div className="add-item-section">
            <div className="new-item-form col-8">
              <div className="image-selection">
                <div
                  className="image-preview"
                  onClick={() => this.openPreview(this.state.previewImage)}
                >
                  <div
                    className="image"
                    style={{
                      backgroundImage: `url('${this.state.previewImage}')`,
                    }}
                  ></div>
                </div>
                <label htmlFor="choose-item" className="upload-label">
                  <FontAwesomeIcon icon={icon({ name: "upload" })} />
                  Chọn ảnh chính cho sản phẩm
                </label>
                <input
                  type="file"
                  id="choose-item"
                  name="choose-item"
                  hidden
                  onChange={this.handleChooseAvatar}
                />
              </div>
              <div className="image-selection">
                {this.state.secondImageFood &&
                  this.state.secondImageFood.length > 0 && (
                    <div className="secondary-images-preview">
                      {this.renderSecondaryImages()}
                    </div>
                  )}
                <label
                  htmlFor="choose-secondary-items"
                  className="upload-label"
                >
                  <FontAwesomeIcon icon={icon({ name: "upload" })} />
                  Chọn ảnh phụ cho sản phẩm (Chọn 1 hoặc nhiều ảnh)
                </label>
                <input
                  type="file"
                  id="choose-secondary-items"
                  name="choose-secondary-items"
                  hidden
                  multiple
                  onChange={this.handleChooseSecondaryImages}
                />
                {this.state.secondImageFood?.length > 0 && (
                  <button
                    type="button"
                    className="clear-secondary-images-button"
                    onClick={this.handleClearSecondaryImages}
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="item-details">
                <div className="input-group">
                  <label>Nhập giá</label>
                  <input
                    type="number"
                    pattern="\d*"
                    inputMode="numeric"
                    ref={this.priceItemRef}
                    placeholder="Nhập giá món ăn (...20000)"
                  />
                </div>
                <div className="input-group">
                  <label>Tên món</label>
                  <input
                    ref={this.foodNameRef}
                    placeholder="Nhập tên món ăn của bạn"
                  />
                </div>
                <div className="input-group">
                  <label>Mô tả sản phẩm</label>
                  <textarea
                    ref={this.descItemRef}
                    placeholder="Nhập mô tả món ăn của bạn..."
                    className="desc-textarea"
                  />
                </div>
              </div>
              <div className="action-buttons">
                {this.state.isUpdateItem ? (
                  <button
                    className="update-btn"
                    onClick={this.handleUpdateItemProduct}
                  >
                    Cập nhật
                  </button>
                ) : (
                  <button
                    className="create-btn"
                    onClick={this.handleCreateItem}
                  >
                    Thêm sản phẩm
                  </button>
                )}
                {(this.priceItemRef?.current?.value ||
                  this.foodNameRef?.current?.value ||
                  this.descItemRef?.current?.value) && (
                  <button className="cancel-btn" onClick={this.handleCancel}>
                    Hủy
                  </button>
                )}
              </div>
            </div>
            <div className="latest-item-section col-4">
              {lastProduct ? (
                <>
                  <div className="latest-item-header">
                    Sản phẩm thêm gần nhất
                  </div>
                  {imageLastProduct ? (
                    <div className="w-full">
                      <div
                        className="image-preview-last"
                        onClick={() => this.openPreview(imageLastProduct)}
                      >
                        <div
                          className="image-last"
                          style={{
                            backgroundImage: `url('${imageLastProduct}')`,
                          }}
                        >
                          <div className="overlay">
                            <FontAwesomeIcon
                              icon={icon({ name: "expand" })}
                              className="expand-icon"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="product-price my-4 text-center">
                        Giá: {lastProduct.price} <sup>₫</sup>
                      </div>
                      <p className="product-description text-center">
                        {lastProduct.foodName} | {lastProduct.descFood}
                      </p>
                    </div>
                  ) : (
                    <div>Chưa có món ăn nào</div>
                  )}
                </>
              ) : (
                <div>Không có</div>
              )}
              <div className="latest-item-actions">
                <button
                  className="remove-btn"
                  onClick={() =>
                    this.setState({
                      isModalRemoveOpen: true,
                      idProductDeleted: lastProduct.id,
                    })
                  }
                >
                  Xóa
                </button>
                <button
                  className="edit-btn"
                  onClick={() => this.toggleUpdateItemProduct(lastProduct.id)}
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
          <div className="products-grid">
            {dataProduct &&
              dataProduct.map((product) => {
                let imageBase64 = "";
                if (product.primaryImage) {
                  imageBase64 = new Buffer(
                    product.primaryImage,
                    "base64"
                  ).toString("binary");
                }
                return (
                  <div className="product-card" key={product.id}>
                    <div
                      className="product-image"
                      onClick={() => this.openPreview(imageBase64)}
                      style={{ backgroundImage: `url('${imageBase64}')` }}
                    >
                      <div className="overlay">
                        <FontAwesomeIcon
                          icon={icon({ name: "expand" })}
                          className="expand-icon"
                        />
                      </div>
                    </div>
                    <div className="product-info">
                      <p className="product-description">
                        {product.foodName} | {product.descFood}
                      </p>
                      <div className="product-rating">
                        <FontAwesomeIcon
                          icon={icon({ name: "star" })}
                          className="star-icon"
                        />
                        <FontAwesomeIcon
                          icon={icon({ name: "star" })}
                          className="star-icon"
                        />
                        <FontAwesomeIcon
                          icon={icon({ name: "star" })}
                          className="star-icon"
                        />
                        <FontAwesomeIcon
                          icon={icon({ name: "star" })}
                          className="star-icon"
                        />
                        <FontAwesomeIcon
                          icon={icon({ name: "star" })}
                          className="star-icon"
                        />
                        <span className="purchase-count">| Lượt mua: 123</span>
                      </div>
                      <div className="product-price">
                        Giá: {product.price} <sup>₫</sup>
                      </div>
                    </div>
                    <div className="product-actions">
                      <button
                        className="delete-btn"
                        onClick={() =>
                          this.setState({
                            isModalRemoveOpen: true,
                            idProductDeleted: product.id,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={icon({ name: "trash-alt" })} />
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => this.toggleUpdateItemProduct(product.id)}
                      >
                        <FontAwesomeIcon icon={icon({ name: "pencil-alt" })} />
                      </button>
                      <label
                        className="flex items-center content-center cursor-pointer m-0 py-[auto]"
                        onClick={() =>
                          this.handleUpdateStateProduct(
                            product.id,
                            product.available
                          )
                        }
                      >
                        <input
                          type="checkbox"
                          checked={product.available}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {this.state.isModalRemoveOpen && (
          <ModalRemove
            isModalRemoveOpen={this.state.isModalRemoveOpen}
            handleRemove={this.handleDeleteProduct}
            handleCancelRemove={this.handleCancelRemove}
          />
        )}
      </Fragment>
    ) : (
      <Fragment />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    dataProduct: state.shop.dataProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProduct: (access_token) =>
      dispatch(actions.fetchAllItemProductStart(access_token)),
    createItemProduct: (data, access_token) =>
      dispatch(actions.fetchCreateItemProduct(data, access_token)),
    deleteProduct: (id, access_token) =>
      dispatch(actions.deleteProductStart(id, access_token)),
    updateItemProduct: (data, access_token) =>
      dispatch(actions.updateProductStart(data, access_token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageFood);
