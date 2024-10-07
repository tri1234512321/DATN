
import "./ParcelShipper.scss";
import { useContext} from "react";
import { AuthContext } from "../../../context/authContext";
import {SocketContext} from "../../../context/socketContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../Social/axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Person from "../../../assets/social/person.png";
import { Buffer } from "buffer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const Parcel = ({parcel,nextStatus,key}) => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["parcel",parcel.id], () =>
    makeRequest.get("/get-parcel-items", {
      params: {access_token: currentUser.access_token,idParcel:parcel.id},
    }).then((res) => {
      return res.data.item;
    })
  );

  const mutation = useMutation(
    () => {
      return makeRequest.put("/update-parcel", {
        access_token: currentUser.access_token,
        idParcel: parcel.id,
        status: nextStatus
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["parcels",currentUser?.user?.id]);
        toast.success("Bạn đã xác nhận xong món");
      },
    }
  );

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div className="border-none border-b-2 border-gray-700" key={key}>

      <div className="mt-[10px] cart-ctable-item-parcel border-b-2 border-gray-700 bg-white rounded-t-[7px]">
        <div className="cart-ctd">
          {"Quán: "+parcel.idShop}
        </div>
      </div>

      {error
        ? ""
        : isLoading
        ? "loading"
        : data.map((product, index) => (
          <div className="cart-ctable-item-parcel border-b-2 border-gray-700 bg-white">
            <div className="cart-ctd">
            {product?.primaryImage
              ? <img src={Buffer.from(
                product.primaryImage,
                "base64"
                ).toString("binary")} alt=""/>
              : <img src={Person} alt=""/>
            }
            </div>
            <div className="cart-ctd">
              <div>
                <div className="cart-product-name mb-[10px] font-semibold">{product.foodName}</div>
                <div className="cart-product-description">{product.descFood}</div>
              </div>
            </div>
            <div className="cart-ctd">{product.price}₫</div>
            <div className="cart-ctd">{product.amount}</div>
            <div className="cart-ctd">
              {product?.pricePI?.toLocaleString("vi-VN")}₫
            </div>
            {/* <div className="cart-ctd">
              <button
                  type="button"
                  className="delete-btn text-red-600"
              >
                  <FontAwesomeIcon icon={icon({ name: "Trash" })} />
              </button>
            </div> */}
          </div>
      ))}

      {nextStatus==="WAITING"&&<div className="mt-[3px] cart-ctable-item-parcel border-b-2 border-gray-700 bg-white rounded-b-[7px]">
        <div className="cart-ctd">
          <button type="button" className="w-[100%] px-3 py-2 text-sm font-medium text-center text-white bg-[#ff7300] rounded-lg hover:bg-[#ff7300d8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleClick}
          >
            Xong món
          </button>
        </div>
        <div className="cart-ctd">
          {"Mã gói: "+parcel.id}
        </div>
        <div className="cart-ctd">
        </div>
        <div className="cart-ctd">{parcel?.totalAmount}</div>
        <div className="cart-ctd">
          {parcel?.totalMoney?.toLocaleString("vi-VN")}₫
        </div>
        
      </div>}

      {nextStatus==="DELIVERING" && currentUser?.user?.roleId==="SHIPPER"&&<div className="mt-[3px] cart-ctable-item-parcel border-b-2 border-gray-700 bg-white rounded-b-[7px]">
        <div className="cart-ctd">
          {"Mã gói: "+parcel.id}
        </div>
        <div className="cart-ctd">
        </div>
        <div className="cart-ctd">
          {parcel?.totalMoney?.toLocaleString("vi-VN")}₫
        </div>
        <div className="cart-ctd">{parcel?.totalAmount}</div>
        <div className="cart-ctd">
          <button type="button" className="w-[100%] px-3 py-2 text-sm font-medium text-center text-white bg-[#ff7300] rounded-lg hover:bg-[#ff7300d8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleClick}
          >
            Nhận món
          </button>
        </div>
      </div>}

      {nextStatus==="SHIPPING"&&<div className="mt-[3px] cart-ctable-item-parcel border-b-2 border-gray-700 bg-white rounded-b-[7px]">
        <div className="cart-ctd">
          {parcel.status}
        </div>
        <div className="cart-ctd">
          {"Mã gói: "+parcel.id}
        </div>
        <div className="cart-ctd">
        </div>
        <div className="cart-ctd">{parcel?.totalAmount}</div>
        <div className="cart-ctd">
          {parcel?.totalMoney?.toLocaleString("vi-VN")}₫
        </div>
        
      </div>}

  </div>
  )
}

export default Parcel;