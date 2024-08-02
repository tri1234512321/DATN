/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleLoginApi } from "../../services/userService";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer/Footer";
import * as actions from "../../store/actions";
import "./Login.scss";
import { Fragment } from "react";
// import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  username: "",
                  password: "",
                  isShowPassword: false,
                  EM: "",
            };
            this.btnLogin = React.createRef();
      }
      handleOnChangeUserName = (event) => {
            this.setState({
                  username: event.target.value,
            });
      };
      handleOnChangePassword = (event) => {
            this.setState({
                  password: event.target.value,
            });
      };
      handleLogin = async (username, password) => {
            this.setState({
                  EM: "",
            });
            try {
                  let dataUser = await handleLoginApi(username, password);
                  console.log("dataUserLogin: ", dataUser);
                  if (dataUser && dataUser.EC !== 0) {
                        this.setState({
                              EM: dataUser.message,
                        });
                  }
                  if (dataUser && dataUser.EC === 0) {
                        this.props.userLoginSuccess(dataUser);
                        const { navigate } = this.props;
                        if (dataUser.data.user.roleId === "ADMIN") {
                              navigate("/admin/management-all-users");
                        } else if (dataUser.data.user.roleId === "BUYER") {
                              navigate("/");
                        } else if (dataUser.data.user.roleId === "SHIPPER") {
                              navigate("/shipper/home-shipper");
                        } else if (dataUser.data.user.roleId === "SHOP") {
                              navigate("/shop/home-shop");
                        } else {
                              navigate("/page-not-found");
                        }
                        localStorage.setItem("access_token", dataUser.data.access_token);
                        console.log("dataUser.data.access_token ", dataUser.data.access_token);
                  }
            } catch (e) {
                  if (e.response) {
                        this.setState({
                              EM: e.response.dataUser.message,
                        });
                  }
                  console.log("KhacToan", e.response);
            }
      };
      handleShowPassword = () => {
            this.setState({
                  isShowPassword: false ? true : false,
            });
      };
      handleKeydown = (event) => {
            console.log(123);
            if (event.key === "Enter" || event.keyCode === 13) {
                  this.handleLogin();
            }
      };
      render() {
            return (
                  <Fragment>
                        <HomeHeader />
                        <div className='login-container'>
                              <div className='login-left'>
                                    <div className='login-content'>
                                          <div className='col-12 text-login'>Login</div>
                                          <div className='col-12 form-group login-input'>
                                                <label>Email</label>
                                                <input
                                                      type='text'
                                                      className='form-control'
                                                      placeholder='Nhập vào email của bạn'
                                                      value={this.state.username}
                                                      onChange={(event) => this.handleOnChangeUserName(event)}
                                                ></input>
                                          </div>
                                          <div className='col-12 form-group login-input'>
                                                <label>Mật khẩu</label>
                                                <div className='custom-form-password'>
                                                      <input
                                                            type='password'
                                                            className='form-control input-password'
                                                            placeholder='Nhập vào mật khẩu của bạn'
                                                            value={this.state.password}
                                                            onChange={(event) => this.handleOnChangePassword(event)}
                                                      ></input>
                                                      <div className='col-12' style={{ color: "red" }}>
                                                            {this.state.EM}
                                                      </div>
                                                      <i
                                                            className='fas fa-eye-slash icon-eye'
                                                            onClick={() => {
                                                                  this.handleShowPassword(this.state.isShowPassword);
                                                                  const iconEye = document.querySelector(".icon-eye");
                                                                  const isShow = iconEye.classList.contains("fa-eye");
                                                                  if (isShow) {
                                                                        document.querySelector(".input-password").type =
                                                                              "password";
                                                                        iconEye.classList.remove("fa-eye");
                                                                        iconEye.classList.add("fa-eye-slash");
                                                                  } else {
                                                                        document.querySelector(".input-password").type =
                                                                              "text";
                                                                        iconEye.classList.remove("fa-eye-slash");
                                                                        iconEye.classList.add("fa-eye");
                                                                  }
                                                            }}
                                                      ></i>
                                                </div>
                                          </div>
                                          <div className='col-12'>
                                                <button
                                                      className='btn-login'
                                                      onClick={() =>
                                                            this.handleLogin(this.state.username, this.state.password)
                                                      }
                                                      onKeyDown={(event) => this.handleKeydown(event)}
                                                >
                                                      Login
                                                </button>
                                          </div>
                                          <div className='col-12'>
                                                <span
                                                      className='forgot-password'
                                                      onClick={() => this.processForgotPassword()}
                                                >
                                                      {" "}
                                                      Forgot your password?
                                                </span>
                                          </div>
                                    </div>
                              </div>
                              {/* <div className='login-right'>
                                    <img src={rightLogin} alt='img-right-login' className='img-right-login' />
                              </div> */}
                        </div>
                        <Footer />
                  </Fragment>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            lang: state.app.language,
      };
};

const mapDispatchToProps = (dispatch) => {
      return {
            navigate: (path) => dispatch(push(path)),
            addUserSuccess: (userInfo) => dispatch(actions.addUserSuccess(userInfo)),
            userLoginFail: () => dispatch(actions.userLoginFail()),
            userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
