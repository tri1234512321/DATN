/** @format */

import React, { Component } from "react";
import { Switch } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "../ManageMember.scss";
import "../../TableUser.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import ModalUser from "../../CrudUsers/ModalUser";
import ModalEditUser from "../../CrudUsers/ModalEditUser";
import ModalRemove from "../../ModalRemove";
import * as actions from "../../../../store/actions";
import {
  adminGetAllusers,
  createNewUserService,
  deleteUserService,
  adminGetAllBuyers,
  editUserService,
  changeStatusUser,
} from "../../../../services/userService";
import { toast } from "react-toastify";
class ManageAllUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEdit: {},
      idUserDeleted: 0,
      isModalRemoveOpen: false,
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      enable: false,
    };
  }
  getId = React.createRef(null);
  async componentDidMount() {
    const access_token = this.props.userInfo.data.access_token;
    await this.props.getAllUsers(access_token);
  }
  // async componentDidUpdate() {
  //       const access_token = this.props.userInfo.data.access_token;
  //       await this.props.getAllUsers(access_token);
  // }
  getOnlyUserFromReact = async (id) => {
    let response = await adminGetAllusers(id);
    if (response && response.EC === 0) {
      this.setState();
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  //handle delete user with id
  handleDeleteUser = async () => {
    try {
      const idUserDeleted = this.state.idUserDeleted;
      const access_token = this.props.userInfo.data.access_token;
      console.log("access_token: ", access_token);
      await this.props.deleteUser(idUserDeleted, access_token);
      this.setState({
        isModalRemoveOpen: false,
      });
      this.getId.current = null;
    } catch (e) {
      console.log(e);
    }
  };
  handleCancelRemove = () => {
    this.setState({
      isModalRemoveOpen: false,
    });
    this.getId.current = null;
  };

  getAllUsersFromReact = async () => {
    let access_token = this.props.userInfo.data.access_token;
    let response = await adminGetAllBuyers("All", access_token);
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

  handleChangeStatusUser = async (userId, currentStatus) => {
    try {
      console.log("check");
      const newStatus = currentStatus === "FALSE" ? "TRUE" : "FALSE";
      this.setState({ enable: newStatus === "TRUE" });
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

  toggleUserModal = async () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

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
    const { allUsers } = this.props;
    console.log("allUser: ", allUsers);
    const isModalRemoveOpen = this.state.isModalRemoveOpen;
    return (
      <div className="users-container mx-4">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
        />

        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleEditUserModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <h1 className="text-xl font-semibold"></h1>
        <div className="add-new-user">
          <button
            className="btn-create"
            onClick={() => this.handleAddNewUser()}
          >
            <span>NEW</span>
            <FontAwesomeIcon
              icon={icon({
                name: "user-plus",
              })}
              className="icon-user-plus"
              style={{ marginLeft: "8px" }}
            />
          </button>
        </div>
        <table id="customers">
          <tbody>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Last name</th>
              <th>First name</th>
              <th>Actions</th>
            </tr>
          </tbody>

          {allUsers &&
            allUsers.map((user) => {
              return (
                <React.Fragment key={user.id}>
                  <tbody>
                    <tr className={"user-" + user.id}>
                      <td>{user.email}</td>
                      <td>{user.roleId}</td>
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
        {isModalRemoveOpen && (
          <ModalRemove
            isModalRemoveOpen={isModalRemoveOpen}
            handleCancelRemove={this.handleCancelRemove}
            handleRemove={this.handleDeleteUser}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
    userInfo: state.user.userInfo,
    //get users
    allUsers: state.admin.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    getAllUsers: (access_token) =>
      dispatch(actions.fetchAllUserStart(access_token)),
    deleteUser: (userId, access_token) =>
      dispatch(actions.deleteUserStart(userId, access_token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAllUser);
