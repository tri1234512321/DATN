/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import avatar from "../../../assets/avatar.png";
import account from "../../../assets/account.png";
import password from "../../../assets/password.png";
import order from "../../../assets/order.png";
import notification from "../../../assets/notification.png";

import "./Password.scss";

class HistoryOrder extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }

      async componentDidMount() {}
      useState;
      render() {
            return (
                  <div className='wrap-background-image'>
                        <div className='background-image'>
                              <div className='account-container'>
                                    <div className='account-left'>
                                          <div className='headline'>
                                                <div className='image'>
                                                      <img src={avatar} alt='avatar' />
                                                </div>
                                                <div className='user'>
                                                      <h5>Tri Hoang</h5>
                                                      <p>Sửa hồ sơ</p>
                                                </div>
                                          </div>
                                          <div className='content'>
                                                <div className='item'>
                                                      <div className='icon'>
                                                            <img src={account} alt='account' />
                                                      </div>
                                                      <div className='it'>
                                                            <a href='./account' className='target'>
                                                                  Tài khoản của tôi
                                                            </a>
                                                      </div>
                                                </div>
                                                <div className='item'>
                                                      <div className='icon'>
                                                            <img src={password} alt='password' />
                                                      </div>
                                                      <div className='it'>
                                                            <a href='./password'>Đổi mật khẩu</a>
                                                      </div>
                                                </div>
                                                <div className='item'>
                                                      <div className='icon'>
                                                            <img src={order} alt='order' />
                                                      </div>
                                                      <div className='it'>
                                                            <a href='account'>Thông tin đơn hàng</a>
                                                      </div>
                                                </div>
                                                <div className='item'>
                                                      <div className='icon'>
                                                            <img src={notification} alt='notification' />
                                                      </div>
                                                      <div className='it'>
                                                            <a href='account'>Thông báo</a>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                                    <div className='account-right'>
                                          <div className='headline'>
                                                <h3>Mật Khẩu</h3>
                                                <p>Thay đổi mật khẩu của bạn</p>
                                          </div>

                                          <div className='container'>
                                                <form id='form' action='/'>
                                                      <label for='old'>Nhập mật khẩu của bạn</label>
                                                      <input
                                                            id='old'
                                                            name='old'
                                                            placeholder='Add your password'
                                                            type='password'
                                                      />

                                                      <label for='new1'>Nhập mật khẩu mới</label>
                                                      <input
                                                            id='new1'
                                                            name='new1'
                                                            placeholder='Add your new pasword'
                                                            type='password'
                                                      />

                                                      <label for='new'>Xác nhận mật khẩu mới</label>
                                                      <input
                                                            id='new'
                                                            name='new'
                                                            placeholder='Confirm new password'
                                                            type='password'
                                                      />

                                                      <button type='submit'>Thay đổi</button>
                                                </form>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            );
      }
}

const mapStateToProps = (state) => {
      return {};
};

const mapDispatchToProps = (dispatch) => {
      return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrder);
