/** @format */

import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { emitter } from "../../../utils/emitter";
import { connect } from "react-redux";
import CommonUtils from "../../../utils/CommonUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import { push } from "connected-react-router";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalUser.scss";
class ModalUser extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  arrRoleId: [],
                  previewImage: "",
                  isOpen: false,
                  isUpdate: false,
                  isRender: false,

                  id: -1,
                  email: "",
                  phoneNumber: "",
                  password: "",
                  rePassword: "",
                  firstName: "",
                  lastName: "",
                  bankAccount: "",
                  momo: "",
                  address: "",
                  gender: "male",
                  role: "SHOP",
                  avatar: "",
            };
            this.listtenToEmitter();
      }

      listtenToEmitter() {
            emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
                  this.setState({
                        email: "",
                        password: "",
                        rePassword: "",
                        firstName: "",
                        lastName: "",
                        address: "",
                        phoneNumber: "",
                        gender: "",
                        role: "",
                        avatar: "",
                        bankAccount: "",
                        momo: "",
                        description: "",
                  });
            });
      }

      async componentDidMount() {}

      handleChooseAvatar = async (event) => {
            // const btn = document.querySelector("#choose-avatar");
            console.log("chossing image");
            let file = event.target.files[0];
            if (file) {
                  let base64 = await CommonUtils.getBase64(file);
                  const objectURL = URL.createObjectURL(file);
                  this.setState({
                        previewImage: objectURL,
                        avatar: base64,
                  });
            }
      };
      toggle = async () => {
            await this.props.toggleFromParent();
      };
      openPreview = () => {
            if (!this.state.previewImage) return;
            this.setState({
                  isOpen: true,
            });
      };

      handleChangeInput = (event, id) => {
            let copyState = { ...this.state };
            copyState[id] = event.target.value;
            this.setState({
                  ...copyState,
            });
      };
      handleCheckIvalide = () => {
            let isValid = true;
            const arrInput = [
                  "email",
                  "password",
                  "rePassword",
                  "firstName",
                  "lastName",
                  "address",
                  "phoneNumber",
                  "bankAccount",
                  "momo",
            ];
            for (let i = 0; i < arrInput.length; i++) {
                  if (!this.state[arrInput[i]]) {
                        isValid = false;
                        alert("Missing parameter: " + arrInput[i]);
                        break;
                  }
            }
            const check = this.checkPassword(this.state["password"], this.state["rePassword"]);
            if (check === false) {
                  alert("Please enter password exactly");
                  isValid = false;
            }
            return isValid;
      };

      checkPassword = (pw1, pw2) => {
            if (pw1 !== pw2) return false;
            return true;
      };

      handleSubmit = async () => {
            const check = this.handleCheckIvalide();
            if (check === false) return;
            if (this.state.isUpdate === false) {
                  console.log(this.state.role, this.state.gender);
                  const access_token = this.props.userInfo.data.access_token;
                  await this.props.createNewUser(
                        {
                              email: this.state.email,
                              phoneNumber: this.state.phoneNumber,
                              password: this.state.password,
                              firstName: this.state.firstName,
                              lastName: this.state.lastName,
                              address: this.state.address,
                              gender: this.state.gender,
                              roleId: this.state.role,
                              image: this.state.avatar,
                              bankAccount: this.state.bankAccount,
                              momo: this.state.momo,
                              description: "",
                              access_token: access_token,
                        },
                        access_token,
                  );
            }
            if (this.state.isUpdate === true) {
                  this.props.updateUserStart(
                        {
                              id: this.state.id,
                              firstName: this.state.firstName,
                              lastName: this.state.lastName,
                              address: this.state.address,
                              phoneNumber: this.state.phoneNumber,
                              gender: this.state.gender,
                              roleId: this.state.role,
                              image: this.state.avatar,
                              bankAccount: this.state.bankAccount,
                              momo: this.state.momo,
                              description: this.state.description,
                              // previewImage: this.state.previewImage,
                        },
                        this.props.userInfo.data.access_token,
                  );
            }
            await this.props.toggleFromParent();
      };

      userUpdate = (userData) => {
            // console.log('check user data take from child:', userData);
            let imageBase64 = "";
            if (userData.image) {
                  imageBase64 = new Buffer(userData.image, "base64").toString("binary");
            }
            console.log(userData.image);
            console.log(imageBase64);
            this.setState({
                  id: userData.id,
                  email: userData.email,
                  firstName: userData.firstName,
                  password: "*******",
                  rePassword: "*******",
                  lastName: userData.lastName,
                  address: userData.address,
                  phoneNumber: userData.phoneNumber,
                  gender: userData.gender,
                  role: userData.roleId,
                  previewImage: imageBase64,
                  bankAccount: this.state.bankAccount,
                  momo: this.state.momo,
                  description: this.state.description,
            });
      };

      handleCancelChangeUser = () => {
            this.setState({
                  email: "",
                  password: "",
                  rePassword: "",
                  firstName: "",
                  lastName: "",
                  address: "",
                  phoneNumber: "",
                  gender: "",
                  role: "",
                  avatar: "",
                  previewImage: "",
                  bankAccount: "",
                  momo: "",
                  description: "",
            });
      };

      render() {
            return (
                  <div>
                        <Modal
                              isOpen={this.props.isOpen}
                              toggle={() => this.toggle()}
                              className='modal-user-container top-0'
                              size='lg'
                        >
                              <ModalHeader>
                                    <Button color="secondary" onClick={this.toggle} style={{ float: 'right', marginTop: '10px', width:'50px', paddingg:'0 10px' }}>
                                          Close
                                    </Button>
                                    <div>
                                          <h3
                                                style={{
                                                      margin: "0px",
                                                      textAlign: "center",
                                                      textTransform: "uppercase",
                                                }}
                                          >
                                                Create new user
                                          </h3>
                                    </div>
                                    
                              </ModalHeader>
                              <ModalBody>
                                    
                                    <div className='input-container'>
                                          <div className='form-group'>
                                                <label htmlFor='Email'>Email: </label>
                                                <input
                                                      type='email'
                                                      onChange={(event) => {
                                                            this.handleChangeInput(event, "email");
                                                      }}
                                                      placeholder='Email enter...'
                                                      value={this.state.email}
                                                      name='email'
                                                ></input>
                                          </div>
                                          <div className='form-group'>
                                                <label htmlFor='PhoneNumber'>Phone Number</label>
                                                <input
                                                      type='number'
                                                      onChange={(event) => {
                                                            this.handleChangeInput(event, "phoneNumber");
                                                      }}
                                                      placeholder='Enter phone number...'
                                                      value={this.state.phoneNumber}
                                                      name='phoneNumber'
                                                ></input>
                                          </div>
                                    </div>
                                    <div className='input-container'>
                                          <div className='form-group'>
                                                <label htmlFor='Password'>Password</label>
                                                <input
                                                      type='password'
                                                      onChange={(event) => {
                                                            this.handleChangeInput(event, "password");
                                                      }}
                                                      placeholder='Enter password ...'
                                                      value={this.state.password}
                                                      name='password'
                                                ></input>
                                          </div>
                                          <div className='form-group'>
                                                <label htmlFor='RetypePassword'>Retype Password</label>
                                                <input
                                                      type='password'
                                                      onChange={(event) => {
                                                            this.handleChangeInput(event, "rePassword");
                                                      }}
                                                      placeholder='Enter retype password'
                                                      value={this.state.rePassword}
                                                      name='rePassword'
                                                ></input>
                                          </div>
                                    </div>
                                    <div className='input-container'>
                                          <div className='form-group'>
                                                <label htmlFor='FirstName'>FirstName</label>
                                                <input
                                                      type='text'
                                                      onChange={(event) => {
                                                            this.handleChangeInput(event, "firstName");
                                                      }}
                                                      placeholder='Enter first name...'
                                                      value={this.state.firstName}
                                                      name='firstName'
                                                ></input>
                                          </div>
                                          <div className='form-group'>
                                                <label htmlFor='LastName'>LastName</label>
                                                <input
                                                      type='text'
                                                      onChange={(event) => {
                                                            this.handleChangeInput(event, "lastName");
                                                      }}
                                                      placeholder='Enter first name...'
                                                      value={this.state.lastName}
                                                      name='lastName'
                                                ></input>
                                          </div>
                                    </div>
                                    <div className='input-container'>
                                          <div className='form-group'>
                                                <label htmlFor='BankAccount'>Bank Account</label>
                                                <input
                                                      type='number'
                                                      onChange={(event) => {
                                                            this.handleChangeInput(event, "bankAccount");
                                                      }}
                                                      placeholder='Enter number bank account'
                                                      value={this.state.bankAccount}
                                                      name='bankAccount'
                                                ></input>
                                          </div>
                                          <div className='form-group'>
                                                <label htmlFor='Momo'>Number Momo</label>
                                                <input
                                                      type='number'
                                                      onChange={(event) => {
                                                            this.handleChangeInput(event, "momo");
                                                      }}
                                                      placeholder='Enter number momo...'
                                                      value={this.state.momo}
                                                      name='momo'
                                                ></input>
                                          </div>
                                    </div>
                                    <div className='input-container'>
                                          <div className='form-group'>
                                                <label htmlFor='RoleId'>RoleId</label>
                                                <select
                                                      value={this.state.role}
                                                      id='roleId'
                                                      onChange={(event) => this.handleChangeInput(event, "role")}
                                                >
                                                      <option value='SHOP'>Shop</option>
                                                      <option value='SHIPPER'>Shipper</option>
                                                      <option value='BUYER'>Buyer</option>
                                                </select>
                                          </div>
                                          <div className='form-group'>
                                                <label htmlFor='Gender'>Gender</label>
                                                <select
                                                      value={this.state.gender}
                                                      id='gender'
                                                      onChange={(event) => this.handleChangeInput(event, "gender")}
                                                >
                                                      <option value='male'>male</option>
                                                      <option value='female'>female</option>
                                                      <option value='other'>other</option>
                                                </select>
                                          </div>
                                    </div>
                                    <div className='input-container'>
                                          <div className='form-group'>
                                                <label htmlFor='address'>Address</label>
                                                <input
                                                      type='text'
                                                      onChange={(event) => {
                                                            this.handleChangeInput(event, "address");
                                                      }}
                                                      placeholder='Enter address...'
                                                      value={this.state.address}
                                                      name='address'
                                                ></input>
                                          </div>
                                          <div className='form-group'>
                                                <label htmlFor='name-avatar'>Upload Avatar</label>
                                                <div className='wrap-choose-avatar'>
                                                      <label htmlFor='choose-avatar' className='upload-avatar'>
                                                            <FontAwesomeIcon
                                                                  className='icon-upload'
                                                                  icon={icon({
                                                                        name: "upload",
                                                                  })}
                                                            />
                                                      </label>
                                                      <input
                                                            onChange={(e) => this.handleChooseAvatar(e)}
                                                            type='file'
                                                            id='choose-avatar'
                                                            name='choose-avatar'
                                                            hidden
                                                      ></input>
                                                      <div className='contain-avatar'>
                                                            <div
                                                                  className='avatar'
                                                                  style={{
                                                                        backgroundImage: `url('${this.state.previewImage}')`,
                                                                        cursor: !this.state.previewImage
                                                                              ? ""
                                                                              : "pointer",
                                                                  }}
                                                                  onClick={() => this.openPreview()}
                                                            ></div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                                    
                              </ModalBody>
                              <ModalFooter>
                                    <div className="flex m-10">
                                    <Button color='primary' className='create-btn' onClick={() => this.handleSubmit()}>
                                          Create
                                    </Button>{" "}
                                    <Button color='secondary' className='cancel-btn' onClick={() => this.toggle()}>
                                          Cancel
                                    </Button>
                                    </div>
                              </ModalFooter>
                        </Modal>
                  </div>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            lang: state.app.language,
            users: state.admin.users,
            userInfo: state.user.userInfo,
      };
};

const mapDispatchToProps = (dispatch) => {
      return {
            createNewUser: (data, access_token) => dispatch(actions.fetchCreateUserStart(data, access_token)),
            updateUserStart: (user, access_token) => dispatch(actions.updateUserStart(user, access_token)),
            navigate: (path) => dispatch(push(path)),
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
