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
import StarRating from "../../../components/AllFoodItem/StarRating";
import Close from "@/assets/social/close-blue.png";

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
    this.discountRef = React.createRef();
    this.foodNameRef = React.createRef();
    this.descItemRef = React.createRef();
    this.categoryRef = React.createRef();
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
      { ref: this.discountRef, message: "Missing discount!" },
      { ref: this.categoryRef, message: "Missing category!" },
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
    let discountItem = this.discountRef.current.value;
    let foodName = this.foodNameRef.current.value;
    let categoryName = this.categoryRef.current.value;
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
    this.discountRef.current.value = "";
    this.categoryRef.current.value = "";
    this.foodNameRef.current.value = "";
    this.descItemRef.current.value = "";
    this.setState({
      imageItem: "",
      previewImage: "",
      secondImageFood: [], // Reset ảnh phụ
      isOpen:false
    });
  };

  handleUpdateItemProduct = async () => {
    const access_token = this.props.userInfo.data.access_token;

    let priceItem = this.priceItemRef.current.value;
    let discount = this.discountRef.current.value;
    let category = this.categoryRef.current.value;
    let foodName = this.foodNameRef.current.value;
    let descItem = this.descItemRef.current.value;

    const dateItem = {
      id: this.state.idItemUpdate,
      price: priceItem,
      discount: discount,
      category: category,
      foodName: foodName,
      descFood: descItem,
      primaryImage: this.state.imageItem,
      secondImageFood: this.state.secondImageFood,
      access_token,
    };
    await this.props.updateItemProduct(dateItem);
    this.priceItemRef.current.value = "";
    this.discountRef.current.value = "";
    this.categoryRef.current.value = "";
    this.foodNameRef.current.value = "";
    this.descItemRef.current.value = "";
    this.setState({
      idItemUpdate: "",
      imageItem: "",
      previewImage: "",
      secondImageFood: [], // Reset ảnh phụ
      isOpen:false
    });
  };

  toggleUpdateItemProduct = async (id) => {
    this.setState({isOpen: true});
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
    this.discountRef.current.value = item.item.discount;
    this.categoryRef.current.value = item.item.category;
    this.foodNameRef.current.value = item.item.foodName;
    this.descItemRef.current.value = item.item.descFood;
    this.setState({
      isUpdateItem: true,
      idItemUpdate: id,
      previewImage: imageBase64,
      secondImageFood: item.item.secondImageFood,
      imageItem: item.item.imageItem,
    });
    console.log("in");
  };

  handleCancel = () => {
    this.setState({
      descItem: "",
      priceItem: "",
      foodName: "",
      imageItem: "",
      previewImage: "",
      isUpdateItem: false,
      isOpen:false
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

  VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

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
      <div className="bg-[#f7f7f7]">
        {/* {this.state.isImageModalOpen && (
          <div
            className="image-modal"
            onClick={() => this.setState({ isImageModalOpen: false })}
          >
            <div className="image-modal-content">
              <img src={this.state.selectedImage} alt="Preview" />
            </div>
          </div>
        )} */}

        <div className="mt-[10px] w-full flex justify-end max-w-[1200px] mx-auto">
        <button onClick={()=>this.setState({isOpen:!this.state.isOpen,isUpdateItem:false})} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add New Product
          </button>
        </div>
        
        {this.state.isOpen ? 
        <div className="z-[999] fixed top-0 h-[100vh] w-full bg-black/60">
        <div className="new-item-form col-8 fixed right-0 top-0 h-[100vh] overflow-y-auto z-[999] bg-white">
          <button onClick={()=>this.setState({isOpen:!this.state.isOpen})} className="w-[40px] ml-auto  mr-[5px] rounded-[50%] hover:bg-[#ededed]">
						<img  src={Close} alt="" />
					</button>
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
                // type="number"
                pattern="\d*"
                inputMode="numeric"
                ref={this.priceItemRef}
                placeholder="Nhập giá món ăn (...20000)"
              />
            </div>
            <div className="input-group">
              <label>Nhập giảm giá</label>
              <input
                // type="number"
                pattern="\d*"
                inputMode="numeric"
                ref={this.discountRef}
                placeholder="Nhập giảm giá món ăn (...5000)"
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
              <label>Danh mục</label>
              <input
                ref={this.categoryRef}
                placeholder="Nhập danh mục"
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
        </div>
        : null}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-[1200px] mx-auto">
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
                <div className="bg-white border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer">
                  <div className="w-full h-60 relative p-2 pb-3 group">
                    {product.discount!==0
                      ? <span
                          // onClick={open}
                          className="bg-yellow-300 text-red-600 absolute left-0 top-0 w-16 text-xs text-center py-1 rounded-md font-semibold inline-block z-10"
                        >
                          save {(product.price / product.discount).toFixed(0)}%
                        </span>
                      : null
                      }
                    <img
                      // onClick={handleProduct}
                      src={imageBase64}
                      alt="productImage"
                      className="w-full h-full rounded-md object-cover group-hover:scale-x-[1.06] group-hover:scale-y-[1.085] duration-300"
                    />
                    {/* <ProductCardSideNav product={item} /> */}
                    
                  </div>
                  <div className="flex flex-col gap-2 px-2 pb-2">
                    <h2 className="text-lg font-bold line-clamp-2 truncate  ...">{product?.foodName}</h2>
                    <h3 className="text-xs uppercase font-semibold text-lightText  text-gray-500">
                      {product?.category}
                    </h3>
                    <div className="text-base text-lightText flex items-center">
                        <p className="text-red-500">{product?.rate?.rateAverage}</p>
                        {/* <StarRating
                          rating={Number(product?.rate?.rateAverage)}
                        /> */}
                        {/* <p className="px-auto w-full text-center"> Đã bán {11+ " k"}</p> */}
                    </div>
                    {/* <AddToCartBtn product={item} /> */}
                    <div className="flex"> 
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-red-500 text-[700] text-[20px]">
                          {this.VND.format(product.price - product.discount)}
                        </p>
                        {product.discount !== 0
                          ? <p className="line-through text-gray-500 font-medium">
                              {this.VND.format(product.price)}
                            </p>
                          : null
                        }
                      </div>
                      {/* <p className="px-auto w-full text-center self-center justify-self-end"> Đã bán {11+ "k"}</p> */}
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-2 pb-2">
                  <button className="w-[60px] py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() =>
                        this.setState({
                          isModalRemoveOpen: true,
                          idProductDeleted: product.id,
                        })
                      }
                    >
                      <FontAwesomeIcon icon={icon({ name: "trash-alt" })} />
                    </button>
                    <button class="w-[60px]  py-2 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 me-2 mb-2 dark:focus:ring-yellow-900"
                      onClick={() => this.toggleUpdateItemProduct(product.id)}
                    >
                      <FontAwesomeIcon icon={icon({ name: "pencil-alt" })} />
                    </button>
                    <label
                      className="h-fit cursor-pointer m-0 py-[auto]"
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
                  {/* <Transition appear show={isOpen}>
                    <Dialog
                      as="div"
                      className="relative z-10 focus:outline-none"
                      onClose={close}
                    >
                      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                          <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 transform-[scale(95%)]"
                            enterTo="opacity-100 transform-[scale(100%)]"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 transform-[scale(100%)]"
                            leaveTo="opacity-0 transform-[scale(95%)]"
                          >
                            <DialogPanel className="w-full max-w-md rounded-xl bg-black backdrop-blur-2xl z-50 p-6">
                              <DialogTitle
                                as="h3"
                                className="text-base/7 font-medium text-whiteText"
                              >
                                Hurry up!
                              </DialogTitle>
                              <p className="mt-2 text-sm/6 text-white/50">
                                You are going to save{" "}
                                <span className="text-skyText">
                                  <FormattedPrice
                                    amount={product?.regularPrice - product?.discountedPrice}
                                  />{" "}
                                </span>
                                from this product.
                              </p>
                              <p className="text-sm/6 text-white/50">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Sequi, consequatur?
                              </p>
                              <div className="mt-4">
                                <Button
                                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                  onClick={close}
                                >
                                  Got it, thanks!
                                </Button>
                              </div>
                            </DialogPanel>
                          </TransitionChild>
                        </div>
                      </div>
                    </Dialog>
                  </Transition> */}
                </div>
              );

            })}
        </div>
        
        {this.state.isModalRemoveOpen && (
          <ModalRemove
            isModalRemoveOpen={this.state.isModalRemoveOpen}
            handleRemove={this.handleDeleteProduct}
            handleCancelRemove={this.handleCancelRemove}
          />
        )}
      </div>
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
