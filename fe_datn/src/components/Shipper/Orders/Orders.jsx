
import "./Orders.scss";
import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../../../context/authContext";
import {SocketContext} from "../../../context/socketContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../Social/axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Buffer } from "buffer";

import Order from "../Order/Order";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const Orders = ({status,nextStatus}) => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["orders",currentUser?.user?.id], () =>
    makeRequest.get("/get-orders-by-status", {
      params: {access_token: currentUser.access_token,status:status},
    }).then((res) => {
      return res.data.item;
    })
  );

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage  = 5;
  const [lastIndex,setLastIndex] = useState(currentPage * recordsPerPage);
  const [firstIndex, setFirstIndex] = useState((currentPage - 1) * recordsPerPage);
  const [records, setRecords] = useState([]);
  const [npage, setNpage] = useState(0);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    setLastIndex(currentPage * recordsPerPage);
    setFirstIndex((currentPage - 1) * recordsPerPage);
    setRecords(data?.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage) || []);
    setNpage(Math.ceil(data?.length/recordsPerPage)||1);
    setNumbers([...Array(npage + 1).keys()].slice(1));
  }, [currentPage,data,npage]);

  function prePage() {
    if(currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  
  function changeCPage(id) {
    setCurrentPage(id);
  }
  
  function nextPage() {
    if(currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="cart-ctable-orders">
      <div className="cart-chead border-b-2 border-gray-700 bg-white">
        <div className="cart-ctr font-manrope text-sm text-gray-600">
          <div className="cart-cth">Sản Phẩm</div>
          <div className="cart-cth"></div>
          <div className="cart-cth">Đơn giá</div>
          <div className="cart-cth">Số Lượng</div>
          <div className="cart-cth">Tổng tiền</div>
          {/* <div className="cart-cth">Thao Tác</div> */}
        </div>
      </div>

      {error
        ? ""
        : isLoading
        ? "loading"
        : (
          records.map((order) => (
          <Order order={order} key={order.id} nextStatus={nextStatus}/>
        )
      ))}

      <nav aria-label="Page navigation example" className="flex justify-center mb-[30px]">
        <ul className="flex items-center -space-x-px h-10 text-base gap-[10px]">
          <li onClick={prePage}>
            <span  className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
              </svg>
            </span>
          </li>
          {
            numbers.map((n,i)=> (
              currentPage === n
                ? <li key={i} onClick={()=>changeCPage(n)}>
                    <span className="flex items-center justify-center px-4 h-10 text-blue-700 border border-gray-300 bg-blue-200 hover:bg-blue-300 hover:text-blue-800 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{n}</span>
                  </li>
                : <li key={i} onClick={()=>changeCPage(n)}>
                    <span  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{n}</span>
                  </li>
            ))
          }
          <li onClick={nextPage}>
            <span  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Next</span>
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
              </svg>
            </span>
          </li>
        </ul>
      </nav>
    </div> 
  )
}

export default Orders;