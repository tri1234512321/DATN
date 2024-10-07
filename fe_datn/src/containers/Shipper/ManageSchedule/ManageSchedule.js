/** @format */

import React, { Component } from "react";
import { Switch } from "antd";
import { Modal, Form, Input, Select } from "antd";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { useContext} from "react";
import { AuthContext } from "../../../context/authContext";
import {SocketContext} from "../../../context/socketContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../components/Social/axios";

import ShiftRegister from "../../../components/Shipper/ShiftRegister";

import { Fragment } from "react";
const ManageSchedule = () => {
	const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

	const { isLoading, error, data } = useQuery(["shifts",currentUser?.user?.id], () =>
    makeRequest.get("/get-accepted-shift", {
      params: {access_token: currentUser.access_token},
    }).then((res) => {
			// console.log(res);
      return res?.data?.data;
    })
	);
	// console.log(currentUser.access_token,data);

	return (
		<div className="manage-job-form min-h-[90vh] max-w-[1200px] mx-auto">
			{/* Bảng hiển thị danh sách công việc */}
			{/* <div className="manage-job-form"> */}
			<h1 className="text-xl font-semibold my-[20px]">Lịch làm việc</h1>
				<table className="job-table">
					<thead>
						<tr>
							<th>STT</th>
							<th>Job Type</th>
							<th>Hourly Wage</th>
							<th>Slots</th>
							<th>Occupant</th>
							<th>Start</th>
							<th>End</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
					{error
						? ""
						: isLoading
						? "loading"
						: data.map((shift, index) => (
								<tr key={index}>
								<td className="p-x-">{index}</td>
								<td>{shift.job.typeWork}</td>
								<td>{shift.job.hourlyWage}</td>
								<td>{shift.job.slot}</td>
								<td>{shift.job.occupant}</td>
								<td>{shift.job.startTime}</td>
								<td>{shift.job.endTime}</td>
								<td>{shift.job.date}</td>
							</tr>
							))}
					</tbody>
				</table>
			{/* </div> */}

			{/* Modal chỉnh sửa công việc */}
			{/* <Modal
				title="Chỉnh sửa việc"
				visible={isModalVisible}
				onOk={this.handleSave}
				onCancel={this.handleCancel}
			>
				<Form layout="vertical">
					<Form.Item label="Job ID">
						<Input value={currentJob.id} disabled />
					</Form.Item>
					<Form.Item label="Job Type">
						<Select
							value={currentJob.typeWork}
							onChange={(value) =>
								this.setState({
									currentJob: { ...currentJob, typeWork: value },
								})
							}
						>
							<Select.Option value="GOM-DON">Gom Đơn</Select.Option>
							<Select.Option value="GIAO-DON">Giao Đơn</Select.Option>
						</Select>
						{errors.typeWork && (
							<div className="error-message">{errors.typeWork}</div>
						)}
					</Form.Item>
					<Form.Item label="Hourly Wage">
						<Input
							type="number"
							value={currentJob.hourlyWage}
							onChange={(e) =>
								this.setState({
									currentJob: { ...currentJob, hourlyWage: e.target.value },
								})
							}
						/>
						{errors.hourlyWage && (
							<div className="error-message">{errors.hourlyWage}</div>
						)}
					</Form.Item>
					<Form.Item label="Slots">
						<Input
							type="number"
							value={currentJob.slot}
							onChange={(e) =>
								this.setState({
									currentJob: { ...currentJob, slot: e.target.value },
								})
							}
						/>
						{errors.slot && (
							<div className="error-message">{errors.slot}</div>
						)}
					</Form.Item>
				</Form>
			</Modal> */}

			{/* Modal xác nhận xóa */}
			{/* <Modal
				title="Xác nhận xoá"
				visible={isDeleteModalVisible}
				onOk={this.confirmDelete}
				onCancel={() =>
					this.setState({ isDeleteModalVisible: false, jobToDelete: null })
				}
				okText="Xoá"
				cancelText="Huỷ"
			>
				<p className="text-rose-500">Bạn có chắc chắn muốn xoá việc này?</p>
			</Modal> */}
		</div>
	);
}

export default ManageSchedule;
