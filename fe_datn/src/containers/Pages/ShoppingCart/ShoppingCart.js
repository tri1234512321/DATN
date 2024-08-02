/** @format */

import React, { useEffect, useState } from "react";

import "./ShoppingCart.scss";

import HomeHeader from "../../../components/HomeHeader/HomeHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { buyerGetAllCart, buyerGetAllCartItems, buyerGetFoodById } from "../../../services/buyerService";

export default function ShoppingCart() {
      const access_token = localStorage.getItem("access_token");
      const [carts, setCarts] = useState([]);
      useEffect(() => {
            const fetchAllCartItems = async () => {
                  try {
                        const res = await buyerGetAllCart(access_token);
                        setCarts(res.allCart);
                        // console.log(res);
                  } catch (e) {
                        console.error("Error data: ", e);
                  }
            };
            fetchAllCartItems();
      }, []);
      console.log(carts);
      return (
            <div className='cart bg-whitesmoke'>
                  <HomeHeader rightContent={false} />
                  <div className='container'>
                        <div className='cart-ctable'>
                              <CartHead />

                              {carts && carts.map((cart) => <CartBody cart={cart} access_token={access_token} />)}

                              <CartFoot />
                        </div>
                  </div>
            </div>
      );
}

function CartHead() {
      return (
            <div className='cart-chead bg-white'>
                  <div className='cart-ctr fw-6 font-manrope fs-15'>
                        <div className='cart-cth'>
                              <span className='cart-ctxt'>STT</span>
                        </div>
                        <div className='cart-cth'>
                              <span className='cart-ctxt'>Sản Phẩm</span>
                        </div>
                        <div className='cart-cth'>
                              <span className='cart-ctxt'>Đơn Giá</span>
                        </div>
                        <div className='cart-cth'>
                              <span className='cart-ctxt'>Số Lượng</span>
                        </div>
                        <div className='cart-cth'>
                              <span className='cart-ctxt'>Tổng Tiền</span>
                        </div>
                        <div className='cart-cth'>
                              <span className='cart-ctxt'>Thao Tác</span>
                        </div>
                  </div>
            </div>
      );
}

function CartBody({ cart, access_token }) {
      const [cartItems, setCartItems] = useState([]);

      useEffect(() => {
            // console.log(cart.id +" _ "+ access_token)
            const fetchBuyerGetAllCartItems = async () => {
                  try {
                        const res = await buyerGetAllCartItems(cart.id, access_token);
                        setCartItems(res.allCartItem);
                        console.log(res);
                  } catch (e) {
                        console.error("Error data: ", e);
                  }
            };
            fetchBuyerGetAllCartItems();
      }, [cart.id, access_token]);

      return (
            <div className='mb-5'>
                  {cartItems &&
                        cartItems.map((cartItem, index) => (
                              <CartItem cartItem={cartItem} index={index} access_token={access_token} />
                        ))}
            </div>
      );
}

function CartFoot() {
      return (
            <div className='cart-cfoot flex align-start justify-between py-3 bg-white'>
                  <div className='cart-cfoot-l'>
                        <button type='button' className='clear-cart-btn text-danger fs-15 text-uppercase fw-4'>
                              <FontAwesomeIcon
                                    className='fas fa-trash'
                                    icon={icon({ name: "Trash" })}
                              ></FontAwesomeIcon>
                              <span className='mx-1'>Xóa Giỏ Hàng</span>
                        </button>
                  </div>

                  <div className='cart-cfoot-r flex flex-column justify-end'>
                        <div className='total-txt flex align-center justify-end'>
                              <div className='font-manrope fw-5'>Tổng thanh toán ("Total"): </div>
                              <span className='text-orange fs-22 mx-2 fw-6'>{"4354"}</span>
                        </div>

                        <button type='button' className='checkout-btn text-white bg-orange fs-16'>
                              Mua Hàng (Check Out)
                        </button>
                  </div>
            </div>
      );
}

function CartItem({ cartItem, index, access_token }) {
      const [product, setProduct] = useState([]);

      useEffect(() => {
            const fetchBuyerGetProduct = async () => {
                  try {
                        const res = await buyerGetFoodById(cartItem.idFood, access_token);
                        setProduct(res.food);
                        console.log(res.food);
                  } catch (e) {
                        console.error("Error data: ", e);
                  }
            };
            fetchBuyerGetProduct();
      }, [cartItem.idFood, access_token]);
      console.log(cartItem.amountFood + " - " + product.price);

      return (
            <div className='cart-cbody bg-white'>
                  <div className='cart-ctr py-4' key={cartItem.id}>
                        <div className='cart-ctd'>
                              <span className='cart-ctxt'>{index + 1}</span>
                        </div>
                        <div className='cart-ctd'>
                              <span className='cart-ctxt'>{product.foodName}</span>
                        </div>
                        <div className='cart-ctd'>
                              <span className='cart-ctxt'>{product.price}</span>
                        </div>
                        <div className='cart-ctd'>
                              <div className='qty-change flex align-center'>
                                    <button type='button' className='qty-decrease flex align-center justify-center'>
                                          <FontAwesomeIcon
                                                className='fas fa-minus'
                                                icon={icon({ name: "Minus" })}
                                          ></FontAwesomeIcon>
                                    </button>
                                    <div className='qty-value flex align-center justify-center'>
                                          {cartItem.amountFood}
                                    </div>
                                    <button type='button' className='qty-increase flex align-center justify-center'>
                                          <FontAwesomeIcon
                                                className='fas fa-plus'
                                                icon={icon({ name: "Plus" })}
                                          ></FontAwesomeIcon>
                                    </button>
                              </div>
                        </div>
                        <div className='cart-ctd'>
                              <span className='cart-ctxt text-orange fw-5'>{cartItem.amountFood * product.price}</span>
                        </div>
                        <div className='cart-ctd'>
                              <button type='button' className='delete-btn text-dark'>
                                    Delete
                              </button>
                        </div>
                  </div>
            </div>
      );
}
