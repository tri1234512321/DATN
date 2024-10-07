import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderDetail from "./OrderDetail";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../context/authContext";
import { makeRequest } from "../../Social/axios";

function Order() {
  const { currentUser } = useContext(AuthContext);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { isLoading, error, data } = useQuery(["orders",currentUser?.user?.id], () =>
    makeRequest.get("/get-orders-by-status", {
      params: {access_token: currentUser.access_token,status:"All"},
    }).then((res) => {
      return res.data.item;
    })
  );

  
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage  = 6;
  const [lastIndex,setLastIndex] = useState(currentPage * recordsPerPage);
  const [firstIndex, setFirstIndex] = useState((currentPage - 1) * recordsPerPage);
  const [records, setRecords] = useState([]);
  const [npage, setNpage] = useState(0);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    setLastIndex(currentPage * recordsPerPage);
    setFirstIndex((currentPage - 1) * recordsPerPage);
    setRecords(data?.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)||[]);
    setNpage(Math.ceil(data?.length/recordsPerPage)||1);
    setNumbers([...Array(npage + 1).keys()].slice(1));
  }, [currentPage,data,npage]);

  function prePage() {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      // console.log(currentPage,firstIndex,lastIndex);
    }
  }
  
  function changeCPage(id) {
    setCurrentPage(id);
  }
  
  function nextPage() {
    if(currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  // const orderList = [{id:1,orderStatus:"wait",orderDate:"2024-10-6",totalAmount:12321,paymentMethod:"care",paymentStatus:"yes",
  //   cartItems: [{title:"dfwe",quantity:21,price:123412}]
  // },{id:1,orderStatus:"wait",orderDate:"2024-10-6",totalAmount:12321,paymentMethod:"care",paymentStatus:"yes",
  //   cartItems: [{title:"dfwe",quantity:21,price:123412}]
  // }];
  const orderDetails = data?data[0]:{};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Time</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Amount</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records && records.length > 0
              ? records.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem?.id}</TableCell>
                    <TableCell>{orderItem?.createdAt.split("T")[0]}</TableCell>
                    <TableCell>{orderItem?.createdAt.split("T")[1].split(".")[0 ]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 text-white ${
                          orderItem?.status === "ORDER_SUCCESS"
                            ? "bg-blue-500"
                            : orderItem?.status === "TRANSFERING"
                            ? "bg-yellow-600"
                            : orderItem?.status === "FINISH"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        {orderItem?.status==="ORDER_SUCCESS"?"DELIVERING":orderItem?.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{orderItem?.totalAmount}</TableCell>
                    <TableCell>{orderItem?.totalMoney}VND</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          // dispatch(resetOrderDetails());
                        }}
                      >
                        {/* <Button
                          // onClick={() =>
                          //   handleFetchOrderDetails(orderItem?._id)
                          // }
                          onClick={()=>setOpenDetailsDialog(true)}
                        >
                          View Details
                        </Button> */}
                        <button onClick={()=>setOpenDetailsDialog(true)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                          View Details
                        </button>
                        <OrderDetail orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
          {/* <nav aria-label="Page navigation example" className="mt-[20px] flex justify-center mb-[20px] w-full ml-[50px]">
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
            </nav> */}
        </Table>

        <nav aria-label="Page navigation example" className="mt-[20px] flex justify-center mb-[20px] w-full ml-[50px]">
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
      </CardContent>
    </Card>
  );
}

export default Order;
