import React, { Component, useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import adminService from "../../../services/adminService";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./ManageJob.scss";
import { toast } from "react-toastify";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { useContext} from "react";
import { AuthContext } from "../../../context/authContext";
import {SocketContext} from "../../../context/socketContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../components/Social/axios";

const ManageJob = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [newJob,setNewJob] = useState({
    jobType: "GOM-DON",
    hourlyWage: 20000,
    slots: 2,
    startTime:"08:00",
    endTime:"22:00",
    date: dayjs()
  });

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentJob, setCurrentJob] = useState({});
  const [errorModel,setErrorModel] = useState({});
  const [jobToDelete,setJobToDelete] = useState(null);

  const { isLoading, error, data } = useQuery(["jobs"], () =>
    makeRequest.get("/all-job", {
      params: {access_token: currentUser.access_token},
    }).then((res) => {
			// console.log(res);
      return res?.data?.data;
    })
	);

  const mutation = useMutation(
    (data) => {
      // console.log(data);
      return makeRequest.post("/create-job", data);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["jobs"]);
        if(data.data.EC===0) {
          toast.success(data.data.EM);
        } else {
          toast.error(data.data.EM);
        }
      },
      onError: (error) => {
        console.log(error)
      },
    },
  );

  const editMutation = useMutation(
    (data) => {
      // console.log(data);
      return makeRequest.post("/edit-job", data);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["jobs"]);
        if(data.data.EC===0) {
          toast.success(data.data.EM);
        } else {
          toast.error(data.data.EM);
        }
      },
      onError: (error) => {
        console.log(error)
      },
    },
  );

  const deleteMutation = useMutation(
    (data) => {
      // console.log(data);
      return makeRequest.post("/delete-job", data);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["jobs"]);
        if(data.data.EC===0) {
          toast.success(data.data.EM);
        } else {
          toast.error(data.data.EM);
        }
      },
      onError: (error) => {
        console.log(error)
      },
    },
  );

  const createJob = async () => {
    // Validate form before sending data
    let errors = { jobType: "", hourlyWage: "", slots: "" };

    if (!newJob.jobType) errors.jobType = "Chọn loại công việc cần tạo";
    if (!newJob.hourlyWage)
      errors.hourlyWage =
        "Mức lương không thể trống, hãy nhập mức lương trả cho công việc !";
    if (!newJob.slots)
      errors.slots =
        "Số lượng tuyển không thể trống, hãy nhập số lượng muốn tuyển.";

    if (errors.jobType || errors.hourlyWage || errors.slots) {
      setErrorModel(errors);
      return; // Do not proceed with API call if there are validation errors
    }

    let input = {
      jobType: newJob.jobType,
      hourlyWage: newJob.hourlyWage,
      slots: newJob.slots,
      endTime: newJob.endTime,
      startTime: newJob.startTime,
      date: newJob.date,
      access_token: currentUser.access_token,
    };
    mutation.mutate(input);
  };

  const openJobRegister = () => {
    
  }

  const cancelJobRegister = () => {
    // Implement the cancellation logic here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prevJob => {
      const updatedJob = { ...prevJob, [name]: value };
      // console.log(updatedJob);
      return updatedJob;
    });
  };

  // Hàm mở Modal khi nhấn vào "Edit"
  const showModal = (job) => {
    setIsModalVisible(true);
    setCurrentJob(job);
    setErrorModel({}); // Reset errors when opening modal
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentJob({});
    setErrorModel({});
  };

  const renderTimeOptions = () => {
    const timeOptions = [];
    for (let hour = 8; hour <= 22; hour++) {
      const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      timeOptions.push(
        <option key={formattedHour} value={formattedHour}>
          {formattedHour}
        </option>
      );
    }
    return timeOptions;
  };

  const handleSave = async () => {
    let errors = {};

    if (!currentJob.typeWork) errors.typeWork = "Chọn loại công việc cần tạo";
    if (!currentJob.hourlyWage)
      errors.hourlyWage =
        "Mức lương không thể trống, hãy nhập mức lương trả cho công việc !";
    if (!currentJob.slot)
      errors.slot =
        "Số lượng tuyển không thể trống, hãy nhập số lượng muốn tuyển.";

    if (Object.keys(errors).length > 0) {
      setErrorModel( errors );
      return;
    }

    const access_token = currentUser.access_token;
    const data = { ...currentJob, access_token };
    // console.log("data: ", data);
    editMutation.mutate(data);
    setIsModalVisible(false);
  };

  const handleDelete = (jobId) => {
    setIsDeleteModalVisible(true);
    setJobToDelete(jobId);
  };

  const confirmDelete = async () => {
    const access_token = currentUser.access_token;
    let data = { id: jobToDelete, access_token };
    deleteMutation.mutate(data);
    setIsDeleteModalVisible(false);
    setJobToDelete(null);
  };

  return (
    <div className="manage-job-form">
      {/* Form tạo công việc */}
      <div className="form-group">
        <label htmlFor="jobType" className="form-label">
          Loại Việc
        </label>
        <select
          id="jobType"
          name="jobType"
          className="form-select h-9"
          value={newJob.jobType}
          onChange={handleInputChange}
        >
          <option value="GOM-DON">Gom Đơn</option>
          <option value="GIAO-DON">Giao Đơn</option>
        </select>
        {errorModel.jobType && (
          <div className="error-message text-rose-500">{errorModel.jobType}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="hourlyWage" className="form-label">
          Lương Một Giờ
        </label>
        <input
          type="number"
          id="hourlyWage"
          name="hourlyWage"
          className="form-input h-9"
          value={newJob.hourlyWage}
          onChange={handleInputChange}
        />
        {errorModel.hourlyWage && (
          <div className="error-message text-rose-500">
            {errorModel.hourlyWage}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="slots" className="form-label">
          Số Slot
        </label>
        <input
          type="number"
          id="slots"
          name="slots"
          className="form-input h-9"
          value={newJob.slots}
          onChange={handleInputChange}
        />
        {errorModel.slots && (
          <div className="error-message text-rose-500">{errorModel.slots}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="startTime" className="form-label">
          Giờ Bắt Đầu
        </label>
        <select
          id="startTime"
          name="startTime"
          className="form-select h-9"
          value={newJob.startTime}
          onChange={handleInputChange}
        >
          {renderTimeOptions()}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="endTime" className="form-label">
          Giờ Kết Thúc
        </label>
        <select
          id="endTime"
          name="endTime"
          className="form-select h-9"
          value={newJob.endTime}
          onChange={handleInputChange}
        >
          {renderTimeOptions()}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="endTime" className="form-label mb-[5px]">
          Ngày làm việc
        </label>
        <DatePicker
          slotProps={{ textField: { size: 'small' } }}
          value={newJob.date}
          onChange={(data)=>setNewJob({...newJob,date:data})}
        />
      </div>

      <div className="form-group form-actions">
        <button
          type="button"
          className="btn btn-save"
          onClick={createJob}
        >
          <FontAwesomeIcon icon={icon({ name: "Save" })} />
          Tạo mới
        </button>

        <button
          type="button"
          className="btn btn-open"
          onClick={openJobRegister}
        >
          Mở đăng ký
        </button>
        
        <button
          type="button"
          className="btn btn-cancel"
          onClick={cancelJobRegister}
        >
          {/* <FontAwesomeIcon icon={icon({ name: "Times" })} /> */}
          Huỷ
        </button>
      </div>

      {/* Bảng hiển thị danh sách công việc */}
      {/* <div className="manage-job-form"> */}
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
                      onClick={() => showModal(job)}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="btn-action bg-red-600 hover:bg-red-500"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      {/* </div> */}

      <Modal
        title="Chỉnh sửa việc"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Job ID">
            <Input value={currentJob.id} disabled />
          </Form.Item>
          <Form.Item label="Job Type">
            <Select
              value={currentJob.typeWork}
              onChange={(value) =>
                setCurrentJob({ ...currentJob, typeWork: value })
              }
            >
              <Select.Option value="GOM-DON">Gom Đơn</Select.Option>
              <Select.Option value="GIAO-DON">Giao Đơn</Select.Option>
            </Select>
            {errorModel.typeWork && (
              <div className="error-message">{errorModel.typeWork}</div>
            )}
          </Form.Item>
          <Form.Item label="Hourly Wage">
            <Input
              type="number"
              value={currentJob.hourlyWage}
              onChange={(e) =>
                setCurrentJob({ ...currentJob, hourlyWage: e.target.value })
              }
            />
            {errorModel.hourlyWage && (
              <div className="error-message">{errorModel.hourlyWage}</div>
            )}
          </Form.Item>
          <Form.Item label="Slots">
            <Input
              type="number"
              value={currentJob.slot}
              onChange={(e) =>
                setCurrentJob({ ...currentJob, slot: e.target.value })
              }
            />
            {errorModel.slot && (
              <div className="error-message">{errorModel.slot}</div>
            )}
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xác nhận xoá"
        visible={isDeleteModalVisible}
        onOk={confirmDelete}
        onCancel={() =>{
          setIsDeleteModalVisible(false);
          setJobToDelete(null);
        }}
        okText="Xoá"
        cancelText="Huỷ"
      >
        <p className="text-rose-500">Bạn có chắc chắn muốn xoá việc này?</p>
      </Modal>
    </div>
  );
}

export default ManageJob;
