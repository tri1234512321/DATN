/** @format */

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Buffer } from "buffer";
import * as actions from "../../../store/actions";
import {
  buyerGetAllCart,
  buyerGetAllCartItems,
  buyerGetFoodById,
  buyerDeleteCartItem,
  buyerGetAllCartItemByCarts,
  buyerPaymentAll,
  clearCart,
  buyerUpdateCartItem,
} from "../../../services/buyerService";
import {paymentBill} from "../../../services/paymentService";
import "./ShoppingCart.scss";
import HomeHeader from "../../../components/HomeHeader/HomeHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Redirect} from "react-router-dom";
import {SocketContext} from "../../../context/socketContext";
import { useContext} from "react";
import { AuthContext } from "../../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../components/Social/axios";
import Footer from "../../../components/Footer/Footer";

export default function ShoppingCart() {
  const access_token = localStorage.getItem("access_token");
  const [carts, setCarts] = useState([]);
  const [allCartItems, setAllCartItems] = useState([]);
  const [allAmounts, setAllAmounts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCartItems = async () => {
      try {
        const res = await buyerGetAllCart(access_token);
        let allCart = res.allCart;
        setCarts(allCart);
        const itemsData = await buyerGetAllCartItemByCarts(
          allCart,
          access_token
        );
        let items = itemsData.data;
        setAllCartItems(items);
      } catch (e) {
        console.error("Lỗi khi lấy dữ liệu: ", e);
      }
    };
    fetchAllCartItems();
  }, [access_token]);

  const handleUpdateAllCartItems = async () => {
    try {
      const res = await buyerGetAllCartItemByCarts(carts, access_token);
      let items = res.data;
      setAllCartItems(items);
    } catch (e) {
      console.error("Lỗi khi cập nhật sản phẩm trong giỏ hàng: ", e);
    }
  };

  const clearCartFunc = async () => {
    try {
      let clear = await clearCart(access_token, carts);
      if (clear.EC === 0) {
        dispatch(actions.fetchAllCartStart(access_token));
        toast.success(clear.EM);
        setCarts([]);
        setAllCartItems([]);
        await handleUpdateAllCartItems();
      } else {
        toast.error("Xóa giỏ hàng không thành công!");
      }
    } catch (e) {
      toast.error("Xóa giỏ hàng không thành công!");
      console.error("Lỗi khi xóa giỏ hàng: ", e);
    }
  };

  const getAmount = useCallback((arrAmount, cartIndex) => {
    setAllAmounts((prevAmounts) => {
      const updatedAmounts = [...prevAmounts];
      updatedAmounts[cartIndex] = arrAmount;
      return updatedAmounts;
    });
  }, []);

  return (
    <div className="wrap-payment">
      <HomeHeader />
      <div className="container-payment">
        <div className="cart-ctable">
          <CartHead />
          {carts.map((cart, index) => (
            <CartBody
              key={index}
              cart={cart}
              cartIndex={index}
              access_token={access_token}
              onUpdateAllCartItems={handleUpdateAllCartItems}
              getAmount={getAmount}
            />
          ))}
          <CartFoot
            allFood={allCartItems}
            allAmounts={allAmounts}
            clearCartFunc={clearCartFunc}
          />
        </div>
      </div>
      <ToastContainer />
      {/* <Footer/> */}
    </div>
  );
}

function CartHead() {
  return (
    <div className="cart-chead border-b-2 border-gray-700 bg-white">
      <div className="cart-ctr font-manrope text-sm text-gray-600">
        <div className="cart-cth">Ảnh</div>
        <div className="cart-cth">Sản Phẩm</div>
        <div className="cart-cth">Đơn Giá</div>
        <div className="cart-cth">Số Lượng</div>
        <div className="cart-cth">Tổng Tiền</div>
        <div className="cart-cth">Thao Tác</div>
      </div>
    </div>
  );
}

