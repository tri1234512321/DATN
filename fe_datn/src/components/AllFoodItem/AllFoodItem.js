/** @format */

import React, { Component } from "react";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";

import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./AllFoodItem.scss";

import { Fragment } from "react";
class AllFoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      priceItem: "",
      foodName: "",
      descItem: "",
      previewImage: "",
      imageItem: "",
      isExpanded: false,
    };
  }

  async componentDidMount() {
    await this.props.getAllProductByBuyer();
  }

  openPreview = () => {
    if (!this.state.previewImage) return;
    this.setState({
      isOpen: true,
    });
  };
  handleAddFoodToCart = async (product) => {
    console.log("addFoodToCart");
    var currentdate = new Date();
    var datetime =
      "Last Sync: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    //
    const amountFood = 1;
    let access_token = this.props.userInfo.data.access_token;
    let data = {
      idFood: product.id,
      idShop: product.idShop,
      amountFood: amountFood,
      timeAt: datetime,
      access_token: access_token,
    };
    await this.props.addFoodToCart(data);
  };

  render() {
    console.log("this.fooditems: ", this.props.allCart.length);
    const { dataProduct } = this.props;
    return (
      <Fragment>
        <div className='wrap-product'>
          <div className='container-product'>
            <div className='row-foods'>
              {dataProduct &&
                dataProduct.length > 0 &&
                dataProduct.map((product) => {
                  let imageBase64 = "";
                  if (product.primaryImage) {
                    imageBase64 = new Buffer(product.primaryImage, "base64").toString("binary");
                  }
                  return (
                    <span className='col-food' key={product.id}>
                      <div
                        className={`image-description product-${product.id}`}
                        style={{
                          backgroundImage: `url('${imageBase64}')`,
                        }}
                      ></div>
                      <div className='descFood' style={{ marginLeft: "2px" }}>
                        <p>
                          {product.foodName} | {product.descFood}
                        </p>
                        {/* 
                                                                  <button onClick={() => this.toggleExpand()}>
                                                                        {this.state.isExpanded ? "Thu gọn" : "Xem thêm"}
                                                                  </button> */}
                      </div>
                      <div style={{ marginLeft: "2px" }}>
                        <span>
                          <FontAwesomeIcon
                            className='icon-star'
                            icon={icon({
                              name: "star",
                            })}
                            style={{ color: "#ffc400" }}
                          />
                        </span>
                        <span>
                          <FontAwesomeIcon
                            className='icon-star'
                            icon={icon({
                              name: "star",
                            })}
                            style={{ color: "#ffc400" }}
                          />
                        </span>
                        <span>
                          <FontAwesomeIcon
                            className='icon-star'
                            icon={icon({
                              name: "star",
                            })}
                            style={{ color: "#ffc400" }}
                          />
                        </span>
                        <span>
                          <FontAwesomeIcon
                            className='icon-star'
                            icon={icon({
                              name: "star",
                            })}
                            style={{ color: "#ffc400" }}
                          />
                        </span>
                        <span>
                          <FontAwesomeIcon
                            className='icon-star'
                            icon={icon({
                              name: "star",
                            })}
                            style={{ color: "#ffc400" }}
                          />
                        </span>
                        <span>| Lượt mua: 123</span>
                      </div>
                      <div style={{ fontSize: "18px", marginLeft: "2px" }}>
                        {product.price} <sup>₫</sup> | <span>Đánh giá: 11 |</span>{" "}
                        <span style={{ color: "#1e71ff" }}> xem chi tiết</span>
                      </div>
                      <div className='btn-add-buy'>
                        <button className='btn-add' onClick={() => this.handleAddFoodToCart(product)}>
                          Thêm vào giỏ
                        </button>
                        <button className='btn-buy-now' onClick={() => this.toggleUpdateItemProduct(product.id)}>
                          Mua
                        </button>
                      </div>
                    </span>
                  );
                })}
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
    dataProduct: state.buyer.dataProduct,
    allCart: state.buyer.allCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProductByBuyer: () => dispatch(actions.fetchAllItemProductByBuyerStart()),
    addFoodToCart: (data) => dispatch(actions.fetchAddFoodToCartStart(data)),
    navigate: (path) => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllFoodItem);
