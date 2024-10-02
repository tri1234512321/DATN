/** @format */

import React, { Component } from "react";
import { Switch } from "antd";
import { connect } from "react-redux";
import "../ManageMember.scss";
import "../../TableUser.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import ModalEditUser from "../../CrudUsers/ModalEditUser";
import { toast } from "react-toastify";
import { emitter } from "../../../../utils/emitter";
import {
  adminGetAllShippers,
  deleteUserService,
  editUserService,
  changeStatusUser,
} from "../../../../services/userService";
class ManageShipper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      userEdit: {},
      isOpenModalEditUser: false,
      enabled: false,
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  getAllUsersFromReact = async () => {
    let access_token = this.props.userInfo.data.access_token;
    let response = await adminGetAllShippers("All", access_token);
    console.log("response: ", response);
    if (response && response.EC === 0) {
      this.setState(
        {
          arrUsers: response.users,
        },
        () => {}
      );
    }
  };
  getOnlyUserFromReact = async (id) => {
    let access_token = this.props.userInfo.data.access_token;
    let response = await adminGetAllShippers(id, access_token);
    if (response && response.EC === 0) {
      this.setState();
    }
  };

  //handle delete user with id
  handleDeleteUser = async (userId) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.EC !== 0) {
        alert(res.EM);
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleChangeStatusUser = async (userId, currentStatus) => {
    try {
      console.log("check");
      const newStatus = currentStatus === "false" ? "TRUE" : "FALSE";
      this.setState({ enabled: newStatus === "TRUE" });
      const access_token = localStorage.getItem("access_token");
      let data = {
        access_token: access_token,
        idUser: userId,
        status: newStatus,
      };
      console.log("data: ", data);
      let res = await changeStatusUser(data);
      if (res && res.EC !== 0) {
        alert(res.EM);
      } else {
        await this.getAllUsersFromReact();
        alert(`Change status userId ${userId} successfully updated`);
      }
    } catch (e) {
      console.log("err");
      console.log(e);
    }
  };
  //handle create new user from client

  //edit user
  toggleEditUserModal = (user) => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
      userEdit: user,
    });
  };
  handleEditUserModal = (user) => {
    this.toggleEditUserModal(user);
  };

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.EC === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUsersFromReact();
        toast.success("User updated successfully");
      } else {
        console.log("missing responese from edit user");
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let arrUsers = this.state.arrUsers;
    console.log("arrUsers: ", arrUsers);
    return (
      <div className="users-container mx-4">
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleEditUserModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">
          <h1>Information Shipper</h1>
        </div>
        <table id="customers">
          <tbody>
            <tr>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Last name</th>
              <th>First name</th>
              <th>Actions</th>
            </tr>
          </tbody>

          {arrUsers &&
            arrUsers.map((user) => {
              return (
                <React.Fragment key={user.id}>
                  <tbody>
                    <tr className={"user-" + user.id}>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.lastName}</td>
                      <td>{user.firstName}</td>
                      <td>
                      <div className="d-flex justify-around">
                          <Switch
                            className="w-fit"
                            defaultChecked={
                              user.enable === "TRUE" ? true : false
                            }
                            onClick={() => {
                              this.handleChangeStatusUser(user.id, user.enable);
                            }}
                          />
                          <button
                            onClick={() => {
                              this.handleEditUserModal(user);
                            }}
                            className="btn-icon-user-edit w-fit px-[25px]"
                          >
                            <FontAwesomeIcon
                              icon={icon({
                                name: "user-edit",
                              })}
                            />
                          </button>
                          <button
                            onClick={() =>
                              this.setState({
                                isModalRemoveOpen: true,
                                idUserDeleted: user.id,
                              })
                            }
                            className="btn-icon-trash w-fit px-[25px]"
                          >
                            <FontAwesomeIcon
                              icon={icon({
                                name: "trash-can",
                              })}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </React.Fragment>
              );
            })}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageShipper);