function CartBody({
  cart,
  cartIndex,
  access_token,
  onUpdateAllCartItems,
  getAmount,
}) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchBuyerGetAllCartItems = async () => {
      try {
        const res = await buyerGetAllCartItems(cart.id, access_token);
        let arrCartItem = res.allCartItem.filter((item) => item.status === 1);
        let arrAmountOfItem = arrCartItem.map((item) => item.amountFood);
        getAmount(arrAmountOfItem, cartIndex);
        setCartItems(arrCartItem);
      } catch (e) {
        console.error("Lỗi khi lấy dữ liệu: ", e);
      }
    };
    fetchBuyerGetAllCartItems();
  }, [cart.id, access_token, getAmount]);

  const handleItemDeleted = (deletedCartItemId) => {
    if (deletedCartItemId) {
      setCartItems((prevCarts) =>
        prevCarts.filter((cart) => cart.id !== deletedCartItemId)
      );
      onUpdateAllCartItems();
    } else {
      setCartItems([]);
      onUpdateAllCartItems();
    }
  };

  return (
    cartItems.length > 0 && (
      <div className="mb-5 border-b-2 border-gray-700">
        {cartItems.map((cartItem, index) => (
          <CartItem
            key={index}
            cartItem={cartItem}
            index={index}
            access_token={access_token}
            onItemDeleted={handleItemDeleted}
          />
        ))}
      </div>
    )
  );
}
function CartFoot({ allFood, allAmounts, clearCartFunc }) {
  const access_token = localStorage.getItem("access_token");
  const [paymentOrder, setPaymentOrder] = useState(0);
  const flatAmounts = allAmounts.flat();
  const hasItems = allFood.length > 0; // Kiểm tra xem giỏ hàng có chứa sản phẩm hay không
  const socket = useContext(SocketContext);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    const updatedCartItems = allFood.map((item, index) => ({
      ...item,
      amountFood: flatAmounts[index],
      totalAmount: flatAmounts[index],
    }));
    const total = updatedCartItems.reduce(
      (acc, item) => acc + item.price * item.amountFood,
      0
    );
    setPaymentOrder(total);
  }, [allFood]);

  const mutation = useMutation(
    (newNotification) => {
      return makeRequest.post("/notifications", newNotification);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["notifications"]);
      },
    }
  );

  const payment = async () => {
    var currentdate = new Date();
    var datetime =
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
    const updatedAllFood = allFood.map((item, index) => ({
      ...item,
      amountFood: flatAmounts[index],
    }));
    let data = {
      totalMoney: paymentOrder,
      allFood: updatedAllFood,
      access_token: access_token,
      timeOrder: datetime,
    };
    console.log(updatedAllFood);
    updatedAllFood.forEach(async food => {
      socket.emit("sendNotification", {
        senderId: currentUser?.user?.id,
        receiverId: food?.idShop,
        text: "Đã đặt mua một món ăn",
      });

      await mutation.mutate({ content:`đã đặt mua món ăn ${food.foodName} với số lượng ${food.amountFood}`, access_token, idReceivedUser: food?.idShop});
    });

    let pm = await paymentBill(data);
    console.log(pm);

    // let res = await buyerPaymentAll(data);
    // if (res.EC === 0) {
    //   toast.success("Thanh toán đơn hàng thành công!");
    // } else {
    //   toast.error("Thanh toán đơn hàng không thành công!");
    // }

    clearCartFunc();
    window.location.replace(pm["order_url"]);
  };

  return (
    <div className="cart-cfoot flex justify-between py-4 bg-white">
      <button
        type="button"
        className="clear-cart-btn text-danger text-sm"
        onClick={clearCartFunc}
        disabled={!hasItems} // Disable nếu không có sản phẩm
      >
        <FontAwesomeIcon icon={icon({ name: "Trash" })} className="mr-1" />
        Xóa Giỏ Hàng
      </button>
      <button
        type="button"
        className="checkout-btn text-white text-sm"
        onClick={payment}
        disabled={!hasItems} // Disable nếu không có sản phẩm
      >
        Tổng thanh toán {paymentOrder.toLocaleString("vi-VN")}₫ (Thanh toán)
      </button>
    </div>
  );
}

function CartItem({ cartItem, index, access_token, onItemDeleted }) {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(cartItem.amountFood);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBuyerGetProduct = async () => {
      try {
        const res = await buyerGetFoodById(cartItem.idFood, access_token);
        setProduct(res.food);
      } catch (e) {
        console.error("Lỗi khi lấy dữ liệu: ", e);
      }
    };
    fetchBuyerGetProduct();
  }, [cartItem.idFood, access_token]);

  const deleteItem = async (item) => {
    try {
      const { primaryImage, ...productWithoutImage } = item;
      productWithoutImage.idCart = cartItem.idCart;
      productWithoutImage.access_token = access_token;
      let data = await buyerDeleteCartItem(productWithoutImage);
      if (data.EC === 0) {
        dispatch(actions.fetchAllCartStart(access_token));
        onItemDeleted(cartItem.id);
        toast.success("Xóa sản phẩm trong giỏ hàng thành công!");
      } else {
        toast.error("Xóa sản phẩm trong giỏ hàng không thành công!");
      }
    } catch (e) {
      console.error("Lỗi khi xóa sản phẩm trong giỏ hàng: ", e);
    }
  };

  const handleQuantityChange = async (e) => {
    const newQuantity = parseInt(e.target.value, 10);

    if (newQuantity < 1) {
      toast.error("Số lượng phải lớn hơn 0.");
      return;
    }

    try {
      // Gửi yêu cầu cập nhật số lượng lên server
      const updatedCartItem = {
        ...cartItem,
        amountFood: newQuantity,
      };
      const response = await buyerUpdateCartItem({
        updatedCartItem,
        access_token,
      });
      console.log("respone: ", response);
      if (response.EC === 0) {
        setQuantity(newQuantity);
        dispatch(actions.fetchAllCartStart(access_token));
      } else {
        toast.error("Cập nhật số lượng không thành công!");
      }
    } catch (e) {
      console.error("Lỗi khi cập nhật số lượng: ", e);
      toast.error("Cập nhật số lượng không thành công!");
    }
  };

  let imageBase64 = "";
  if (product.primaryImage) {
    imageBase64 = Buffer.from(product.primaryImage, "base64").toString(
      "binary"
    );
  }
  return (
    product && (
      <div className="cart-ctable-item border-b-2 border-gray-700 bg-white">
        <div className="cart-ctd p-0"><div
            className="image-description"
            style={{ backgroundImage: `url('${imageBase64}')` }}
          ></div></div>
        <div className="cart-ctd">
          
          <div className="cart-product-info">
            <div className="cart-product-name">{product.foodName}</div>
            {/* <div className="cart-product-description">{product.descFood}</div> */}
          </div>
        </div>
        <div className="cart-ctd">{product.price}₫</div>
        <div className="cart-ctd">
          <input
            type="number"
            className="cart-quantity-input"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <div className="cart-ctd">
          {(product.price * cartItem.amountFood).toLocaleString("vi-VN")}₫
        </div>
        <div className="cart-ctd">
          <button
            type="button"
            className="delete-btn text-red-600"
            onClick={() => deleteItem(product)}
          >
            <FontAwesomeIcon icon={icon({ name: "Trash" })} />
          </button>
        </div>
      </div>
    )
  );
}
