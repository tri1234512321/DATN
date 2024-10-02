import React, { Component, useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import adminService from "../../../services/adminService";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./ManageStaff.scss";
import { toast } from "react-toastify";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import DevideJob from "../../../components/Admin/DivideJob";

import { useContext} from "react";
import { AuthContext } from "../../../context/authContext";
import {SocketContext} from "../../../context/socketContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../components/Social/axios";

const ManageStaff = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [job,setJob] = useState(null);

  const { isLoading, error, data } = useQuery(["jobs"], () =>
    makeRequest.get("/all-job", {
      params: {access_token: currentUser.access_token},
    }).then((res) => {
			// console.log(res);
      return res?.data?.data;
    })
	);

  const handleDivideJob = (job) => {
    setJob(job)
  }

  return (
    <div >
      <div className="manage-job-form mb-[20px]">
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {error
              ? ""
              : isLoading
              ? "loading" 
              : data.map((job, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{job.typeWork}</td>
                    <td>{job.hourlyWage}</td>
                    <td>{job.slot}</td>
                    <td>{job.occupant}</td>
                    <td>{job.startTime}</td>
                    <td>{job.endTime}</td>
                    <td>{job?.date}</td>
                    <td>{job?.status}</td>
                    <td className="flex">
                      <button
                        className="btn-action bg-lime-500 hover:bg-lime-600"
                        onClick={()=>handleDivideJob(job)}
                      >
                        Phân việc
                      </button>
                      <button
                        // onClick={() => this.handleDelete(job.id)}
                        className="btn-action bg-red-600 hover:bg-red-500"
                      >
                        Hoàn tất
                      </button>
                    </td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
      
      {job ?
        <div className="manage-job-form">
          <DevideJob job = {job}/>
        </div>
        : <></>
      } 

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
      </Modal>

      <Modal
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

export default ManageStaff;
