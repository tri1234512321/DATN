/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import avatar from "../../../assets/avatar.png";
import account from "../../../assets/account.png";
import password from "../../../assets/password.png";
import order from "../../../assets/order.png";
import notification from "../../../assets/notification.png";

import "./Account.scss";

class HistoryOrder extends Component {
      constructor(props) {
            super(props);
            this.state = {};
      }

      async componentDidMount() {}
      useState;
      render() {
            const years = [];
            for (let i = 1900; i <= 2023; i++) {
                  const year = i;
                  years.push(<option value={year}>{year}</option>);
            }

            const months = [];
            for (let i = 1; i <= 12; i++) {
                  const year = i;
                  months.push(<option value={year}>{year}</option>);
            }

            const days = [];
            for (let i = 1; i <= 31; i++) {
                  const year = i;
                  days.push(<option value={year}>{year}</option>);
            }
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
                                                <h3>Hồ Sơ Của Tôi</h3>
                                                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                                          </div>

                                          <div className='container'>
                                                <form id='form' action='/'>
                                                      <table>
                                                            <tr>
                                                                  <td className='td-left'>
                                                                        <label for='name'>Tên </label>
                                                                  </td>
                                                                  <td className='td-right'>
                                                                        <input
                                                                              id='name'
                                                                              name='name'
                                                                              value='Tri Hoang'
                                                                              placeholder='name'
                                                                              type='text'
                                                                        />
                                                                  </td>
                                                            </tr>

                                                            <tr>
                                                                  <td className='td-left'>
                                                                        <label for='email'>Email</label>
                                                                  </td>
                                                                  <td className='td-right'>
                                                                        <input
                                                                              id='email'
                                                                              name='email'
                                                                              value='tri.hoang@gmail.com'
                                                                              placeholder='Email@gmail.com'
                                                                              type='text'
                                                                        />
                                                                  </td>
                                                            </tr>

                                                            <tr>
                                                                  <td className='td-left'>
                                                                        <label for='phone'>Số điện thoại</label>
                                                                  </td>
                                                                  <td className='td-right'>
                                                                        <input
                                                                              id='phone'
                                                                              name='phone'
                                                                              value='0123456789'
                                                                              placeholder='0987654321'
                                                                              type='text'
                                                                        />
                                                                  </td>
                                                            </tr>

                                                            <tr>
                                                                  <td className='td-left'>
                                                                        <label for='location'>Địa chỉ</label>
                                                                  </td>
                                                                  <td className='td-right'>
                                                                        <input
                                                                              id='location'
                                                                              name='location'
                                                                              value='123 Trần Đình Thái, Quận 3, TP HCM'
                                                                              placeholder='Location'
                                                                              type='text'
                                                                        />
                                                                  </td>
                                                            </tr>

                                                            <tr>
                                                                  <td className='td-left'>
                                                                        <label>Birthday </label>
                                                                  </td>
                                                                  <td className='td-right'>
                                                                        <select id='day' name='dd' value={12}>
                                                                              {days}
                                                                        </select>
                                                                        <select
                                                                              className='mid'
                                                                              id='month'
                                                                              name='mm'
                                                                              value={6}
                                                                        >
                                                                              {months}
                                                                        </select>
                                                                        <select id='year' name='yyyy' value={2005}>
                                                                              {years}
                                                                        </select>
                                                                  </td>
                                                            </tr>

                                                            <tr>
                                                                  <td className='td-left'>
                                                                        <label for='gender'>Gender</label>
                                                                  </td>
                                                                  <td className='td-right'>
                                                                        <div className='form-check'>
                                                                              <input
                                                                                    type='radio'
                                                                                    name='flexRadioDefault'
                                                                                    id='nam'
                                                                                    checked
                                                                              />
                                                                              <label for='name'> Nam </label>
                                                                              <input
                                                                                    type='radio'
                                                                                    name='flexRadioDefault'
                                                                                    id='nu'
                                                                              />
                                                                              <label for='nu'> Nữ </label>
                                                                              <input
                                                                                    type='radio'
                                                                                    name='flexRadioDefault'
                                                                                    id='khong'
                                                                              />
                                                                              <label for='khong'> Khác </label>
                                                                        </div>
                                                                  </td>
                                                            </tr>
                                                            <tr>
                                                                  <td className='td-left'></td>
                                                                  <td className='td-right'>
                                                                        <button type='submit'>Lưu</button>
                                                                  </td>
                                                            </tr>
                                                      </table>
                                                </form>
                                                <div className='image-form'>
                                                      <div className='image'>
                                                            <img src={avatar} alt='avatar' />
                                                      </div>
                                                      <div className='center'>
                                                            <button type='Chosse'>Chọn ảnh</button>
                                                      </div>
                                                      <p>Dụng lượng file tối đa 1 MB</p>
                                                      <p>Định dạng:.JPEG, .PNG</p>
                                                </div>
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
