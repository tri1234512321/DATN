/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleLoginApi } from "../../services/userService";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer/Footer";
import * as actions from "../../store/actions";
import "./ForgotPassword.scss";
import { Fragment } from "react";
// import { userLoginSuccess } from '../../store/actions';

class ForgotPassword extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  username: "",
                  isShowPassword: false,
                  errMessage: "",
            };
            this.btnLogin = React.createRef();
      }
      handleOnChangeUserName = (event) => {
            this.setState({
                  username: event.target.value,
            });
      };
      handleLogin = async (username, password) => {
            this.setState({
                  errMessage: "",
            });
            console.log("username:", username, password);
            try {
                  let data = await handleLoginApi(username, password);
                  console.log(data);
                  if (data && data.errCode !== 0) {
                        this.setState({
                              errMessage: data.message,
                        });
                  }
                  if (data && data.errCode === 0) {
                        this.props.userLoginSuccess(data);

                        console.log("Login success");
                  }
            } catch (e) {
                  if (e.response) {
                        this.setState({
                              errMessage: e.response.data.message,
                        });
                  }
                  console.log("KhacToan", e.response);
            }
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
                        <div className='forgot-container'>
                              <div className='forgot-left'>
                                    <div className='forgot-content'>
                                          <div className='col-12 text-forgot'>Forgot Password</div>
                                          <div className='col-12 form-group email-forgot'>
                                                <label>Email</label>
                                                <input
                                                      type='text'
                                                      className='form-control'
                                                      placeholder='Nhập vào email của bạn'
                                                      value={this.state.username}
                                                      onChange={(event) => this.handleOnChangeUserName(event)}
                                                ></input>
                                          </div>
                                          <div className='col-12'>
                                                <button
                                                      className='btn-forgot-password'
                                                      onClick={() =>
                                                            this.handleLogin(this.state.username, this.state.password)
                                                      }
                                                >
                                                      Gửi mật khẩu mới tới email của bạn
                                                </button>
                                          </div>
                                          <div className='col-12'>
                                                <span
                                                      className='return-login
                                                '
                                                >
                                                      Trở lại đăng nhập
                                                </span>
                                          </div>
                                    </div>
                              </div>
                              {/* <div className='forgot-right'>
                                    <img src={rightLogin} alt='img-right-forgot' className='img-right-forgot' />
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
