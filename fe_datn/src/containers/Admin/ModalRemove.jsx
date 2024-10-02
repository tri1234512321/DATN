/** @format */

import { Modal } from "antd";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const ModalRemove = ({
  isModalRemoveOpen,
  handleCancelRemove,
  handleRemove,
}) => {
  return (
    <Modal
      open={isModalRemoveOpen}
      onCancel={handleCancelRemove}
      width="400px"
      footer={[
        <button
          key="back"
          onClick={handleCancelRemove}
          className="rounded-lg px-4 py-2 mx-2"
          style={{
            backgroundColor: "#059669",
            color: "white",
            border: "none",
            height: "36px",
            minWidth: "92px",
            fontWeight: 600,
            transition: "background-color 0.2s ease",
          }}
        >
          Hủy
        </button>,
        <button
          key="submit"
          onClick={handleRemove}
          className="rounded-lg px-4 py-2 mx-2"
          style={{
            backgroundColor: "#DF2910",
            color: "white",
            border: "none",
            height: "36px",
            minWidth: "92px",
            fontWeight: 600,
            transition: "background-color 0.2s ease",
          }}
        >
          Xóa
        </button>,
      ]}
      centered
    >
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={icon({ name: "triangle-exclamation" })}
          style={{ fontSize: "2rem", color: "#FFCC00", marginRight: "16px" }}
        />
        <div>
          <p style={{ fontSize: "16px", fontWeight: 600 }}>Xác nhận xóa</p>
          <p style={{ fontSize: "14px", color: "#626262", marginTop: "4px" }}>
            Bạn có chắc chắn muốn xóa không? Sau khi xóa, dữ liệu không thể khôi
            phục lại.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalRemove;
