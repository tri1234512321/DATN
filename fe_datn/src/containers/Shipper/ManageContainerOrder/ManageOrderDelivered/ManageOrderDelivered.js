/** @format */

import React, { useEffect, useState, useCallback } from "react";

import { Switch } from "antd";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import Modal from 'react-bootstrap/Modal';
import comtam from "../../../../assets/comtam/comtam1.jpg"

// import "../../ManageOrder/MangeOrder.scss";

import { Fragment } from "react";
// import "./ManageOrdered.scss";
import { useContext} from "react";
import { AuthContext } from "../../../../context/authContext";
import {SocketContext} from "../../../../context/socketContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../../components/Social/axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Orders from "../../../../components/Shipper/Orders/Orders";

// class ManageOrdered extends Component {
function ManageOrderDelivered() {
    const { currentUser } = useContext(AuthContext);

    // render() {
        return (
            <Fragment>
                <div className='flex justify-center bg-[#f0f0f0] min-h-[90vh]'>
                    <div className="w-[80%] mt-[30px]">
                        <Orders status="FINISH" nextStatus="SHIPPING"/>
                    </div>

                    {/* <Modal size="lg" show={true} animation={false} backdrop="static" keyboard={false}>
                        <div className="modal-header">
                            <div className="d-flex">
                                <button className="btn-close ml-1"/>
                                <button className="btn-close" ></button>
                                <p className="h4 m-0 p-0">Modal title</p>
                            </div>
                        </div>
                        <Modal.Body>
                            <div className="d-flex">
                                <img className="w-50" src={comtam} alt=""/>
                                <div className="w-50 px-3">
                                    <p className="text-center">{"infor"}</p>
                                    <p className="fw-semibold fs-5">{"Cơm gà chiên nước mắm"}</p>
                                    <p>Phần: {"30.000"} VNĐ</p>
                                    <p>Số lượng: x{"3"}</p>

                                    <p className="fw-semibold fs-5">{"Người mua A"}</p>
                                    <p>Ghi chú: {"Giao KTX khu B 12h, cơm thêm"}</p>
                                    <p>Số điện thoại: {"0233-2333"}</p>

                                    <p className="fw-semibold fs-5">{"Shipper A"}</p>
                                    <p>Số điện thoại: {"0233-2333"}</p>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-primary px-3">Xem khách hàng</button>
                            <button className="btn btn-primary px-3">Xem Shipper</button>
                        </Modal.Footer>
                    </Modal> */}
                </div>
            </Fragment>
        );
    // }
}

export default ManageOrderDelivered;