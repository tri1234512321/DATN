
import "./Order.scss";
import { useContext} from "react";
import { AuthContext } from "../../../context/authContext";
import {SocketContext} from "../../../context/socketContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../Social/axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Buffer } from "buffer";

import Parcel from "../../Shipper/ParcelShipper/ParcelShipper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const Order = ({order,nextStatus}) => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["order",order?.id], () =>
    makeRequest.get("/get-parcels-by-id-order", {
      params: {access_token: currentUser.access_token,idOrder:order.id},
    }).then((res) => {
      return res.data.item;
    })
  );

  const mutation = useMutation(
    (newStatus) => {
      return makeRequest.put("/update-order", {
        access_token: currentUser.access_token,
        idOrder: order.id,
        status: newStatus
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["orders",currentUser?.user?.id]);
        toast.success("Bạn đã xác nhận xong món");
      },
    }
  );

  const handleClick = (newStatus) => {
    mutation.mutate(newStatus);
  };

  return (
    <div className="mb-[30px]">

      {error
        ? ""
        : isLoading
        ? "loading"
        : data.map((parcel) => (
          <Parcel parcel={parcel} key={parcel.id} nextStatus={nextStatus}/>
      ))}

      <div className="mt-[12px] cart-ctable-item-parcel border-b-2 border-gray-700 bg-white rounded-b-[7px]">
      {
          order.status==="ORDER_SUCCESS" && data
          ? data.filter((parcel)=>parcel.status!=='DELIVERING').length===0
            ? <div className="cart-ctd">
                <button type="button" className="w-[100%]  mr-[10px] px-3 py-2 text-sm font-medium text-center text-black bg-[#51ff00] rounded-lg hover:bg-[#51ff00d2] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={()=>handleClick("TRANSFERING")}
                >
                  Nhận món
                </button>
              </div>
            : <div className="cart-ctd">
                <button type="button" className="opacity-50 cursor-not-allowed w-[100%]  mr-[10px] px-3 py-2 text-sm font-medium text-center text-black bg-[#51ff00] rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Nhận món
                </button>
              </div>
          : order.status==="TRANSFERING"
            ? <div className="cart-ctd">
                <button type="button" className="w-[100%]  mr-[10px] px-3 py-2 text-sm font-medium text-center text-black bg-[#51ff00] rounded-lg hover:bg-[#51ff00d2] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={()=>handleClick("FINISH")}
                >
                  Giao hàng
                </button>
                <button type="button" className="w-[100%] px-3 py-2 text-sm font-medium text-center text-white bg-[#ff7300] rounded-lg hover:bg-[#ff7300d8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={()=>handleClick("RETURNED")}
                >
                  Trả hàng
                </button>
            </div>
          : <div className="cart-ctd">
              {order.status}
            </div>
        }
        <div className="cart-ctd text-red-500">
          {"Người mua: "+order.user.firstName+" "+order.user.lastName}
        </div>
        <div className="cart-ctd text-red-500">
          {"Sđt: "+order.user.phoneNumber}
        </div>
        <div className="cart-ctd text-red-500">{order?.totalAmount}</div>
        <div className="cart-ctd text-red-500">
          {order?.totalMoney?.toLocaleString("vi-VN")}₫
        </div>
      </div>
    </div> 
  )
}

export default Order;