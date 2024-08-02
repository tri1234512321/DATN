/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";

import "./HistoryOrder.scss";
import DatePick from "./Datepick";
import Pagination from "./Pagination";

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
                        <div className='background-image_his_o'>
                              <div className='history-order-container'>
                                    <div className='history-order-title'>Lịch sử đơn hàng</div>
                                    <div className='history-order-search'>
                                          <div className='col1'>
                                                <span className='span'>Trạng thái</span>
                                                <select className='select' name='state' id='state-select'>
                                                      <option value=''>All</option>
                                                      <option value='finish'>Hoàn tất</option>
                                                      <option value='cancel'>Hủy</option>
                                                </select>
                                          </div>
                                          <div className='col2'>
                                                <span className='span'>Từ ngày</span>
                                                <DatePick />
                                          </div>
                                          <div className='col3'>
                                                <span className='span'>Đến ngày</span>
                                                <DatePick />
                                          </div>
                                          <div className='col4'>
                                                <button className='search_his_o'>Search</button>
                                          </div>
                                    </div>
                                    <Pagination />
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
