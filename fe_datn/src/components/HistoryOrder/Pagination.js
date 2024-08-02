import React, { useState } from "react";

import "./HistoryOrder.scss";

const Data = [
    {     
        stt               :1,
        idOder            :"1275-1241", 
        timeOder          :"19/02/2023 15:16",
        timeDelivery      :"19/02/2023 16:03",
        eatery            :"Gàn rán",
        location          :"330 Võ Tất Thành",
        shiper            :"Nguyễn Văn Thành",
        price             :"312.123",
        state             :"Complete"
    },
    {     
        stt               :2,
        idOder            :"1275-1241", 
        timeOder          :"19/02/2023 15:16",
        timeDelivery      :"19/02/2023 16:03",
        eatery            :"Gàn rán",
        location          :"330 Võ Tất Thành",
        shiper            :"Nguyễn Văn Thành",
        price             :"312.123",
        state             :"Complete"
    },
    {     
        stt               :3,
        idOder            :"1275-1241", 
        timeOder          :"19/02/2023 15:16",
        timeDelivery      :"19/02/2023 16:03",
        eatery            :"Gàn rán",
        location          :"330 Võ Tất Thành",
        shiper            :"Nguyễn Văn Thành",
        price             :"312.123",
        state             :"Complete"
    },
    {     
        stt               :4,
        idOder            :"1275-1241", 
        timeOder          :"19/02/2023 15:16",
        timeDelivery      :"19/02/2023 16:03",
        eatery            :"Gàn rán",
        location          :"330 Võ Tất Thành",
        shiper            :"Nguyễn Văn Thành",
        price             :"312.123",
        state             :"Complete"
    },
    {     
        stt               :5,
        idOder            :"1275-1241", 
        timeOder          :"19/02/2023 15:16",
        timeDelivery      :"19/02/2023 16:03",
        eatery            :"Gàn rán",
        location          :"330 Võ Tất Thành",
        shiper            :"Nguyễn Văn Thành",
        price             :"312.123",
        state             :"Complete"
    },
    {     
        stt               :6,
        idOder            :"1275-1241", 
        timeOder          :"19/02/2023 15:16",
        timeDelivery      :"19/02/2023 16:03",
        eatery            :"Gàn rán",
        location          :"330 Võ Tất Thành",
        shiper            :"Nguyễn Văn Thành",
        price             :"312.123",
        state             :"Complete"
    },
    {     
        stt               :7,
        idOder            :"1275-1241", 
        timeOder          :"19/02/2023 15:16",
        timeDelivery      :"19/02/2023 16:03",
        eatery            :"Gàn rán",
        location          :"330 Võ Tất Thành",
        shiper            :"Nguyễn Văn Thành",
        price             :"312.123",
        state             :"Complete"
    },
    {     
        stt               :8,
        idOder            :"1275-1241", 
        timeOder          :"19/02/2023 15:16",
        timeDelivery      :"19/02/2023 16:03",
        eatery            :"Gàn rán",
        location          :"330 Võ Tất Thành",
        shiper            :"Nguyễn Văn Thành",
        price             :"312.123",
        state             :"Complete"
    },
    {     
        stt               :9,
        idOder            :"1275-1241", 
        timeOder          :"19/02/2023 15:16",
        timeDelivery      :"19/02/2023 16:03",
        eatery            :"Gàn rán",
        location          :"330 Võ Tất Thành",
        shiper            :"Nguyễn Văn Thành",
        price             :"312.123",
        state             :"Complete"
    },
    {     
        stt               :10,
        idOder            :"1275-1241", 
        timeOder          :"19/02/2023 15:16",
        timeDelivery      :"19/02/2023 16:03",
        eatery            :"Gàn rán",
        location          :"330 Võ Tất Thành",
        shiper            :"Nguyễn Văn Thành",
        price             :"312.123",
        state             :"Complete"
    },
    {     
        stt               :11,
        idOder            :"1275-1241", 
        timeOder          :"19/02/2023 15:16",
        timeDelivery      :"19/02/2023 16:03",
        eatery            :"Gàn rán",
        location          :"330 Võ Tất Thành",
        shiper            :"Nguyễn Văn Thành",
        price             :"312.123",
        state             :"Complete"
    },
    {     
        stt               :12,
        idOder            :"1275-1241", 
        timeOder          :"19/02/2023 15:16",
        timeDelivery      :"19/02/2023 16:03",
        eatery            :"Gàn rán",
        location          :"330 Võ Tất Thành",
        shiper            :"Nguyễn Văn Thành",
        price             :"312.123",
        state             :"Complete"
    },
    {     
        stt               :13,
        idOder            :"1275-1241", 
        timeOder          :"19/02/2023 15:16",
        timeDelivery      :"19/02/2023 16:03",
        eatery            :"Gàn rán",
        location          :"330 Võ Tất Thành",
        shiper            :"Nguyễn Văn Thành",
        price             :"312.123",
        state             :"Complete"
    },
];

function Pagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage  = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = Data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(Data.length/recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    return (
        <div>
            <table className="content-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn hàng</th>
                        <th>Thời gian</th>
                        <th>Địa điểm</th>
                        <th>Nhân viên</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                {records.map((data,index)=>(
                    <tr key={data.stt}>
                        <td>{data.stt}</td>
                        <td>{data.idOder}</td>
                        <td>
                            Thời gian đặt: {data.timeOder} <br/>
                            Thời gian giao: {data.timeDelivery}
                        </td>
                        <td>  
                            {data.eatery}<br/>
                            {data.location}      
                        </td>
                        <td>{data.shiper}</td>
                        <td>{data.price}đ</td>
                        <td>{data.state}</td>
                        <td>Chi tiết đơn hàng</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <nav className="nav">
                <ul className="ul">
                    <li className="li">
                        <button className="buttonLeft"
                        onClick={prePage}> Prev </button>
                    </li>
                    {
                        numbers.map((n,i)=> (
                            <li className="li" key ={i}>
                                <button className="button"
                                onClick={()=>changeCPage(n)}>{n}</button>
                            </li>
                        ))
                    }
                    <li className="li">
                        <button className="buttonRight"
                        onClick={nextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )

    function prePage() {
        if(currentPage !== firstIndex) {
          setCurrentPage(currentPage - 1)
        }
    }
      
      function changeCPage(id) {
        setCurrentPage(id)
    }
      
      function nextPage() {
        if(currentPage !== lastIndex) {
          setCurrentPage(currentPage + 1)
        }
    }
}

export default Pagination