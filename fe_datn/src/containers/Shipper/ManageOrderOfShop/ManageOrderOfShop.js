/** @format */

import React, { useEffect, useState, useCallback } from "react";

import { Switch } from "antd";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import Modal from 'react-bootstrap/Modal';
// import comtam from "../../../assets/comtam/comtam1.jpg"

// import "../../ManageOrder/MangeOrder.scss";

import { Fragment } from "react";
// import "./ManageOrdered.scss";
import { useContext} from "react";
import { AuthContext } from "../../../context/authContext";
import {SocketContext} from "../../../context/socketContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../components/Social/axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Parcels from "../../../components/Shop/Parcels/Parcels";

const ManageOrderOfShop = () => {
  return (
		<div className='flex justify-center bg-[#f0f0f0] min-h-[90vh]'>
			<div className="w-[80%] mt-[30px]">
					<Parcels status="WAITING" nextStatus="DELIVERING"/>
			</div>
		</div>
	)
}

export default ManageOrderOfShop;
